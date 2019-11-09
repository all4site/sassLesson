var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		notify = require('gulp-notify');


gulp.task('sass', function () {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass.sync())
		.on('error', notify.onError({
			message: "<%= error.message %>",
			title: "Sass Error!"
		}))
		.pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8'], {
			cascade: true
		}))
		.pipe(gulp.dest('app/css'))
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', function () {
	gulp.watch('app/sass/*.sass', gulp.parallel('sass'));
	gulp.watch('**/*.html').on('change', browserSync.reload);
	gulp.watch('app/css/*.css').on('change', browserSync.reload);
});
gulp.task('default', gulp.parallel('browser-sync', 'watch'));