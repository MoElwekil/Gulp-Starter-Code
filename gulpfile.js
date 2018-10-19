// gulp
const gulp = require('gulp');
// gulp-sass
const sass = require('gulp-sass');
// Autoprefixer
const autoprefixer = require('gulp-autoprefixer');
// BrowserSync
const browserSync = require('browser-sync').create();
// eslint
const eslint = require('gulp-eslint');
// Concat
const contact = require('gulp-concat');

// Default setup
gulp.task('default', ['styles', 'js', 'lint', 'copy-html', 'copy-images', 'copy-js'], function () {
	// watch all files
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('js/**/*.js', ['js']);
	gulp.watch('js/**/*.js', ['lint']);
	gulp.watch('*.html', ['copy-html']);
	gulp.watch('img/*', ['copy-images']);
	gulp.watch('js/*', ['copy-js']);
	gulp.watch('*.html').on('change', browserSync.reload);

	// call the BrowserSync
	browserSync.init({
		server: './dist'
	});
}); // end gulp Default setup

// lint
gulp.task('lint', function () {
	return (
		gulp
			.src(['js/**/*.js'])
			// eslint() attaches the lint output to the eslint property
			// of the file object so it can be used by other modules.
			.pipe(eslint())
			// eslint.format() outputs the lint results to the console.
			// Alternatively use eslint.formatEach() (see Docs).
			.pipe(eslint.format())
			// To have the process exit with an error code (1) on
			// lint error, return the stream and pipe to failOnError last.
			.pipe(eslint.failOnError())
	);
});

// styles
gulp.task('styles', function () {
	gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

// js
gulp.task('js', function () {
	gulp.src('js/**/*.js')
		.pipe(contact('app.js'))
		.pipe(gulp.dest('dist/js'))
});

gulp.task('copy-js', function () {
	gulp.src('js/**/*.js')
		.pipe(contact('app.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});

// copy html
gulp.task('copy-html', function () {
	gulp.src('./*.html')
		.pipe(gulp.dest('./dist'));
});

// copy images
gulp.task('copy-images', function () {
	gulp.src('img/*')
		.pipe(gulp.dest('dist/img'));
});