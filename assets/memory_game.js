import './styles/memory_game.css';

document.addEventListener('DOMContentLoaded', function(){
     
    // items array
    const cardArray = [
        {
            name: 'fries',
            img: "{{asset('build/images/fries.6f78acda.png')}}"
        },
        {
            name: 'fries',
            img: "{{asset('build/images/fries.6f78acda.png')}}"
        },
        {
            name: 'cheeseburger',
            img: "{{asset('build/images/cheeseburger.95556f36.png')}}"
        },
        {
            name: 'cheeseburger',
            img: "{{asset('build/images/cheeseburger.95556f36.png')}}"
        },
        {
            name: 'hotdog',
            img: "{{asset('build/images/hotdog.6c776069.png')}}"
        },
        {
            name: 'hotdog',
            img: "{{asset('build/images/hotdog.6c776069.png')}}"
        },
        {
            name: 'ice-cream',
            img: "{{asset('build/images/ice-cream.5d65077d.png')}}"
        },
        {
            name: 'ice-cream',
            img: "{{asset('build/images/ice-cream.5d65077d.png')}}"
        },
        {
            name: 'pizza',
            img: "{{asset('build/images/pizza.42689dbe.png')}}"
        },
        {
            name: 'pizza',
            img: "{{asset('build/images/pizza.42689dbe.png')}}"
        },
        {
            name: 'milkshake',
            img: "{{asset('build/images/milkshake.ec3c5ba1.png')}}"
        },
        {
            name: 'milkshake',
            img: "{{asset('build/images/milkshake.ec3c5ba1.png')}}"
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
            card.setAttribute('src', "{{asset('build/images/blank.10f6d930.png')}}");
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
            cards[optionOne].setAttribute('src', "{{asset('build/images/white.33a917f1.png')}}");
            cards[optionTwo].setAttribute('src', "{{asset('build/images/white.33a917f1.png')}}");
            cardsWon.push(cardChosen);
        }else if(cardChosen[0] !== cardChosen[1]){
            displayAlert('Sorry wrong pick', 'danger');
            cards[optionOne].setAttribute('src', "{{asset('build/images/blank.10f6d930.png')}}");
            cards[optionTwo].setAttribute('src', "{{asset('build/images/blank.10f6d930.png')}}");
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