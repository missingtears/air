/**
 * gulpfile
 * @authors fengpingping (pingping_feng@fpi-inc.com)
 * @date    2015-06-11 09:39:33
 * @version 1.0.0
 */

var gulp = require('gulp'),
	connect = require('gulp-connect'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
	zip = require('gulp-zip');
 
gulp.task('connect', function() {
	connect.server({
		port: 9999
	});
});

gulp.task('minify-css', function() {
  return gulp.src('stylesheets/main.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('stylesheets/'));
});

gulp.task('publish', function () {
    return gulp.src(['images/**/*', 'app/**/*',
    'bower_components/requirejs/require.min.js',
    'javascripts/main-built.js',
    'javascripts/template/**/*',
    'stylesheets/**/*'], {base: __dirname})
        .pipe(zip('hangzhou'+ new Date().getTime() +'.zip'))
        .pipe(gulp.dest('dist'));
});
 
gulp.task('default', ['connect']);