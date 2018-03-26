// JavaScript file


//Card symbols IE dog, cat, bird 'all start at 0'
let symbolsObject = {
  'cactaur' : 0,
  'chocobo' : 0,
  'moogle' : 0,
  'penguin' : 0,
  'plantie' : 0,
  'shark' : 0,
  'turtle' : 0,
  'vivi' : 0
}
//Boolean to stop rapid clicking
let calculatingPair = false;
//Boolean to signify first click and start timer
let firstClick = true;
//Timer variables
let seconds = 00;
let minutes = 00;
//Click counter
let totalClicks = 0;
//Count pairs for winning parameters
let totalPairs = 0;
//Game won boolean
let gameWon = false;
//Clicks this guess (max 2)
let currentClicks = 0;
//Boolen to force timer to reset
let resetTimer = false;
//Create id array for storing the ids of current clicked pair
let id = []
//Call shuffleCards function on document ready
$(function(){
  shuffleCards();
  displayClicks();
});


//New game button
function newGame () {
  //Grab matched cards
  let matchedCards = $('.matched');
  //Just in case, grab current-pair class too (to prevent a bug while clicking when one) -
  //Card is flipped
  let singleFlipped = $('.current-pair');
  //Toggle 'backside' and 'matched' classes
  matchedCards.toggleClass('backside frontside matched');
  //Toggle 'backside' and 'current-pair' classes in case a single card was flipped first
  singleFlipped.toggleClass('backside frontside current-pair');
  //The currentClicks variable is reset to prevent a bug related to a single clicked card
  currentClicks = 0;
  //Run shufflecards script
  shuffleCards();
  //Reset seconds and minutes to 00
  seconds = 0;
  minutes = 0;
  //Set resetTimer to true which stops the timer counting
  resetTimer = true;
  //Draw 00 back to the timer
  document.getElementById('seconds-display').innerHTML = '0' + seconds;
  document.getElementById('minutes-display').innerHTML = '0'+ minutes;
  //Reset total clicks
  totalClicks = 0;
  document.getElementById('display-clicks').innerHTML = '0';
  //If 'gameWon' is true, switch to false
  if(gameWon === true) {
    gameWon = false;
    //Grab win screen
    let winScreen = $('#win-container');
    //Toggle 'win-container-hide'
    winScreen.toggleClass('win-container-hide');
  }
  //Check the firstClick boolean, this is what starts the timer initially.
  if(firstClick === false) {
    firstClick = true;
  }
};

//Display current clicks
function displayClicks() {
  document.getElementById('display-clicks').innerHTML = totalClicks;
  document.getElementById('win-clicks').innerHTML = totalClicks;
};
//Shuffle Symbols
//Each card div is iterated through
function shuffleCards() {
  //Grab container div
  let container = $('#card-container-inner');
  //Grab child of container (these are cards)
  let divs = container.children();
  //Cycle through each card div
  while (divs.length) {
    //Remove all card divs, shuffle and then add back to container div
    container.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
  }
  //Grab all cards
  let cards = $('.card');
  //toggle backside & frontside to show cards
  cards.toggleClass('backside');
  cards.toggleClass('frontside');
  //Toggle again after a short delay to flip back over
  setTimeout (function() {
    cards.toggleClass('frontside');
    cards.toggleClass('backside');
  },500);
};

