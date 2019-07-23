/**
 * Versyx Digital Ltd 2019
 *
 * gulpfile.babel.js (ES6)
 * @author Chris Rowles <me@rowles.ch>
 */
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import config from './config/assets';

// automatically load gulp plugins
const plugin = plugins();

gulp.task('images', () => {
    return gulp.src(config.assets.media.images)
        .pipe(plugin.imagemin([
            plugin.imagemin.gifsicle({interlaced: true}),
            plugin.imagemin.jpegtran({progressive: true}),
            plugin.imagemin.optipng({optimizationLevel: 5}),
            plugin.imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(config.out + '/media'))
});

gulp.task('fonts', () => {
    return gulp.src(config.assets.fonts)
        .pipe(gulp.dest(config.out + '/webfonts'))
});

gulp.task('vendor-styles', () => {
    return gulp.src(config.vendor.styles)
        .pipe(plugin.sass({outputStyle: 'compressed'}))
        .pipe(plugin.concat(config.vendor.css))
        .pipe(gulp.dest(config.out + '/css'));
});

gulp.task('app-styles', () => {
    return gulp.src(config.app.styles)
        .pipe(plugin.sass({outputStyle: 'compressed'}))
        .pipe(plugin.concat(config.app.css))
        .pipe(gulp.dest(config.out + '/css'));
});

gulp.task('vendor-scripts', () => {
    return gulp.src(config.vendor.scripts)
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.concat(config.vendor.js))
        .pipe(plugin.sourcemaps.write('./'))
        .pipe(gulp.dest(config.out + '/js'));
});

gulp.task('app-scripts', () => {
    return gulp.src(config.app.scripts)
        .pipe(plugin.rename(config.app.js))
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.uglifyEs.default())
        .pipe(plugin.sourcemaps.write('./'))
        .pipe(gulp.dest(config.out + '/js'));
});

gulp.task('compile', gulp.parallel(
    'images',
    'fonts',
    'vendor-styles',
    'app-styles',
    'vendor-scripts',
    'app-scripts'
));