'use strict'

var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-ruby-sass');

var paths = {
	styles: {
		src: 'public/styles/site/**/**.scss',
		dest: 'public/styles/site/',
		destDel: 'public/styles/site/**.css'
	}
};

function clean() {
	return del(paths.styles.destDel).then(paths => {
				console.log('Deleted files and folders:\n', paths.join('\n'));
			});
}

function styles() {
	return sass(paths.styles.src)
				.on('error', sass.logError)
				.pipe(gulp.dest(paths.styles.dest))
}

function watch() {
	gulp.watch(paths.styles.src, styles);
}

exports.clean = clean;
exports.styles = styles;
exports.watch = watch;

var build = gulp.series(clean, styles);

gulp.task('build', build)

gulp.task('default', build)