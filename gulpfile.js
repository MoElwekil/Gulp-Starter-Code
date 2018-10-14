// gulp
const gulp = require('gulp');
// gulp-sass
const sass = require('gulp-sass')
// Autoprefixer
const autoprefixer = require('gulp-autoprefixer')
// BrowserSync
const browserSync = require('browser-sync').create()

// Default setup
gulp.task('default', ['styles'], function(){
	// watch the sass file 
	gulp.watch('sass/**/*.scss', ['styles']);
	// call the BrowserSync 
	browserSync.init({
		server: './'
	})
}); // end gulp Default setup

// styles
gulp.task('styles', function(){
	gulp.src('sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 2 versions']
	}))
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.stream())
})