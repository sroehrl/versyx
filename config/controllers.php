<?php

/*----------------------------------------
 | Register application controllers       |
 ----------------------------------------*/
$controllers = [
    'home' => new \App\Controllers\HomeController($app),
];

return extract($controllers);
