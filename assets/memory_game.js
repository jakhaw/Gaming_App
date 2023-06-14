import './styles/memory_game.css';

document.addEventListener('DOMContentLoaded', function(){
     
    // items array
    const cardArray = [
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
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
            card.setAttribute('src', 'images/blank.png');
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
            cards[optionOne].setAttribute('src', 'images/white.png');
            cards[optionTwo].setAttribute('src', 'images/white.png');
            cardsWon.push(cardChosen);
        }else if(cardChosen[0] !== cardChosen[1]){
            displayAlert('Sorry wrong pick', 'danger');
            cards[optionOne].setAttribute('src', 'images/blank.png');
            cards[optionTwo].setAttribute('src', 'images/blank.png');
        }
        cards.forEach(function(card){
            let item = card.getAttribute('src');
            if(item !== 'images/white.png'){
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