<?php

/*----------------------------------------
 | Configure application routes           |
 ----------------------------------------*/
/** @var \App\Controllers\HomeController $home */
$app['router']->respond('GET', '/', function () use ($home) {
    return $home->view(['title' => 'Chris Rowles | Software Developer']);
});
