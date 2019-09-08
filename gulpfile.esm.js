/**
 * Versyx Digital Ltd 2019
 *
 * gulpfile.esm.js
 * @author Chris Rowles <me@rowles.ch>
 */
import config from './config/assets';
import { src, dest, series } from 'gulp';
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

function vendorStyles() {
    return src(config.vendor.styles)
        .pipe(plugin.sass({outputStyle: 'compressed'}))
        .pipe(plugin.concat(config.vendor.css))
        .pipe(dest(config.out + '/css'));
}

function vendorScripts() {
    return src(config.vendor.scripts)
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.concat(config.vendor.js))
        .pipe(plugin.sourcemaps.write('./'))
        .pipe(dest(config.out + '/js'));
}

function appStyles() {
    return src(config.app.styles)
        .pipe(plugin.sass({outputStyle: 'compressed'}))
        .pipe(plugin.concat(config.app.css))
        .pipe(dest(config.out + '/css'));
}

function appScripts() {
    return src(config.app.scripts)
        .pipe(plugin.rename(config.app.js))
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.uglifyEs.default())
        .pipe(plugin.sourcemaps.write('./'))
        .pipe(dest(config.out + '/js'));
}

exports.compile = series(images, fonts, vendorStyles, vendorScripts, appStyles, appScripts);