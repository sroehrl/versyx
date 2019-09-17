<?php

/*----------------------------------------
 | Register application controllers       |
 ----------------------------------------*/
$controllers = [
    'home' => new \App\Controllers\HomeController($app),
    'experience' => new \App\Controllers\ExperienceController($app),
];

return extract($controllers);
