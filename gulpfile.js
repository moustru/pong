const gulp = require('gulp');
const ts = require('gulp-typescript');
const rimraf = require('rimraf');

const path = {
    dev: {
        html: './dev/*.html',
        styles: './dev/css/*.*',
        fonts: './dev/fonts/*.*',
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
    'html',
    'styles',
    'fonts',
    'ts'
]);

gulp.task('html', () => {
    gulp.src(path.dev.html).pipe(gulp.dest(path.build.html))
});

gulp.task('styles', () => {
    gulp.src(path.dev.styles).pipe(gulp.dest(path.build.styles))
})

gulp.task('fonts', () => {
    gulp.src(path.dev.fonts).pipe(gulp.dest(path.build.fonts))
});

gulp.task('ts', () => {
    gulp.src(path.dev.scripts)
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'pong.js'
        }))
        .pipe(gulp.dest(path.build.scripts))
});