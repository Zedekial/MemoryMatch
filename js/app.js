// JavaScript file

//Variables needed
//Card symbols IE dog, cat, bird 'all start at 0'
let cactaur = 0;
let chocobo = 0;
let moogle = 0;
let penguin = 0;
let plantie = 0;
let shark = 0;
let turtle = 0;
let vivi = 0;
//Click counter
let click = 0;
//Timer
let timer = 0;
//Game won boolean
let gameWon = false;
//Clicks this guess (max 2)
let currentClicks = 0;

//Call shuffleCards function on document ready
$(function(){
  shuffleCards();
});

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
};

//Click script
$('#card-container-inner').on('click','div',function() {
  $(this).toggleClass('backside');
  let id = $(this).attr('id');
  console.log('You clicked a ' + id)
  click = click + 1;
  console.log('Number of clicks so far ' + click);
});

//CSS Change on click IE card highlighted and flipped
//Variable for current selected card
//Variable for second selected card
//Add +1 to click counter
//Check if card IDs match
//If Yes
//Active boolean to keep cards flipped
//Add + 1 to 'pairs variable'
//Check 'pairs variable === 8'
  //If Yes
  //Set game won to yes
  //Set page to 'you won' page
  //If No
  //Do nothing
//If No
//Activate script to flip back over

//New game button
//Hide all rows
//Delete children of all rows
//Run 'Create Cards' script
//Run 'Append Cards' script
//Unhide rows

//Timer button
//On click start counter
//When game is 'won' counter stops
