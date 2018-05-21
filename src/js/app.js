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
  const showCards = [];

  // Create a new shuffled deck 
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

/* Setup the event listener for a card. If a card is clicked: 
* then add a class open, show
*/
selectDeck.addEventListener('click', function(e) {
    if (e.target.nodeName === 'LI') { 
        e.target.classList.add('flip', 'open', 'show');
        showCards.push(e.target);
    }
});

// tested into console.log 
console.log("ShowCards:" + showCards);
