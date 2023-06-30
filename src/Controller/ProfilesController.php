<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProfilesController extends AbstractController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    #[Route('/profile/{id}', methods:["GET"], name: 'app_profiles')]
    public function index($id): Response
    {
        return $this->render('profiles/index.html.twig', [
            'userInfo' => $this->userRepository->find($id),
        ]);
    }
}
