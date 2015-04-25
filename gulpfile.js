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

// Consts
const appPaths = {
  src: 'src',
  dist: 'dist'
}

const modules = {
  common: ['d3', 'colorbrewer', 'font-awesome', 'require'],

  other: ['common'],
  tree: ['common'],

  chart: ['other'],
  graph: ['dagre', 'other'],

  c3chart: ['c3', 'chart'],
  google: ['chart' /* Google Visualization */],
  map: ['graph', 'topojson' /* , Google Map */],
  
  layout: ['c3chart'],
  marshaller: ['chart', 'graph', 'layout']
}

// Helpers
function getModuleDeps(module) {
  if (!modules[module]) return []

  return modules[module]
    .reduce(function (deps, dep) { 
      return deps.concat(dep).concat(getModuleDeps(dep)) 
    }, [])
    .filter(function (dep, index, col) { 
      return col.indexOf(dep) === index 
    })
}

function buildModule(module, cb) {
  gutil.log('Building ' + module + '...')

  dir.files(appPaths.src, function (err, files) {
    if (err) return done(err)
    
    const deps = getModuleDeps(module).reduce(function (dict, dep) { 
      return (dict[dep] = 'empty:') && dict 
    }, {})

    const plugins = {
      'async': '../rjs.noop',
      'css': '../rjs.noop',
      'goog': '../rjs.noop',
      'propertyParser': '../rjs.noop',
    }

    const opts = {
      baseUrl: appPaths.src,
      paths: _.extend({}, plugins, deps),
      include: files
        .map(function (file) { 
          return file.substring((appPaths.src + '/').length) 
        })
        .filter(function (file) { 
          return path.extname(file) === '.js' && 
                 file.indexOf(module) === 0 
        })
    }

    async.parallel([
      optimize.bind(null, _.extend({out: (appPaths.dist + '/optimized/viz.' + module + '.min.js')}, opts)),
      optimize.bind(null, _.extend({out: (appPaths.dist + '/optimized/viz.' + module + '.js'), optimize: 'none'}, opts))
    ], cb)
  }) 
}

function css(minify) {
  return gulp.src(appPaths.src + '/**/*.css')
    .pipe(sort())
    .pipe(concatCss(minify ? 'viz.min.css' : 'viz.css'))
    .pipe(minify ? minifyCss({keepBreaks:true}) : gutil.noop())
    .pipe(gulp.dest(appPaths.dist + '/optimized'))
}

function optimize(opts, cb) {
  //opts.optimize = "none";
  rjs.optimize(opts,
    function (text) { cb(null, text) },
    cb
  )
}

// Tasks
gulp.task('build-css', css.bind(null, false))

gulp.task('optimize-css', css.bind(null, true))

gulp.task('build-all', ['build-css', 'optimize-css'], function (cb) {
  async.each(Object.keys(modules), buildModule, cb) 
})

//  AMD Tasks  ---
function getJSFolders(dir) {
    var retVal = fs.readdirSync(dir).filter(function (file) {
        return fs.statSync(dir + "/" + file).isDirectory();
    });
    return retVal;
}

function getJSFiles(dir, prefix) {
    var dirParts = dir.split("/");
    var retVal = fs.readdirSync(dir).filter(function (file) {
        return file.indexOf(".js") === file.length - 3;
    }).map(function (fileName) {
        return prefix + "/" + dirParts[dirParts.length - 1] + "/" + fileName.substring(0, fileName.length - 3);
    });
    return retVal;
}

var bundles = ["common", "chart", "c3chart", "google", "tree", "other", "layout", "graph", "map", "marshaller"];  //  Order is important ---
var amd_bundles = {};
var amd_modules = bundles.map(function (bundle, idx) {
    var name = "hpcc-" + bundle;
    var include = [];
    var excludeShallow = ["css!font-awesome", "src/map/us-counties", "src/map/us-states", "src/map/countries"];
    switch (bundle) {
        case "common":
            include = ["d3", "d3.layout.cloud"];
            break;
    }
    include = include.concat(getJSFiles("src/" + bundle, "src").filter(function(item) {return excludeShallow.indexOf(item) < 0; }));
    amd_bundles["src/" + name] = include;
    return module = {
        name: name,
        include: include,
        exclude: bundles.filter(function (bundle2, idx2) { return bundle2 !== bundle && idx2 < idx }).map(function (bundle) { return "hpcc-" + bundle }),
        excludeShallow: excludeShallow,
        create: true
    };
});

gulp.task("amd_bundles_src", function (done) {
    var opts = {
        baseUrl: ".",
        appDir: "src",
        dir: "dist/amd",
        paths: {
            "requireLib": '../bower_components/requirejs/require',
            'css': '../bower_components/require-css/css',
            'css-builder': '../bower_components/require-css/css-builder',
            'normalize': '../bower_components/require-css/normalize',
            'async': '../bower_components/requirejs-plugins/src/async',
            'propertyParser': '../bower_components/requirejs-plugins/src/propertyParser',
            'goog': '../bower_components/requirejs-plugins/src/goog',

            'c3': '../bower_components/c3/c3',
            'd3': '../bower_components/d3/d3',
            'dagre': '../bower_components/dagre/index',
            'topojson': '../bower_components/topojson/topojson',
            'colorbrewer': '../bower_components/colorbrewer/colorbrewer',
            'd3.layout.cloud': '../bower_components/d3-cloud/d3.layout.cloud',
            'font-awesome': '../bower_components/font-awesome/css/font-awesome',

            "src": "../src"
        },
        modules: [{
            name: "hpcc-viz",
            include: ["requireLib", "css", "normalize"],
            create: true
        }].concat(amd_modules)
    };
    optimize(opts, done);
});

gulp.task("amd_bundles", ["amd_bundles_src"], function (done) {
    var requireConfig = {
        bundles: amd_bundles
    };
    fs.writeFile("dist/amd/hpcc-bundles.js",
        "require.config(" + JSON.stringify(requireConfig) + ");",
        function (error) { if (error) throw error; }
    );

    return gulp.src([
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/font-awesome/fonts/fontawesome-webfont.woff',
        'bower_components/font-awesome/fonts/fontawesome-webfont.woff2'

    ], { base: 'bower_components/' })
        .pipe(gulp.dest(appPaths.dist + "/amd"))
    ;
});

gulp.task('default', ['build-all', "amd_bundles"]);
