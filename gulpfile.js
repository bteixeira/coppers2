var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('compile:sass', function () {
    gulp.src([
        './assets/stylesheets/batch_webfont.scss',
        './assets/stylesheets/global.scss',
        './assets/stylesheets/main.scss',
        './assets/stylesheets/slider.scss',
        './assets/stylesheets/login.scss'
    ])
        .pipe(sass({
            indentWidth: 4,
            outputStyle: 'expanded',
            sourceComments: true
        }).on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('server', ['compile:sass'], function () {
    require('./bin/www');

    gulp.watch('./assets/stylesheets/**/*.scss', ['compile:sass']);
});