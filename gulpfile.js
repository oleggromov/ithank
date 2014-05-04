var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

gulp.task('styl', function() {
	gulp.src('blocks/ithank.styl')
		.pipe(stylus({ errors: true }))
		.pipe(gulp.dest('static'));
});

// gulp.task('js', function() {
// 	gulp.src('blocks/**/*.js')
// 		.pipe(concat('ithank.js'))
// 		.pipe(gulp.dest('static'));
// });

gulp.task('watch', function() {
	// gulp.watch('blocks/**/*.js', ['js']);
	gulp.watch('blocks/**/*.styl', ['styl']);
});

gulp.task('default', ['styl', 'watch']);