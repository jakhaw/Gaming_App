import './styles/memory_game.css';
import blank from './images/blank.png';
import white from './images/white.png';
import fries from './images/fries.png';
import cheeseburger from './images/cheeseburger.png';
import hotdog from './images/hotdog.png';
import icecream from './images/ice-cream.png';
import milkshake from './images/milkshake.png';
import pizza from './images/pizza.png';


document.addEventListener('DOMContentLoaded', function(){
     
    // items array
    const cardArray = [
        {
            name: 'fries',
            img: fries
        },
        {
            name: 'fries',
            img: fries
        },
        {
            name: 'cheeseburger',
            img: cheeseburger
        },
        {
            name: 'cheeseburger',
            img: cheeseburger
        },
        {
            name: 'hotdog',
            img: hotdog
        },
        {
            name: 'hotdog',
            img: hotdog
        },
        {
            name: 'ice-cream',
            img: icecream
        },
        {
            name: 'ice-cream',
            img: icecream
        },
        {
            name: 'pizza',
            img: pizza
        },
        {
            name: 'pizza',
            img: pizza
        },
        {
            name: 'milkshake',
            img: milkshake
        },
        {
            name: 'milkshake',
            img: milkshake
        },
    ];

    //shuffle cardArray
    cardArray.sort(function(){return 0.5 - Math.random()});

    //creating board for cards
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const alert = document.querySelector('.alert');
    const modal = document.querySelector('.modal');
    const btn = document.querySelector('.btn');
    var cardChosenID = [];
    var cardChosen = [];
    var cardsWon = [];

    function createBoard(){
        for(let i = 0; i < cardArray.length; i++){
            var card = document.createElement('img');
            card.setAttribute('src', blank);
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    //check matches
    function checkForMatches(){
        var cards = document.querySelectorAll('img');
        const optionOne = cardChosenID[0];
        const optionTwo = cardChosenID[1];
        if(cardChosen[0] === cardChosen[1]){
            displayAlert('U found this one', 'success');
            cards[optionOne].setAttribute('src', white);
            cards[optionTwo].setAttribute('src', white);
            cardsWon.push(cardChosen);
        }else if(cardChosen[0] !== cardChosen[1]){
            displayAlert('Sorry wrong pick', 'danger');
            cards[optionOne].setAttribute('src', blank);
            cards[optionTwo].setAttribute('src', blank);
        }
        cards.forEach(function(card){
            let item = card.getAttribute('src');
            if(item !== white){
                card.addEventListener('click', flipCard);
            }
        })
        cardChosen = [];
        cardChosenID = [];
        resultDisplay.textContent = cardsWon.length;
        if(cardsWon.length === cardArray.length/2){
            modal.classList.add('modal-visible');
            btn.addEventListener('click', function(){
                location.reload();
                modal.classList.remove('modal-visible');
            })
        }
    }

    //flip cards
    function flipCard(){
        var cardId = this.getAttribute('data-id');
        cardChosen.push(cardArray[cardId].name);
        cardChosenID.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        this.removeEventListener('click', flipCard);
        if(cardChosen.length === 2){
            let items = document.querySelectorAll('img');
            items.forEach(function(e){
                e.removeEventListener('click', flipCard);
            })
            setTimeout(checkForMatches, 500);
        }
    }

    //display alert
    function displayAlert(text, type){
        alert.textContent = text;
        alert.classList.add(`${type}`);
        setTimeout(function(){
            alert.textContent = '';
            alert.classList.remove(`${type}`);
        },500)
    }

    
    createBoard();
})