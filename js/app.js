// JavaScript file

//Variables needed
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
    //Grab clicked div or 'card' and toggle the 'backside' class
    //The backside class hides the image and changes the colors in css
    $(this).toggleClass('backside');
    $(this).toggleClass('current-pair');
    //Stores card ID as an ID variable
    let id = $(this).attr('id');
    //Store class
    let cardClass = $(this).attr('class');
    console.log('Classes are ' + cardClass);
    //Access 'symbolsObject' using id name 'id name of card and items in object are identicle',
    //Then increase the item by 1 'they start at 0'
    symbolsObject[id] += 1;
    console.log('You clicked a ' + id + ', counter is ' + symbolsObject[id]);
    //Stores number of total clicks on cards to 'click' variable
    click = click + 1;
    //Stores current clicks in 'currentClicks' variable, once at 2 it will check to see
    //if symbols are matched
    currentClicks = currentClicks + 1;
    console.log('Number of clicks so far ' + click);
    console.log('Current clicks ' + currentClicks);
    //Checks if current clicks are 2 (for a pair), if true checks symbols for each id,
    if(currentClicks === 2){
      let pair = $('.current-pair');
      //If at 2 it will state a pair has been matched
      if(symbolsObject[id] === 2){
        console.log('You matched a pair of ' + id + "'s")
        //Toggle the 'matched' class which will prevent clicking and keep the front flipped
        pair.toggleClass('matched')
        //Toggle the 'current-pair' class off which can then be used again for next pair
        pair.toggleClass('current-pair')
        //If not at 2 it will state no match and reset the id's to 0
      }else{
        //Update variable object based on id of card
        let symbolA = pair[0];
        console.log(symbolA);
        let symbolB = pair[1];
        console.log(symbolB);
        console.log('No match ' + id + ' has been reset to 0!');
      }
      //After checking for pairs the current clicks will be reset to 0
      currentClicks = 0;
      console.log('Current Clicks has been reset to ' + currentClicks)
    }
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
