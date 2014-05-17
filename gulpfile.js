var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var jade = require('jade');
var gulp_jade = require('gulp-jade');
var wrap = require('gulp-wrap');
var clean = require('gulp-clean');
var mocha = require('gulp-mocha');

gulp.task('styl', function() {
	gulp.src('templates/ithank.styl')
		.pipe(stylus({ errors: true }))
		.pipe(gulp.dest('static'));
});

gulp.task('templates', function() {
	return gulp.src('templates/**/*.jade')
		.pipe(gulp_jade({ client: true }))
		// вставляем в каждый шаблон jade/runtime и дописываем module.exports для реквайра
		.pipe(wrap('var jade = require("jade/runtime");\n<%= contents %>;\nmodule.exports = template;'))
		.pipe(gulp.dest('client/templates'));
});

gulp.task('js', ['templates'], function() {
	return gulp.src('client/app.js')
		.pipe(browserify({
			// Включаем сорсмапы
			debug: true
		}))
		.pipe(rename('ithank.js'))
		.pipe(gulp.dest('static'));
});

// чистим за собой после сборки
gulp.task('clean', ['js'], function() {
	gulp.src('client/templates', { read: false })
		.pipe(clean());
});


gulp.task('watch', function() {
	// gulp.watch('templates/**/*.js', ['js']);
	gulp.watch('templates/**/*.styl', ['styl']);
});


gulp.task('test', function() {
	gulp.src(['tests/spec/*.js'])
		.pipe(mocha({ reporter: 'spec' }));
});

gulp.task('default', ['styl', 'js', 'clean']);
