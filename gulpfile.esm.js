/**
 * Versyx Digital Ltd 2019
 *
 * gulpfile.esm.js
 * @author Chris Rowles <me@rowles.ch>
 */
import config from './config/assets';
import { src, dest, parallel, series } from 'gulp';
import plugins from 'gulp-load-plugins';

const plugin = plugins();

function images() {
    return src(config.assets.media.images)
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
        .pipe(dest(config.out + '/media'));
}

function fonts() {
    return src(config.assets.fonts)
        .pipe(dest(config.out + '/webfonts'));
}

function styles(cb) {
    src(config.vendor.styles)
        .pipe(plugin.sass({outputStyle: 'compressed'}))
        .pipe(plugin.concat(config.vendor.css))
        .pipe(dest(config.out + '/css'));

    src(config.app.styles)
        .pipe(plugin.sass({outputStyle: 'compressed'}))
        .pipe(plugin.concat(config.app.css))
        .pipe(dest(config.out + '/css'));

    cb();
}

function scripts(cb) {
    
    src(config.vendor.scripts)
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.concat(config.vendor.js))
        .pipe(plugin.sourcemaps.write('./'))
        .pipe(dest(config.out + '/js'));

    src(config.app.scripts)
        .pipe(plugin.rename(config.app.js))
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.uglifyEs.default())
        .pipe(plugin.sourcemaps.write('./'))
        .pipe(dest(config.out + '/js'));

    cb();
}

exports.fonts   = fonts;
exports.images  = images;
exports.styles  = styles;
exports.scripts = scripts;

exports.assets = parallel(fonts, styles, scripts);
exports.build  = series(images, fonts, styles, scripts);