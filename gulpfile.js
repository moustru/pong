const gulp = require('gulp');
const ts = require('gulp-typescript');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');
const rimraf = require('rimraf');

const path = {
    dev: {
        pug: './dev/*.pug',
        styles: './dev/scss/*.scss',
        fonts: './dev/fonts/*.ttf',
        scripts: './dev/ts/*.ts'
    },

    build: {
        html: './build/',
        styles: './build/css/',
        fonts: './build/fonts/',
        scripts: './dev/js/'
    },

    clean: './build/*'
}

gulp.task('build', [
    'pug',
    'css',
    'fonts',
    'ts'
]);

gulp.task('pug', () => {
    return gulp.src(path.dev.pug)
        .pipe(pug())
        .pipe(gulp.dest(path.build.html))
});

gulp.task('css', () => {
    gulp.src(path.dev.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.build.styles))
})

gulp.task('fonts', () => {
    gulp.src(path.dev.fonts)
        .pipe(ttf2woff())
        .pipe(gulp.dest(path.build.fonts))
    gulp.src(path.dev.fonts)
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('ts', () => {
    gulp.src(path.dev.scripts)
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'pong.js'
        }))
        .pipe(gulp.dest(path.build.scripts))
});

gulp.task('clean', (d) => {
	rimraf(path.clean, d);
});