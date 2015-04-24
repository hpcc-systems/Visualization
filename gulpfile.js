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
  common: ['d3/d3', 'colorbrewer/colorbrewer', 'font-awesome', 'require'],

  other: ['common'],
  tree: ['common'],

  chart: ['other'],
  graph: ['dagre/dagre', 'other'],

  c3: ['c3/c3', 'chart'],
  google: ['chart' /* Google Visualization */],
  map: ['graph', 'topojson/topojson' /* , Google Map */],
  
  layout: ['c3'],
  marshaller: ['chart', 'graph', 'layout'],
  amcharts: ['amcharts/amcharts','amcharts/funnel','amcharts/gauge','amcharts/pie','amcharts/radar','amcharts/serial','amcharts/xy','chart']
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
const plugin_paths = {
    'css': '../bower_components/require-css/css',
    'css-builder': '../bower_components/require-css/css-builder',
    'normalize': '../bower_components/require-css/normalize',
    'async': '../bower_components/requirejs-plugins/src/async',
    'propertyParser': '../bower_components/requirejs-plugins/src/propertyParser',
    'goog': '../bower_components/requirejs-plugins/src/goog'
};

gulp.task('amd_bower_stage', function () {
    return gulp.src([
        "bower_components/c3/c3.js",
        "bower_components/c3/c3.css",
        "bower_components/d3/d3.js",
        "bower_components/colorbrewer/colorbrewer.js",
        "bower_components/dagre/index.js",
        "bower_components/topojson/topojson.js",
        "bower_components/d3-cloud/d3.layout.cloud.js",
        'bower_components/font-awesome/css/font-awesome.css',
        'bower_components/font-awesome/fonts/fontawesome-webfont.woff',
        'bower_components/amcharts/dist/amcharts/amcharts.js',
        'bower_components/amcharts/dist/amcharts/funnel.js',
        'bower_components/amcharts/dist/amcharts/gauge.js',
        'bower_components/amcharts/dist/amcharts/pie.js',
        'bower_components/amcharts/dist/amcharts/radar.js',
        'bower_components/amcharts/dist/amcharts/serial.js',
        'bower_components/amcharts/dist/amcharts/xy.js',

    ], { base: 'bower_components/' })
        .pipe(gulp.dest(appPaths.dist + "/amd/stage"))
    ;
});

gulp.task("amd_third_party", ["amd_bower_stage"], function (done) {
    var opts = {
        baseUrl: '.',
        appDir: appPaths.dist + '/amd/stage',
        dir: appPaths.dist + '/amd/lib',
        path: plugin_paths
    };
    optimize(opts, function (err, cb) {
        del([appPaths.dist + "/amd/stage/"]);
        done(err, cb);
    });  
})

gulp.task("amd_src", function (done) {
    var opts = {
        baseUrl: '.',
        appDir: appPaths.src,
        dir: appPaths.dist + '/amd/src',
        path: plugin_paths
    };
    optimize(opts, done);
})

function getJSFiles(dir, prefix) {
    var dirParts = dir.split("/");
    var retVal = fs.readdirSync(dir).filter(function (file) {
        return file.indexOf(".js") === file.length - 3;
    }).map(function (fileName) {
        return prefix + "/" + dirParts[dirParts.length - 1] + "/" + fileName.substring(0, fileName.length - 3);
    });
    return retVal;
}

gulp.task("amd_layers", ["amd_third_party", "amd_src"], function (done) {
    var opts = {
        baseUrl: '.',
        appDir: "null",
        dir: appPaths.dist + '/amd/layers',
        optimize: "none",
        paths: _.assign({}, plugin_paths, {
            'viz': '../dist/amd/src',
            'd3': '../dist/amd/lib/d3',
            'c3': '../dist/amd/lib/c3',
            'dagre/dagre': '../dist/amd/lib/dagre/index',
            'topojson': '../dist/amd/lib/topojson',
            'colorbrewer': '../dist/amd/lib/colorbrewer',
            'd3-cloud': '../dist/amd/lib/d3-cloud',
            "font-awesome": "../dist/amd/lib/font-awesome",
            "amcharts": "../dist/amd/lib/amcharts/dist/amcharts",
        }),
        modules: [
            {
                name: "all",
                include: getJSFiles("src/marshaller", "viz").concat(getJSFiles("src/chart", "viz")).concat(getJSFiles("src/common", "viz")).concat(getJSFiles("src/c3", "viz")).concat(getJSFiles("src/google", "viz")).concat(getJSFiles("src/graph", "viz")).concat(getJSFiles("src/map", "viz")).concat(getJSFiles("src/other", "viz")).concat(getJSFiles("src/tree", "viz")).concat(getJSFiles("src/amcharts", "viz")),
                excludeShallow: [
                    "viz/map/us-counties",
                    "viz/map/us-states",
                    "viz/map/countries",
                    "css!font-awesome/css/font-awesome"
                ],
                create: true
            }
        ]
    };
    optimize(opts, done);
})

gulp.task('default', ['build-all', "amd_layers"]);
