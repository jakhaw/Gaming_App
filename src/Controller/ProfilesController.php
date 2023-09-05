<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProfilesController extends AbstractController
{
    #[Route('/profile', methods:["GET"], name: 'app_profiles')]
    public function index(): Response
    {
        $user = $this->getUser();

        return $this->render('profiles/index.html.twig', [
            'username' => $user->getUsername(),
            'snake_score' => $user->getSnake_Score(),
            'memory_time' => $user->getTime_Memory_Game_Calc(),
        ]);
    }
}
