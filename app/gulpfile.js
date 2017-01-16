const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulpUtil = require('gulp-util');
const bower = require('gulp-bower');
const nodemon = require('nodemon');

gulp.task('sass', function () {
    return gulp.src('./assets/sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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

gulp.task('angular-backend', function() {
    return gulp.src([
        './assets/angular/backend/app.js'
    ])
    .pipe(concat('app-backend.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./html/assets/js/'));
});

gulp.task('angular-frontend', function() {
    return gulp.src([
        './assets/angular/frontend/controllers.js',
        './assets/angular/frontend/filters.js',
        './assets/angular/frontend/services.js',
        './assets/angular/frontend/app.js'
    ])
    .pipe(concat('app-frontend.min.js'))
    .pipe(uglify().on('error', gulpUtil.log))
    .pipe(gulp.dest('./html/assets/js/'));
});

gulp.task('server', function() {
    nodemon({
        script: 'app.js',
        watch: ['./'],
        ignore: ['./assets', './html']
    });
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('./html/assets/vendor/'));
});

gulp.task('deploy', function () {
    gulp.start('bower', 'sass', 'js', 'angular-backend', 'angular-frontend', 'server');
});

gulp.task('watch', function() {
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/js/*.js', ['js']);
    gulp.watch('./assets/angular/backend/*.js', ['angular-backend']);
    gulp.watch('./assets/angular/frontend/*.js', ['angular-frontend']);
});
