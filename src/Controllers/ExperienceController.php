<?php

namespace App\Controllers;

/**
 * Experience controller class.
 */
class ExperienceController extends Controller
{
    /**
     * Render the experience page.
     *
     * @param array $data
     *
     * @return mixed
     */
    public function view(array $data = [])
    {
        return $this->render('experience.twig', $data);
    }
}
