var gulp = require('gulp'),
    less = require('gulp-less'),
    // concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    notify = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    less = require('gulp-less');

// server
gulp.task('connect', function() {
    connect.server({
        root: '',
        livereload: true
    });
});

// html
gulp.task('html', function() {
    gulp.src('**/**/*.html')
        .pipe(connect.reload());
});

// css
gulp.task('css', function() {
    return gulp.src('src/assets/css/*.css')
        // .pipe(concatCss("style.css"))
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 3 versions', '> 5%']
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build"))
        .pipe(connect.reload())
        .pipe(notify("DONE!"));
});

// js
gulp.task("js", function(){
	gulp.src('src/assets/scripts/*.js')
		.pipe(concat('script.js'))
		.pipe(gulp.dest('build'))
		.pipe(connect.reload())
        .pipe(notify("DONE!"));
})

// less
gulp.task("less", function() {
    return gulp.src('src/assets/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/assets/css'));
        // .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('src/assets/less/*.less', ['less'])
    gulp.watch('src/assets/css/*.css', ['css'])
    gulp.watch('**/**/*.html', ['html'])
    gulp.watch('src/assets/scripts/*.js', ['js']);
});

gulp.task('default', ['connect', 'watch']);