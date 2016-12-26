//-------------------------------------------------------------------
// PLUGINS
//-------------------------------------------------------------------

// plugins
var gulp = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    del = require("del"),
    browserSync = require("browser-sync"),
    historyApiFallback = require('connect-history-api-fallback'),
    runSequence = require("run-sequence"),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackConfig = require('./webpack.config'),
    babel = require('babel-core'),
    reporters = require('jasmine-reporters');

//-------------------------------------------------------------------
// SETUP
//-------------------------------------------------------------------

// environments
var app = "app/";
var dev = ".tmp/";
var prod = "dist/";

//folders
var styles = "assets/styles";
var scripts = "assets/scripts";
var images = "assets/images";
var fonts = "assets/fonts";

var AUTOPREFIXER_BROWSERS = [
    "ie >= 9",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4",
    "bb >= 10",
];

//-------------------------------------------------------------------
// TASKS
//-------------------------------------------------------------------

gulp.task("styles", function() {
    return gulp.src(app + styles + "/**/*.scss")
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            includePaths: ["./node_modules/frontendler-sass"]
        }).on("error", plugins.sass.logError))
        .pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(dev + styles))
        .pipe(browserSync.stream())
        .pipe(plugins.size({
            title: "styles",
        }));
});

gulp.task("scripts", function() {
    return gulp.src(app + scripts + "/main.js")
        .pipe(plugins.plumber())
        .pipe(webpackStream(webpackConfig.PROD))
        .pipe(gulp.dest(dev + scripts))
        .pipe(plugins.size({
            title: "scripts"
        }));
});

gulp.task("images", function() {
    return gulp.src(app + images + "/**/*")
        .pipe(plugins.plumber())
        .pipe(plugins.cache(plugins.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(prod + images))
        .pipe(plugins.size({
            title: "images"
        }));
});

gulp.task("html", function() {
    return gulp.src([app + "**/*.html"])
        .pipe(plugins.plumber())
        .pipe(plugins.useref({
            searchPath: "{" + dev + "," + app + "}"
        }))
        .pipe(plugins.if("*.js", plugins.uglify()))
        .pipe(plugins.if("*.css", plugins.cssnano()))
        .pipe(plugins.if("*.html", plugins.minifyHtml()))
        .pipe(gulp.dest(prod))
        .pipe(plugins.size({
            title: "useref total"
        }));
});

//-------------------------------------------------------------------
// WATCH
//-------------------------------------------------------------------

gulp.task("clean:dev", del.bind(null, [dev]));
gulp.task("serve:dev", function() {

    var bundler = webpack(webpackConfig.DEV);

    browserSync({
        // tunnel: "frontendler",
        logConnections: true,
        logFileChanges: true,
        logPrefix: "Frontendler",
        server: {
            baseDir: [dev, app],
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: webpackConfig.DEV.output.publicPath,
                    stats: {
                        colors: true
                    }
                }),
                webpackHotMiddleware(bundler),
                historyApiFallback()
            ]
        }
    });

    gulp.watch([app + styles + "/**/*.scss"], ["styles"]);
    gulp.watch([app + fonts + "**/*"], ["fonts", browserSync.reload]);
    gulp.watch([app + images + "/**/*"], browserSync.reload);

});

gulp.task("default", ["clean:dev"], function(cb) {
    runSequence(["styles"], "serve:dev", cb);
});

//-------------------------------------------------------------------
// BUILD
//-------------------------------------------------------------------

gulp.task("clean:prod", del.bind(null, [prod]));
gulp.task("copy:prod", function() {
    gulp.src([app + fonts + "/**/*.{eot,svg,ttf,woff}"])
        .pipe(gulp.dest(prod + fonts));
    gulp.src([app + "*.*", "node_modules/apache-server-configs/dist/.htaccess"], {
            dot: true
        })
        .pipe(gulp.dest(prod));
});

gulp.task("build", ["clean:prod"], function(cb) {
    runSequence(["styles", "scripts", "images", "copy:prod"], "html", cb);
});


//-------------------------------------------------------------------
// TEST
//-------------------------------------------------------------------

gulp.task("test:server", function() {

    var bundler = webpack(webpackConfig.TEST);

    browserSync({
        logConnections: true,
        logFileChanges: true,
        logPrefix: "Frontendler",
        server: {
            baseDir: ['test/'],
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: webpackConfig.TEST.output.publicPath,
                    quiet: false,
                    stats: {
                        colors: true
                    }
                }),
                webpackHotMiddleware(bundler),
                historyApiFallback()
            ]
        }
    });

    gulp.watch(["test/**/*.js"], browserSync.reload);
});

gulp.task('test',function(){
    webpackConfig.PROD.devtool = "";
    return gulp.src(['test/**/*.js'])
        .pipe(plugins.plumber())
        .pipe(webpackStream(webpackConfig.PROD))
        .pipe(gulp.dest('.test/'))
        .pipe(plugins.jasmine());
});
