<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GamesController extends AbstractController
{
    #[Route('/snake', name: 'app_snake')]
    public function snake(): Response
    {
        return $this->render('snake/index.html.twig');
    }

    #[Route('/connect_four', name: 'app_connect_four')]
    public function connect_four(): Response
    {
        return $this->render('connect_four/index.html.twig');
    }

    #[Route('/memory_game', name: 'app_memory_game')]
    public function memory_game(): Response
    {
        return $this->render('memory_game/index.html.twig');
    }
}
