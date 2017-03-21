var gulp = require("gulp"),
    browserify = require("browserify"),
    tsify = require("tsify"),
    source = require("vinyl-source-stream"),
    watch = require("gulp-watch"),
    prefixer = require("gulp-autoprefixer"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    rigger = require("gulp-rigger"),
    cssmin = require("gulp-clean-css"),
    rimraf = require("rimraf"),
    browserSync = require("browser-sync"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    minifycss = require("gulp-minify-css"),
    ghPages = require('gulp-gh-pages'),
    reload = browserSync.reload;
    // historyApiFallback = require("connect-history-api-fallback"),
    // bs = browserSync.create();
var path = {
    build: {
        html: "./dist/",
        script: "./dist/js/",
        style: "./dist/style",
        img: "./dist/img/",
        lib: "./dist/lib/"
    },
    src: {
        html: "./src/**/*.html",
        script: "./src/main.ts",
        style: "./src/main.css",
        img: "./src/img/**/*.*"
    },
    watch: {
        html: "./src/**/*.html",
        script: "./src/app/**/*.ts",
        style: "./src/**/*.css",
        img: "./src/img/**/*.*"
    },
    clean: "./dist/"
};
var configServer = {
    server: {
        baseDir: [
            "./dist/"
        ]
        // middleware: [ historyApiFallback() ]
    },
    tunnel: true,
    host: "localhost",
    port: 9000,
    logPrefix: "Server start " + Date.now()
};
gulp.task("deploying", function() {
    return gulp.src("./dist/**/*")
        .pipe(ghPages());
});
gulp.task("html:build", function() {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
gulp.task("script:build", function() {
    return browserify({
        basedir: ".",
        debug: true,
        entries: [path.src.script],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest(path.build.script));
});
gulp.task("style:build", function() {
    gulp.src(path.src.style)
        .pipe(minifycss())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});
gulp.task("image:build", function() {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});
gulp.task("lib:copy", function() {
    return browserify([
        "node_modules/core-js/client/shim.min.js",
        "node_modules/reflect-metadata/Reflect.js",
        "node_modules/zone.js/dist/zone.js",
        "node_modules/angular2-google-maps/core/index.js"
    ])
        .bundle()
        .pipe(source("lib.js"))
        .pipe(gulp.dest(path.build.lib));
});
gulp.task("watch", function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start("html:build");
    });
    watch([path.watch.script], function(event, cb) {
        gulp.start("script:build");
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start("style:build");
    });
});
gulp.task("webserver", function() {
    browserSync(configServer);
    // bs.init(configServer);
});
gulp.task("clean", function(cb) {
    rimraf(path.clean, cb);
});
/**
 * Видаляємо папку .publish після завершення задачі "deploying"
 */
gulp.task("deploying:clean", ["deploying"], function(cb) {
    rimraf("./.publish", cb);
});
// gulp.task("build", ["html:build", "script:build", "style:build", "image:build", "lib:copy"]);
gulp.task("deploy", ["deploying", "deploying:clean"]);
gulp.task("build", ["html:build", "script:build", "style:build", "lib:copy"]);
gulp.task("default", ["build", "webserver", "watch"]);