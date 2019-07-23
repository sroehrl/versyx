<?php

/*----------------------------------------
 | Auto-load classes                      |
 ----------------------------------------*/
require __DIR__ . '/../vendor/autoload.php';

/*----------------------------------------
 | Load environment variables             |
 ----------------------------------------*/
$dotenv = Dotenv\Dotenv::create(__DIR__)->load();

/*----------------------------------------
 | Load application dependencies          |
 ----------------------------------------*/
require __DIR__ . '/../config/dependencies.php';

/*----------------------------------------
 | Load application controllers           |
 ----------------------------------------*/
require __DIR__ . '/../config/controllers.php';

/*----------------------------------------
 | Load application routes                |
 ----------------------------------------*/
require __DIR__ . '/../config/routes.php';