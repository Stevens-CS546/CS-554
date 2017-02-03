const gulp = require("gulp");
const gulpWatch = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const rename = require("gulp-rename");

const sassFiles = [
    "./node_modules/tether/dist/css/tether.css",
    "./src/styles/variables.scss",
    "./node_modules/bootstrap/scss/bootstrap.scss",
    "./src/styles/custom.scss"
];

const vendorJsFiles = [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/tether/dist/js/tether.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js"
];

gulp.task("sass", () => {
    gulp.src(sassFiles)
        .pipe(gulpSASS())
        .pipe(concatenate("styles.css"))
        .pipe(gulp.dest("./public/css/"))
        .pipe(autoPrefix())
        .pipe(cleanCSS())
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest("./public/css/"));
});

gulp.task("js:vendor", () => {
    gulp.src(vendorJsFiles)
        .pipe(concatenate("vendor.min.js"))
        .pipe(gulp.dest("./public/js/"));
});

gulp.task("build", ["sass", "js:vendor"]);


gulp.task("watch", () => {
    gulp.watch(sassFiles, ["sass"]);
});

gulp.task("default", ["watch"]);
