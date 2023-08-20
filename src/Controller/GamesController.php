<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GamesController extends AbstractController
{
    #[Route('/snake', name: 'app_snake')]
    public function snake(): Response
    {
        return $this->render('snake/index.html.twig');
    }

    #[Route('/snake/ajax', methods: 'POST')]
    public function snake_save_score(Request $request, Security $security, EntityManagerInterface $entityManager): Response
    {
        $score = $request->get('score');
        $user = $security->getUser();

        if($user->getSnake_Score() < $score){
            $user->setSnakeScore($score);

            $entityManager->persist($user);
            $entityManager->flush();  
        }

        return new Response($user->getSnake_Score(), Response::HTTP_OK);
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

    #[Route('/memory_game/ajax', methods: 'POST')]
    public function memory_game_save_time(Request $request, Security $security, EntityManagerInterface $entityManager): Response
    {
        $time = $request->get('time');
        $user = $security->getUser();

        if($user->getTime_Memory_Game() > $time){
            $user->setTimeMemoryGame($time);

            $entityManager->persist($user);
            $entityManager->flush();  
        }

        return new Response($user->getTime_Memory_Game(), Response::HTTP_OK);
    }
}
