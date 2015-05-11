const fs = require('fs')
const gulp = require('gulp')
const gutil = require('gulp-util')
const path = require('path')
const _ = require('lodash')
const async = require('async')
const rjs = require('requirejs')
const minifyCss = require('gulp-minify-css')
const concatCss = require('gulp-concat-css')
const sort = require('gulp-natural-sort')
const dir = require('node-dir')
const del = require('del');
const git = require('gulp-git');
const bump = require('gulp-bump');
const argv = require('yargs').argv;
const filter = require('gulp-filter');
const tag_version = require('gulp-tag-version');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');

// Consts
const cfg = {
  src: 'src',
  dist: 'dist',
  distamd: 'dist-amd',
  prefix: "hpcc-viz"
};

const libs = ["d3", "c3", "colorbrewer", "dagre", "topojson", "d3.layout.cloud", "font-awesome", "amcharts", "amcharts.funnel", "amcharts.gauge", "amcharts.pie", "amcharts.radar", "amcharts.serial", "amcharts.xy", "amcharts.plugins.responsive"];
const bundles = ["common", "api", "chart", "c3chart", "google", "tree", "other", "layout", "graph", "map", "marshaller", "amchart"];  //  Order is important ---

function buildModule(module, cb) {
  gutil.log('Building ' + module + '...')

  var files = getJSFiles(cfg.src + "/" + module, cfg.src).map(function (file) { return file + ".js"; });
    const deps = libs.concat(bundles.filter(function (bundle) { return bundle !== module; })).reduce(function (dict, dep) {
      return (dict[dep] = 'empty:') && dict
    }, {});

    const plugins = {
      'async': '../rjs.noop',
      'css': '../rjs.noop',
      'goog': '../rjs.noop',
      'propertyParser': '../rjs.noop',
    }

    const opts = {
      baseUrl: cfg.src,
      paths: _.extend({}, plugins, deps),
      include: files
        .map(function (file) {
          return file.substring((cfg.src + '/').length)
        })
        .filter(function (file) {
          return path.extname(file) === '.js' &&
                 file.indexOf(module) === 0
        })
    }

    async.parallel([
      optimize.bind(null, _.extend({ out: (cfg.dist + "/" + cfg.prefix + "-" + module + '.min.js') }, opts)),
      optimize.bind(null, _.extend({ out: (cfg.dist + "/" + cfg.prefix + "-" + module + '.js'), optimize: 'none' }, opts))
    ], cb)
}

function css(minify) {
  return gulp.src(cfg.src + '/**/*.css')
    .pipe(sort())
    .pipe(concatCss(cfg.prefix + (minify ? '.min.css' : '.css')))
    .pipe(minify ? minifyCss({ keepBreaks: true }) : gutil.noop())
    .pipe(gulp.dest(cfg.dist))
}

function optimize(opts, cb) {
  //opts.optimize = "none";
  rjs.optimize(opts,
    function (text) { cb(null, text) },
    cb
  )
}

// Tasks
gulp.task('build-css', css.bind(null, false));

gulp.task('optimize-css', css.bind(null, true));

gulp.task('jscs', function() {
    process.stdout.write("JSCS the files...." + '\n');
    return gulp.src(cfg.src + '/**/*.js')
        .pipe(jscs());
});

gulp.task('lint', function() {
    return gulp.src(cfg.src + '/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
});


gulp.task('build-nonamd', ['build-css', 'optimize-css'], function (cb) {
    async.each(bundles, buildModule, cb);
});

//  AMD Tasks  ---
function getJSFolders(dir) {
    var retVal = fs.readdirSync(dir).filter(function (file) {
        return fs.statSync(dir + "/" + file).isDirectory();
    });
    return retVal;
}

function getJSFiles(dir, folder) {
    var dirParts = dir.split("/");
    var retVal = fs.readdirSync(dir).filter(function (file) {
        return file.indexOf(".js") === file.length - 3;
    }).map(function (fileName) {
        return folder + "/" + dirParts[dirParts.length - 1] + "/" + fileName.substring(0, fileName.length - 3);
    });
    return retVal;
}

const excludeShallow = ["src/map/us-counties", "src/map/us-states", "src/map/countries"];
var amd_bundles = {};
const amd_modules = bundles.map(function (bundle, idx) {
    var name = cfg.prefix + "-" + bundle;
    var include = getJSFiles("src/" + bundle, "src").filter(function (item) { return excludeShallow.indexOf(item) < 0; });
    switch (bundle) {
        case "common":
            include = ["d3", "d3.layout.cloud"].concat(include);
            break;
    }
    amd_bundles["src/" + name] = include;
    return {
        name: name,
        include: include,
        exclude: [cfg.prefix, "css!font-awesome"].concat(bundles.filter(function (bundle2, idx2) { return bundle2 !== bundle && idx2 < idx }).map(function (bundle) { return cfg.prefix + "-" + bundle })),
        excludeShallow: excludeShallow,
        create: true
    };
});

gulp.task("build-amd-src", function (done) {
    var opts = {
        baseUrl: ".",
        appDir: "src",
        dir: cfg.distamd,
        mainConfigFile: "src/config.js",
        modules: [{
            name: cfg.prefix,
            include: ["requireLib", "css", "normalize"],
            create: true
        }].concat(amd_modules)
    };
    optimize(opts, done);
});

gulp.task("build-amd", ["build-amd-src"], function (done) {
    var requireConfig = {
        bundles: amd_bundles
    };
    fs.writeFile(cfg.distamd + "/hpcc-bundles.js",
        "require.config(" + JSON.stringify(requireConfig) + ");",
        function (error) { if (error) throw error; }
    );

    return gulp.src([
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/font-awesome/fonts/fontawesome-webfont.woff',
        'bower_components/font-awesome/fonts/fontawesome-webfont.woff2'

    ], { base: 'bower_components/' })
        .pipe(gulp.dest(cfg.distamd))
    ;
});

gulp.task("build-all", ["build-nonamd", "build-amd"]);

gulp.task("default", ["build-all"]);

//  Bumping / tagging  ---
gulp.task("bump", [], function () {
    var args = {};
    if (argv.version) {
        args.version = argv.version;
    } else if (argv.type) {
        args.type = argv.type;
    } else if (argv.major) {
        args.type = "major";
    } else if (argv.minor) {
        args.type = "minor";
    } else {
        args.type = "patch";
    }
    return gulp.src(["./package.json", "./bower.json"])
        .pipe(bump(args))
        .pipe(gulp.dest("./"))
    ;
});

gulp.task("git-add-dist", ["build-all"], function (cb) {
    return gulp.src(["./dist", "./dist-amd"])
        .pipe(git.add({ args: "-f" }))
    ;
});

gulp.task("tag", ["git-add-dist"], function () {
    var version = require("./package.json").version;
    return gulp.src(["./package.json", "./bower.json", "./dist", "./dist-amd"])
        .pipe(git.commit("Release " + version + "\n\nTag for release.\nAdd dist files.\n", { args: "-s" }))
        .pipe(filter("package.json"))
        .pipe(tag_version())
    ;
});

gulp.task("tag-release", ["tag"], function (cb) {
    var version = require("./package.json").version;
    var target = argv.upstream ? "upstream" : "origin"
    git.push(target, 'v' + version, cb);
});
