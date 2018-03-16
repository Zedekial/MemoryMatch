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
//?

//Shuffle Symbols
function assignSymbols() {
  //Grab rows for refrence
  row = document.querySelector('.row')
}

//Each card div is iterated through
$('.card').each(function(pos, obj){
  //Remove from container
  //Store divs
  //Shuffle all sixteen divs
  //Add divs back to container in groups of four
});

//Click script
$('.row').on('click','div',function() {
  $(this).toggleClass('backside');
  let id = $(this).attr('id');
  console.log(id)
  click = click + 1;
  console.log(click);
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
