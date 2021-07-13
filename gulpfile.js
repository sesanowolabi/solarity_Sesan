var gulp 			= require('gulp'),
	pkg				= require('./package.json'),
	autoprefixer 	= require('gulp-autoprefixer'),
	less 			= require('gulp-less'),
	cssmin 			= require('gulp-cssmin'),
	uglify 			= require('gulp-uglify');
	sequence		= require('run-sequence'),
    
// gulp.task('default', function () {
//     return gulp.src('src/app.css')
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('dist'));
// });

gulp.task('less', function() {
	return gulp.src('./client/src/less/main.less')
		.pipe(less({
			paths: ['./client/src/less']
		}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./client/src/css'));
});

gulp.task('cssmin', function() {
	return gulp.src('./client/src/css/main.css')
		.pipe(cssmin())
		.pipe(gulp.dest('./client/public/css'))
});

gulp.task('css', function() {
	sequence('less', 'cssmin');
});

gulp.task('watch', function() {
	gulp.watch('./client/src/less/**/*.less', ['css']);
});
