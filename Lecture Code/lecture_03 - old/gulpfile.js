const gulp = require("gulp");
const gulpWatch = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");

const cssFiles = "./public/css/source/**/*.css";
const sassFiles = "./public/css/source/sass/**/*.scss";

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
});

gulp.task("watch", () => {
  gulp.watch(cssFiles, ["css"]);
  gulp.watch(sassFiles, ["sass"]);
});

gulp.task("default", ["watch"]);
