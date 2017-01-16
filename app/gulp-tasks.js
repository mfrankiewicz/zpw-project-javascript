const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

module.exports = function(){
    gulp.task('sass', function () {
        return gulp.src('./assets/sass/styles.scss')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(rename('styles.min.css'))
            .pipe(gulp.dest('./html/assets/css'));
    });

    gulp.task('js', function() {
        return gulp.src([
            './assets/js/plugins.js',
            './assets/js/scripts.js'
        ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./html/assets/js/'));
    });

    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/js/*.js', ['js']);
}
