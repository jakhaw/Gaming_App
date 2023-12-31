<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: ['username'], message: 'There is already an account with this username')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $username = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(nullable: true)]
    private ?int $snake_score = null;

    #[ORM\Column(nullable: true)]
    private ?int $time_memory_game = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getSnake_Score(): ?int
    {
        return $this->snake_score;
    }

    public function setSnakeScore(?int $snake_score): static
    {
        if($this->snake_score < $snake_score)
        {
            $this->snake_score = $snake_score;
        }

        return $this;
    }

    public function getTime_Memory_Game_Calc(): ?string
    {
        $time = $this->time_memory_game;
        $minutes = floor($time/6000);
        $seconds = floor(($time % 6000) / 100);
        $tens = $time % 6000 % 100;
        $m = $minutes < 10 ? "0".$minutes : $minutes;
        $s = $seconds < 10 ? "0".$seconds : $seconds;
        $t = $tens < 10 ? "0".$tens : $tens;
        $bestTime = $m.":".$s.":".$t;

        return $bestTime;
    }

    public function setTimeMemoryGame(?int $time_memory_game): static
    {
        if($this->time_memory_game > $time_memory_game || $this->time_memory_game === NULL)
        {
            $this->time_memory_game = $time_memory_game;
        }

        return $this;
    }
}
