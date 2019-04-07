'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');
var rigger = require('gulp-rigger');
var rev = require('gulp-rev-append');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

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
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('bundle.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
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
    return pipeline(
        gulp.src('./app/js/*.js'),
        concat('bundle.min.js'),
        uglify(),
        gulp.dest('dist/js'),
        connect.reload()
    )
});

gulp.task('reload', function () {
    return gulp.src('*')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./dist/templates/*.html'], ['reload']);
    gulp.watch(['./app/*.html','./app/include/*.html'], ['html']);
    gulp.watch('./app/js/*.js', ['js']);
    gulp.watch('./app/less/*.less', ['less']);
});

gulp.task('default', ['connect', 'watch']);
