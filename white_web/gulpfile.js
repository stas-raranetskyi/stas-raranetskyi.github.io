'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    rigger = require('gulp-rigger'),
    rev = require('gulp-rev-append');
 
// rev
gulp.task('rev', function() {
  gulp.src('./dist/*.html')
    .pipe(rev())
    .pipe(gulp.dest('./dist'));
});

// connect
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// less
gulp.task('less', function () {
    return gulp.src('./app/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css/'));
});

// html
gulp.task('html', function () {
    return gulp.src('./app/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

// js
gulp.task('js', function () {
    return gulp.src('dist/js/*.js')
        .pipe(connect.reload());
});

// css
gulp.task('css', function () {
    return gulp.src('dist/css/*.css')
        .pipe(connect.reload());
});

gulp.task('default', ['connect', 'watch']);

gulp.task('watch', function () {
  gulp.watch(['./app/*.html','./app/include/*.html'], ['html']);
  gulp.watch('./dist/js/*.js', ['js']);
  gulp.watch('./dist/css/*.css', ['css']);
  gulp.watch('./app/less/*.less', ['less']);
});