//Click script
//Works on cards inside their container, but NOT if a card is matched or
//'current-pair' to stop bugs with clicking on already matched pairs or a
//Single flipped card
$('.card-container').on('click','div:not(.matched, .current-pair)',function() {
  //Script for first click, this activates the timer
  if(firstClick === true){
    //Reset firstClick and resetTimer booleans to false
    firstClick = false;
    resetTimer = false;
    //Initalise timer function
    timer();
  }
  //Script for calculating pairs, matches etc.
  if(calculatingPair === false && gameWon === false) {
    let thisCard = $(this);
    //Grab clicked div or 'card' and toggle the 'backside' and 'frontside' classes
    //The backside class hides the image and changes the colors in css
    //This delay on the 'backside' class toggle is for a smoother animation on the flip
    setTimeout(function(){
      thisCard.toggleClass('backside');
    },100)
    setTimeout(function(){
      thisCard.toggleClass('frontside');
    },100)
    $(this).toggleClass('current-pair');
    //Pushes id of current clicked card as a string in the id object
    id.push($(this).attr('id'));
    currentCard = $(this).attr('id');
    //Store class
    let cardClass = $(this).attr('class');
    //Stores number of total clicks on cards to 'click' variable
    totalClicks = totalClicks + 1;
    displayClicks();
    //Stores current clicks in 'currentClicks' variable, once at 2 it will check to see
    //if symbols are matched
    currentClicks = currentClicks + 1;
    //Checks if current clicks are 2 (for a pair), if true checks symbols for each id,
    if(currentClicks === 2){
      //Switch the 'calculatingPair' boolean to true, this is to stop rampant clicking
      calculatingPair = true;
      //Assign the pair variable based on toggled class 'current-pair'
      let pair = $('.current-pair');
      //Access 'symbolsObject' using id name 'id name of card and counters in object are identical',
      //Then increase the item by 1 'they start at 0'
      symbolsObject[id[0]] += 1;
      symbolsObject[id[1]] += 1;
      //If symbols in array 'id' match it will state a pair has been matched
      if(id[0] === id[1]){
        //Add a count of 1 to the 'totalPairs' variable
        totalPairs = totalPairs + 1;
        //Run 'matchedPair' function for animation
        animations.matchedPair();
        //Toggle the 'matched' class which will prevent clicking and keep the front flipped
        pair.toggleClass('matched');
        //Toggle the 'current-pair' class off which can then be used again for next pair
        pair.toggleClass('current-pair');
        //If the totalPairs is now 8 this means all pairs have been matched, the game is won
        if(totalPairs === 8){
          //Execute win game script on line 275
          winGame();
        }
      //If the symbols don't match the else statement will trigger, setting the symbol counters
      //to 0 and toggling off 'current pair' and 'backside' classes.
      }else{
        //Update variable object based on id of card
        symbolsObject[id[0]] = 0;
        symbolsObject[id[1]] = 0;
        //Run the not pair animations
        animations.notPair();
        //Toggle off the 'current-pair' class
        pair.toggleClass('current-pair');
        //After a 1 second delay the cards return to 'backside' using the backside class
        //Then toggle the 'frontside' class for css flip animation
        setTimeout (function() {
          pair.toggleClass('backside');
          pair.toggleClass('frontside');
        }, 1300);
      }
      //After checking for pairs the current clicks will be reset to 0
      currentClicks = 0;
      //Resets the array containing the current pair to empty it. Otherwise the array keeps filling.
      id.length = 0;
      //Reset the 'calculatingPair' boolean to allow clicking again
      setTimeout (function() {
      calculatingPair = false;
      }, 900);
    }
  }
});

