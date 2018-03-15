// JavaScript file

//Variables needed
//Card symbols IE dog, cat, bird 'all start at 0'
let cat = 0;
let dog = 0;
let bird = 0;
let wolf = 0;
let bear = 0;
let parrot = 0;
let tiger = 0;
let rhino = 0;
//Click counter
let click = 0;
//Timer
let timer = 0;
//Game won boolean
let gameWon = false;
//?

//Assign symbols
function assignSymbols {
  //Grab rows for refrence
  firstRow = document.querySelector('.first-row')
  secondRow = document.querySelector('.second-row')
  thirdRow = document.querySelector('.third-row')
  fourthRow = document.querySelector('.fourth-row')
//Select cards one by one
//Randomise symbol out of the 8 possible
//Check counter for symbol chosen
//If === 2
//Reroll symbol
//If ==< 2
//Add count to symbol chosen IE id=dog, dogCounter +=
//Add ID to card div based on symbol
//Repeat 16 times

//Click script
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
