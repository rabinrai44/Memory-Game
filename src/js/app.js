/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 /**
  * Your Code Start Here 
  */
  // Shuffle card with randomize
  // Selecting query 
  const selectDeck = document.querySelector(".deck");
  let selectCards = document.getElementsByClassName('card');
  const allCardDecks = [...selectCards];

  /* Create showCards for empty 
  * when the card is clicked then will record card as an array
  */
  let openedCards = [];

  /* Create empty MatchCards
  * when the card are matched then will record card as an array
  */
  const openedMatchCard = [];

  // Variables for timer, moves, counter
  let moves = 0;
  let counter = document.querySelector(".moves");
  let timer = document.querySelector('.timer');
  let second = 0;
  let minute = 0;
  let hour = 0;
  let interval;

  // stars variables
  const stars = document.querySelectorAll(".fa-star");

/**
 * resetGame() function allows us to refresh the page 
 * when user click on reset button and game will be reset everything
 */ 
function resetGame() {
    window.location.reload();
}


  /**
   * createNewDecks() function will create new deck with random array
   * and fillter by shuffle() function 
   * passing the value into child elements 
   */
  function createNewDeck() {
      shuffle(allCardDecks);
      // shuffled deck and append
    for (let i = 0; i < allCardDecks.length; i++) {
        let newCardClass = allCardDecks[i];
        selectDeck.appendChild(newCardClass);
    }
  }
// tested into console.log 
  console.log(allCardDecks);

  // Refresh the card when window is reloaded
  window.onload = createNewDeck(); 


  /**
   * checkMatchCards() function will check the matching two cards 
   * and add class in both matched cards 'match', 'disabled'
   * and remove classes 'open', 'show' as well
   */
  function checkMatchCards() {
    openedMatchCard.push(openedCards);
    // cardMoveCounter();
      for (let i = 0; i < openedCards.length; i++) {
        openedCards[i].classList.remove('open', 'show');
        openedCards[i].classList.add('match', 'disabled');
      }
      openedCards.splice(0, 2);
  }


  /** 
   * Check the clicked cards if Don't match and remove the open, show classes 
   * at the same time add the wrong class for a few seconds 
   * and again remove that class as well and finally flip back the card
   */
  function checkIfCardDontMatch() {
      for (let i = 0; i < openedCards.length; i++) {
        openedCards[i].classList.remove('open', 'show');
        openedCards[i].classList.add('wrong');

          setTimeout( ()=> {
              for (let j = 0; j < openedCards.length; j++) {
                  openedCards[j].classList.remove("wrong");
              }
            openedCards.splice(0, 2);
            }, 500);
      }
  }

  /**
   * checkCardmatch() function Check if card are matched 
   * when you click the individual card if not card will be flipback after 1000 ms  
   */
  function checkCardMatch() {
      if (openedCards.length === 2) {
          cardMoveCounter();
          if (openedCards[0].querySelector('i').classList.value === openedCards[1].querySelector('i').classList.value) {
              checkMatchCards();
          }
          else {
              setTimeout(checkIfCardDontMatch, 1000);
          }
      }
  }

/**
 * gameWon() function check if all 8 card are matched
 * this will give the message as you won the game 
 * with details of stars, move counter, timer with the calling modal() function 
 */
  function gameWon() {
      if (openedMatchCard.length === 8) {
          openModal();
          totalMoveAndTime();   
          showRating();
          closeModal();
      }
  }

  /**
   * showRatingOnModal() function will display the rating when the game is over 
   * and popup modal window based on the number of card moves 
   */
  function showRating() {
      let starRate = document.querySelector(".stars").innerHTML;
      // show ratiing
      document.getElementById("rating").innerHTML = starRate;
  }

  /**
   * totalMoveAndTime() function calculates the total time while playing an end of the game
   * it pull the number of card moves 
   */
  function totalMoveAndTime() {
        clearInterval(interval);
        totalTime = timer.innerHTML;
        document.getElementById("total-time").innerHTML = totalTime;
        document.getElementById("total-move").innerHTML = moves;
  }

  // Declared variable for modal open/close
  let modal = document.getElementById('modal');
  let closeIcon = document.querySelector('.close');

  /**
   * openModal() function will hold and display
   * the game details like congrats message, stars, moves, time etc.
   */
  function openModal() {
    modal.classList.add("modal_show");
    console.log("Modal has been opened!");
  }

  /**
   * closeModal() enable to user close opened modal
   * after the game complete
   */ 
  function closeModal() {
      closeIcon.addEventListener("click", function(e) {
          modal.classList.remove("modal_show");
          resetGame();
          console.log("Modal has been closed!");
      });
  }
  
  /**
   * timer() function will start counting the time
   * when user start to click card/start to play game
   */
   function startTimer() {
        interval = setInterval(function() {
            timer.innerHTML = "Time: " + minute + " min " +second + " second";
            second++;
            if (second == 60) {
                minute++;
                second = 0;
            }
            if (minute == 60) {
                hour++;
                minute = 0;
            }
        }, 1000);
   }

/**
 * cardMoveCounter() function will start counting the card move 
 * when user start playing game
 */

function cardMoveCounter() {
    moves++;
    counter.innerHTML = moves;

    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

    // Live rating system based on card moves 
    if (moves > 8 && moves < 12) {
        for (i =0; i <3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13) {
        for (i =0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


/* Setup the event listener for a card. If a card is clicked: 
* then add a class open, show
*/
selectDeck.addEventListener('click', (e) => {
    if (e.target.nodeName === 'LI') { 
        // Check the card is not more than two
        if (openedCards.length === 2){
            //console.log("already two card is clicked!, Please check your card again if match.");
            return;
        }
        e.target.classList.add('flip', 'open', 'show');
        openedCards.push(e.target);
    }

    // startTimer();
    checkCardMatch();
    gameWon();
});

// tested into console.log 
console.log("ShowCards:" + openedCards);