//Animations
var animations = {
  notPair: function() {
    //Grab the pair using the temporary 'current-pair' class, this is toggled
    //on and off during the script.
    let cardPair = $('.current-pair');
    //Grab height and width of card (this is to work with different viewports)
    let cardHeight = cardPair.css('height');
    let cardWidth = cardPair.css('width');
    //Set growheight and width based on current height/width of cards
    let growHeight = parseFloat(cardHeight, 10) - 20;
    let growWidth = parseFloat(cardWidth, 10) - 20;
    //Change border color to red temporarily
    cardPair.css('border-color', 'red');
    setTimeout (function(){
      cardPair.css('border-color', 'black');
    }, 1200);
    //Animate the current pair to shrink
    //The timeout is to let the flip animation run, giving a smoother look
    setTimeout (function(){
      cardPair.animate({
        height: growHeight,
        width: growWidth
      }, 300);
      //Then animate to be the original size
      cardPair.animate({
        height: cardHeight,
        width: cardWidth
      }, 300);
      //Reset styles to prevent errors later on
      setTimeout (function(){
        cardPair.removeAttr('style');
      }, 800);
    },500);

  },

  //Matched Pair function is referenced on line 103
  matchedPair: function() {
    //Grab the pair using the temporary 'current-pair' class, this is toggled
    //on and off during the script.
    let cardPair = $('.current-pair');
    //Grab height and width of card (this is to work with different viewports)
    let cardHeight = cardPair.css('height');
    let cardWidth = cardPair.css('width');
    //Set growheight and width based on current height/width of cards
    let growHeight = parseFloat(cardHeight, 10) + 20;
    let growWidth = parseFloat(cardWidth, 10) + 20;
    //Change border color to green temporarily
    cardPair.css('border-color', 'green');
    setTimeout (function(){
      cardPair.css('border-color', 'black');
    }, 1200);
    //Animate the current pair to be slightly bigger
    //The timeout is to let the flip animation run, giving a smoother look
    setTimeout( function(){
      cardPair.animate({
        height: growHeight,
        width: growWidth
      }, 300);
      //Then animate to be the original size
      cardPair.animate({
        height: cardHeight,
        width: cardWidth
      }, 300);
      //Reset styles to prevent errors later on
      setTimeout (function(){
        cardPair.removeAttr('style');
      }, 800);
    },500);
  }
};


//Game Won script
function winGame() {
  //Grab div container of win screen
  setTimeout (function(){
    let winScreen = $('.win-container-hide');
    winScreen.toggleClass('win-container-hide');
    //Set gameWon boolean to true 'this stops timer and is used in other functions'
    gameWon = true;
    //Win time will be a string made using the timer variables
    winTime = '';
    //If the seconds is 0 then the seconds variable becomes a string of two zeros
    if(seconds === 0) {
      seconds = '00';
    }else if (seconds < 10) {
      //If under 10 seconds but not 0 this adds a zero to the front
      seconds = '0' + seconds;
    }
  },500);
};


//Timer button
//On click start counter
//When game is 'won' counter stops
function timer() {
  counter();
  function counter() {
    if(gameWon === true || resetTimer === true){
      return;
    }else {
      //If the seconds counter is less than 9 the script will check for
      //whether it's 10 or 0, this is to add a zero in front for aesthetics
      if(seconds <= 9) {
        seconds = seconds + 1;
        if(seconds === 10) {
          document.getElementById('seconds-display').innerHTML = seconds;
          document.getElementById('win-sec').innerHTML = seconds;
          setTimeout(counter, 1000);
        }else if(seconds === 0 || seconds < 10){
          document.getElementById('seconds-display').innerHTML = '0' + seconds;
          document.getElementById('win-sec').innerHTML = '0' + seconds;
          setTimeout(counter, 1000);
        }else if (seconds > 10){
          document.getElementById('seconds-display').innerHTML = seconds;
          document.getElementById('win-sec').innerHTML = seconds;
          setTimeout(counter, 1000);
        }
      //The code then checks to see if the seconds are at 59, this will increase the
      //minute counter and reset the seconds to 0 if at 59
      }else if(seconds != 59) {
        seconds = seconds + 1;
        document.getElementById('seconds-display').innerHTML = seconds;
        document.getElementById('win-sec').innerHTML = seconds;
        setTimeout(counter, 1000);
      }else if(seconds === 59) {
        seconds = 0;
        document.getElementById('seconds-display').innerHTML = '0' + seconds;
        document.getElementById('win-sec').innerHTML = '0' + seconds;
        minutes = minutes + 1;
        document.getElementById('minutes-display').innerHTML = minutes;
        if(win-min === 1) {
          document.getElementById('win-min').innerHTML = minutes + ' minute and ';
        }else {
          document.getElementById('win-min').innerHTML = minutes + ' minutes and ';
        }
        setTimeout(counter, 1000);
        }
      }
    }
  }
