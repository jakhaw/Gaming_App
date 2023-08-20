<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProfilesController extends AbstractController
{
    #[Route('/profile', methods:["GET"], name: 'app_profiles')]
    public function index(Security $security): Response
    {
        $user = $security->getUser();

        $time = $user->getTime_Memory_Game();
        $minutes = floor($time/6000);
        $seconds = floor(($time % 6000) / 100);
        $tens = $time % 6000 % 100;
        $m = $minutes < 10 ? "0".$minutes : $minutes;
        $s = $seconds < 10 ? "0".$seconds : $seconds;
        $t = $tens < 10 ? "0".$tens : $tens;
        $bestTime = $m.":".$s.":".$t;

        return $this->render('profiles/index.html.twig', [
            'username' => $user->getUsername(),
            'snake_score' => $user->getSnake_Score(),
            'memory_time' => $bestTime,
        ]);
    }
}
