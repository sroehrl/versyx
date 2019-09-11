[![StyleCI](https://github.styleci.io/repos/198523139/shield?branch=master)](https://github.styleci.io/repos/198523139)

# versyx
The framework behind [Versyx Digital](https://www.versyx.co.uk)

## Table of contents

* [Installation](#installation)
* [Application Structure](#application-structure)
* [Documentation](#documentation)
  * [Services](#services)
  * [Controllers](#controllers)
  * [Views](#views)
  * [Routing](#routing)
* [Frontend](#frontend)

# Installation

To install, simply run:

```bash
composer create-project raekw0n/versyx your-app
cd your-app
```

Then, copy `.env.example` to `.env` and set your environment variables:
```bash
cp config/.env.example config/.env
```

Then, install the front-end dependencies:

```bash
yarn
```

And finally, compile the raw assets:

```bash
gulp compile
```

# Application Structure
```
.
├── config                  # Configuration files
│   ├── .env                # Environment variables
│   ├── assets.json         # Front-end assets to compile
│   ├── bootstrap.php       # Application bootstrapper
│   ├── controllers.php     # Place to register application controllers
│   ├── dependencies.php    # Place to register application dependencies
│   └── routes.php          # Place to register application routes
├── node_modules            # Reserved for Yarn
├── public                  # Entry, web and cache files
├── resources               # Application resources
│   ├── assets              # Raw, un-compiled assets such as media, SASS and JavaScript
│   ├── views               # View templates (twig)
├── src                     # PHP source code (The App namespace)
│   ├── Api                 # API classes
│   ├── Controller          # Application controllers
│   ├── Helpers             # Application helpers
├── tests                   # Tests
├── vendor                  # Reserved for Composer
├── .babelrc                # Babel configuration
├── composer.json           # Composer dependencies
├── gulpfile.babel.js       # Gulp configuration
├── LICENSE                 # The license
├── package.json            # Yarn dependencies
└── README.md               # This file
```

# Documentation

## Services

Versyx uses [Pimple](https://pimple.symfony.com/) to define application services. Services are registered in `config/dependencies.php`, for example, to register a logger instance:

```php
$app = new Container();
...
$app['log'] = function () {
    $log = new Logger('app');
    $log->pushHandler(
        new StreamHandler(__DIR__ . '/../logs/app.log', Logger::DEBUG)
    );
    return $log;
};
```

## Controllers

Application controllers are registered in `config/controllers.php`, as you can see, the `$app` application container itself is passed to the registered instance, this is so that we can use the application container to resolve any sub-dependencies of our controllers.

```php
$controllers = [
    'home' => new \App\Controllers\HomeController($app),
];

return extract($controllers);
```

Controllers must extend from the the abstract `Controller` class, which retrieves required sub-dependencies and provides the following methods:

```
- viewData(array $data)                  - Adds data to pass to the view.
- render(string $template, array $data)  - Renders a template with view data.
```

For example, to render the homepage:

```php
<?php

namespace App\Controllers;

class HomeController extends Controller
{
    public function view(array $data = [])
    {
        $viewData = $this->viewData($data);
        return $this->render('home.twig', $viewData);
    }
}
```

## Views

Versyx uses [Twig](https://twig.symfony.com/) to handle templating. Views typically extend from `resources/views/layout.twig`.

## Routing

Versyx uses [Klein](https://github.com/klein/klein.php) to handle application routing. Routes are registered in `config\routes.php`, to register a route, define the
route method and name followed by a closure that uses the required controller defined in `config/controllers.php`, for example, to define a route to view the home page:

```php
/** @var \App\Controllers\HomeController $home*/
$app['router']->respond('GET', '/', function () use ($home) {
    return $home->view(['title' => 'Home']);
});
```

# Frontend

Versyx uses [Yarn](https://www.yarnpkg.com) to manage front-end dependencies such as Bootstrap and [gulp](https://gulpjs.com/) to build and minify raw assets such as SCSS, JS and other media.
The existing tasks in `gulpfile.esm.js` shouldn't need to be touched, as all paths to assets are configured via `config/assets.json`:

```json
{
    "vendor": {
        "styles": [
            "resources/assets/scss/fonts.scss",
            "node_modules/bootstrap/scss/bootstrap.scss"
        ],
        "css": "bundle.min.css",
        "scripts": [
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/bootstrap/dist/js/bootstrap.min.js"
        ],
        "js": "bundle.min.js"
    },
    "app": {
        "styles": [
            "resources/assets/scss/app.scss"
        ],
        "css": "app.min.css",
        "scripts": [
            "resources/assets/js/app.js"
        ],
        "js": "app.min.js"
    },
    "assets": {
        "media": {
            "images": [
                "resources/media/**/*.jpg",
                "resources/media/**/*.png"
            ]
        },
        "fonts": [
            "node_modules/@fortawesome/fontawesome-free/webfonts/*"
        ]
    },
    "out": "./public"
}
```

Example gulp tasks:

```js
import config from './config/assets';
...
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
...
exports.fonts   = fonts;
exports.images  = images;
exports.styles  = styles;
exports.scripts = scripts;

exports.assets = parallel(fonts, styles, scripts);
exports.build  = series(images, fonts, styles, scripts);
```

To install and compile assets, run:

```bash
yarn && gulp compile
```

# License

versyx is open source software licensed under the [MIT license](LICENSE).
