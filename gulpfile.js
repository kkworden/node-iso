var gulp     = require('gulp'),
	uglify  = require('gulp-uglify'),
	babel   = require('gulp-babel'),
	concat  = require('gulp-concat'),
	es      = require('event-stream'),
	react   = require('gulp-react'),
	browserify = require('browserify'),
	reactify   = require('reactify'),
	babelify   = require('babelify'),
	buffer  = require('vinyl-buffer'),
	source  = require('vinyl-source-stream'),
	spawn   = require('child_process').spawn,
	gutil   = require('gulp-util');

///--------------///

var p;

var SRC_SERVER = 'app/server/**/*.js';
var SRC_EJS = 'app/server/views/**/*.ejs';
var SRC_JSX = 'app/**/*.react.js';
var SRC_CSS = 'app/client/**/*.css';

///--------------///

var runServer = function() {
	if(p)
	{
		gutil.log(gutil.colors.red('Server reloaded due to file change.'));
		p.kill();
	}

	p = spawn('node', ['dist/server/main.js']);

	p.stdout.setEncoding('utf8');
	p.stderr.setEncoding('utf8');

	p.stdout.on('data', function(data) {
		process.stdout.write(data);
	});

	p.stderr.on('data', function(data) {
		process.stdout.write(data);
	});
}

function bundle(filename) {
	var bundler = browserify('./app/client/' + filename + '.js');

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
	return gulp.src(SRC_SERVER)
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('dist/server'));
});

gulp.task('ejs', function() {
	return gulp.src(SRC_EJS)
		.pipe(gulp.dest('dist/server/views'));
});

gulp.task('jsx', function() {
	return gulp.src(SRC_JSX)
		.pipe(babel())
		.pipe(react())
		.pipe(uglify())
		.pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
	return gulp.src(SRC_CSS)
		.pipe(concat('stylesheet.css'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/client'));
});

gulp.task('bundle', ['jsx'], function() {
	//return es.merge(bundle('login.jsx'));
	return bundle('main');
});

gulp.task('watch', function() {
	gulp.watch(SRC_SERVER, ['server']).on('change', runServer);
	gulp.watch(SRC_EJS, ['ejs']).on('change', runServer);
	gulp.watch(SRC_JSX, ['bundle']).on('change', runServer);
	gulp.watch(SRC_CSS, ['css']).on('change', runServer);
});

///--------------///

gulp.task('default', ['server', 'bundle', 'css', 'ejs', 'watch'], runServer);
gulp.task('production', ['server', 'bundle', 'css', 'ejs'], runServer);
