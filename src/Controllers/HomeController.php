<?php

namespace App\Controllers;

/**
 * Home controller class.
 */
class HomeController extends Controller
{
    /**
     * Render the home page.
     *
     * @param array $data
     *
     * @return mixed
     */
    public function view(array $data = [])
    {
        return $this->render('home.twig', $data);
    }
}
