var gulp    = require('gulp'),
	uglify = require('gulp-uglify'),
	babel  = require('gulp-babel'),
	concat = require('gulp-concat'),
	es     = require('event-stream'),
	reload = require('gulp-livereload'),
	rename = require('gulp-rename'),
	react  = require('gulp-react'),
	browserify = require('browserify'),
	reactify   = require('reactify'),
	babelify   = require('babelify'),
	watchify   = require('watchify'),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream'),
	exec   = require('child_process').exec;

///--------------///

function bundle(filename) {
	var bundler = watchify(browserify('./app/client/' + filename + '.js'));

	bundler.transform(babelify);
	bundler.transform(reactify);

	return bundler.bundle()
		.pipe(source(filename + '.bundle.js'))
		.pipe(buffer()) // Turn the stream into a buffer, so we can run gulp tasks as normal on it
		.pipe(uglify())
		.pipe(gulp.dest('./dist/client'));
}

///--------------///

gulp.task('server', function() {
	return gulp.src('app/server/**/*.js')
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('dist/server'))
		.pipe(reload());
});

gulp.task('ejs', function() {
	return gulp.src('app/server/views/**/*.ejs')
		.pipe(gulp.dest('dist/server/views'));
});

gulp.task('jsx', function() {
	return gulp.src('app/**/*.react.js')
		.pipe(babel())
		.pipe(react())
		.pipe(uglify())
		.pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
	return gulp.src('app/client/**/*.css')
		.pipe(concat('stylesheet.css'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/client'));
});

gulp.task('bundle', ['jsx'], function() {
	//return es.merge(bundle('login.jsx'));
	return bundle('main');
});

gulp.task('start', ['server', 'bundle', 'css', 'ejs'], function(cb) {
	exec('node dist/server/main.js', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

///--------------///

gulp.task('default', ['server', 'bundle', 'css', 'ejs', 'start']);
