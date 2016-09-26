const gulp = require("gulp");
const gulpWatch = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const babel = require("gulp-babel");

const cssFiles = "./public/css/source/**/*.css";
const sassFiles = "./public/css/source/sass/**/*.scss";
const jsxFiles = "./public/js/source/components/**/*.js";
const vendorFiles = ["./public/js/vendor/jquery.min.js", "./public/js/vendor/bootstrap.min.js", "./public/js/vendor/react.min.js", "./public/js/vendor/react-dom.min.js"];

gulp.task("sass", () => {
    gulp
        .src(sassFiles)
        .pipe(gulpSASS())
        .pipe(concatenate("styles-from-sass.min.css"))
        .pipe(autoPrefix())
        //.pipe(cleanCSS())
        .pipe(gulp.dest("./public/css/"));
});

gulp.task("css", () => {
    gulp
        .src(cssFiles)
        .pipe(concatenate("styles.min.css"))
        .pipe(autoPrefix())
        .pipe(cleanCSS())
        .pipe(gulp.dest("./public/css/"));
})

gulp.task("jsx", () => {
    return gulp
        .src(jsxFiles)
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(concatenate("components.js"))
        .pipe(gulp.dest("./public/js/"));
});

gulp.task("vendor", () => {
    return gulp
        .src(vendorFiles)
        .pipe(concatenate("vendor.js"))
        .pipe(gulp.dest("./public/js/"));
});

gulp.task("watch", () => {
    gulp.watch(cssFiles, ["css"]);
    gulp.watch(sassFiles, ["sass"]);
    gulp.watch(jsxFiles, ["jsx"]);
});

gulp.task("default", ["watch"]);
