//-------------------------------------------------------------------
// PLUGINS
//-------------------------------------------------------------------

// plugins
var gulp = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackDevServer = require("webpack-dev-server"),
    historyApiFallback = require('connect-history-api-fallback'),
    del = require("del"),
    runSequence = require("run-sequence"),
    browserSync = require("browser-sync"),
    pagespeed = require("psi");

//-------------------------------------------------------------------
// SETUP
//-------------------------------------------------------------------

// environments
var app = "app";
var dev = ".tmp";
var prod = "dist";

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
    return gulp.src(app + "/" + styles + "/**/*.scss")
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            includePaths: ["./node_modules/frontendler-sass"]
        }).on("error", plugins.sass.logError))
        .pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(dev + "/" + styles))
        .pipe(browserSync.stream())
        .pipe(plugins.size({
            title: "styles",
        }));
});

gulp.task("scripts", function() {
    return gulp.src(app + "/" + scripts + "/index.js")
        .pipe(plugins.plumber())
        .pipe(webpackStream({
            cache: true,
            output: {
              filename: 'bundle.js',
            },
            module: {
              exclude: /node_modules/,
              loaders:[{
                loader: 'babel'
              }]
            },
            resolve: {
              extensions: ["", ".js",".jsx",'.es6'],
          }
        }))
        .pipe(gulp.dest(dev + "/" + scripts));
});


gulp.task('scripts:dev',function (){
    var compiler = webpack({
        watch:true,
        entry: './app/assets/scripts/index.js',
        output: {
          filename: 'bundle.js',
          path: "/"
        },
        module: {
          exclude: /node_modules/,
          loaders:[{
            loader: 'babel'
          }]
        },
        resolve: {
          extensions: ["", ".js",".jsx",'.es6'],
      }
    });

    var webpackServer =  new webpackDevServer(compiler, {
        hot: true,
        stats: {
			colors: true
		},
    })

    webpackServer.listen(8080, "localhost", function() {
    });
});

gulp.task("images", function() {
    return gulp.src(app + "/" + images + "/**/*")
        .pipe(plugins.plumber())
        .pipe(plugins.cache(plugins.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(prod + "/" + images))
        .pipe(plugins.size());
});

gulp.task("html", function() {
    return gulp.src([app + "/**/*.html"])
        .pipe(plugins.plumber())
        .pipe(plugins.useref({ searchPath: "{" + dev + "," + app + "}" }))
        .pipe(plugins.if("*.js", plugins.uglify()))
        .pipe(plugins.if("*.css", plugins.csso()))
        .pipe(plugins.if("*.html", plugins.minifyHtml()))
        .pipe(gulp.dest(prod + "/"))
        .pipe(plugins.size({
            title: "html"
        }));
});

//-------------------------------------------------------------------
// WATCH
//-------------------------------------------------------------------

gulp.task("clean:dev", del.bind(null, [dev]));
gulp.task("serve:dev", function() {

    browserSync({
        //tunnel: "frontendler",
        logConnections: true,
        logFileChanges: true,
        logPrefix: "Frontendler",
        server: {
            baseDir: [dev, app],
            middleware: [ historyApiFallback() ]
        }
    });

    // gulp.watch([app + "/" + scripts + "/**/*.js"], "scripts:dev",browserSync.reload]);
    gulp.watch([app + "/" + styles + "/**/*.scss"], ["styles"]);
    gulp.watch([app + "/" + fonts + "**/*"], ["fonts", browserSync.reload]);
    gulp.watch([app + "/" + images + "/**/*"], browserSync.reload);

});

gulp.task("watch", ["clean:dev"], function(cb) {
    runSequence(["styles","scripts:dev"], "serve:dev", cb);
});

//-------------------------------------------------------------------
// BUILD
//-------------------------------------------------------------------

gulp.task("clean:prod", del.bind(null, [prod]));
gulp.task("copy:prod", function() {
    gulp.src([app + "/" + fonts + "/**/*.{eot,svg,ttf,woff}"])
        .pipe(gulp.dest(prod + "/" + fonts));
    gulp.src([app + "/*.*", "node_modules/apache-server-configs/dist/.htaccess"], {
            dot: true
        })
        .pipe(gulp.dest(prod));
});

gulp.task("build", ["clean:prod"], function(cb) {
    runSequence(["styles", "scripts", "images", "copy:prod"], "html", cb);
});

// Update `url` below to the public URL for your site
gulp.task("pagespeed", function() {
    pagespeed("frontendler.com.br", function(err, data) {
        console.log(data);
    });
});
