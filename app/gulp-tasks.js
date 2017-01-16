const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

module.exports = function(){
    gulp.task('sass', function () {
        return gulp.src('./assets/sass/styles.scss')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename('styles.min.css'))
            .pipe(gulp.dest('./html/assets/css'));
    });

    gulp.watch('./assets/sass/**/*.scss', ['sass']);
}
