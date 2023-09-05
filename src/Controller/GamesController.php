<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GamesController extends AbstractController
{
    function __construct(
        private UserRepository $userRepository,
    ){
    }
    #[Route('/snake', name: 'app_snake', methods: 'GET')]
    public function snake(): Response
    {
        return $this->render('snake/index.html.twig');
    }
    #[Route('/connect_four', name: 'app_connect_four', methods: 'GET')]
    public function connect_four(): Response
    {
        return $this->render('connect_four/index.html.twig');
    }

    #[Route('/memory_game', name: 'app_memory_game', methods: 'GET')]
    public function memory_game(): Response
    {
        return $this->render('memory_game/index.html.twig');
    }

    #[Route('/snake/save', methods: 'POST')]
    public function snake_save_score(Request $request): Response
    {
        $user = $this->getUser();
        $this->userRepository->saveScoreSnake($request, $user);
        return new Response($user->getSnake_Score(), Response::HTTP_OK);
    }
    #[Route('/memory_game/save', methods: 'POST')]
    public function memory_game_save_time(Request $request): Response
    {
        $user = $this->getUser();
        $this->userRepository->saveTimeMemoryGame($request, $user);
        return new Response($user->getTime_Memory_Game_Calc(), Response::HTTP_OK);
    }
}
