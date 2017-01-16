const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const uglify = require('gulp-uglify');
const gulpUtil = require('gulp-util');
const bower = require('bower');
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

gulp.task('vendor-js', function() {
    return gulp.src([
        './assets/vendor/angular/angular.min.js',
        './assets/vendor/angular-animate/angular-animate.min.js',
        './assets/vendor/angular-resource/angular-resource.min.js',
        './assets/vendor/angular-route/angular-route.min.js',
        './assets/vendor/socket.io-client/dist/socket.io.min.js',
        './assets/vendor/jquery/dist/jquery.min.js',
        './assets/vendor/jquery.nicescroll/dist/jquery.nicescroll.min.js',
        './assets/vendor/tether/dist/js/tether.min.js',
        './assets/vendor/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest('./html/assets/js/'));
});

gulp.task('vendor-css', function() {
    return gulp.src([
        './assets/vendor/bootstrap/dist/css/bootstrap.min.css',
        './assets/vendor/tether/dist/css/tether.min.css',
        './assets/vendor/font-awesome/css/font-awesome.min.css'
    ])
    .pipe(concatCss('libs.min.css', {
        inlineImports: false,
    }))
    .pipe(gulp.dest('./html/assets/css/'));
});

gulp.task('watch', function() {
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/js/*.js', ['js']);
    gulp.watch('./assets/angular/backend/*.js', ['angular-backend']);
    gulp.watch('./assets/angular/frontend/*.js', ['angular-frontend']);
});

gulp.task('deploy', function() {
    bower.commands.install([], {save: true}, {});
    gulp.start('sass', 'js', 'angular-backend', 'angular-frontend', 'vendor-js', 'vendor-css');
    nodemon({
        script: 'app.js',
        watch: ['./'],
        ignore: ['./assets', './html']
    });
})
