var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

gulp.task('styl', function() {
	gulp.src('templates/ithank.styl')
		.pipe(stylus({ errors: true }))
		.pipe(gulp.dest('static'));
});

// gulp.task('js', function() {
// 	gulp.src('templates/**/*.js')
// 		.pipe(concat('ithank.js'))
// 		.pipe(gulp.dest('static'));
// });

gulp.task('watch', function() {
	// gulp.watch('templates/**/*.js', ['js']);
	gulp.watch('templates/**/*.styl', ['styl']);
});

gulp.task('default', ['styl']);
