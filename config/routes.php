<?php

/*----------------------------------------
 | Configure application routes           |
 ----------------------------------------*/
/** @var \App\Controllers\HomeController $home */
$app['router']->respond('GET', '/', function () use ($home) {
    return $home->view(['title' => 'Chris Rowles | Software Developer']);
});

$app['router']->respond('GET', '/experience', function () use ($experience) {
    return $experience->view(['title' => 'Experience | Chris Rowles | Software Developer']);
});

$app['router']->respond('GET', '/xp', function () {
    return header('Location https://raekw0n.keybase.pub');
});
