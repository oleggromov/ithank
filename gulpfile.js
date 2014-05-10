var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task('styl', function() {
	gulp.src('templates/ithank.styl')
		.pipe(stylus({ errors: true }))
		.pipe(gulp.dest('static'));
});

gulp.task('js', function() {
    gulp.src('client/app.js')
    	.pipe(rename('ithank.js'))
        .pipe(browserify())
        .pipe(gulp.dest('static'))
});

gulp.task('watch', function() {
	// gulp.watch('templates/**/*.js', ['js']);
	gulp.watch('templates/**/*.styl', ['styl']);
});

gulp.task('default', ['js', 'styl']);
