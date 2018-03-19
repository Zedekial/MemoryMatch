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
//Click counter
let totalClicks = 0;
//Timer
let timer = 0;
//Count pairs for winning parameters
let totalPairs = 0;
//Game won boolean
let gameWon = false;
//Clicks this guess (max 2)
let currentClicks = 0;
//Create id array for storing the ids of current clicked pair
let id = []
//Call shuffleCards function on document ready
$(function(){
  shuffleCards();
  displayClicks();
});



//Display current clicks
function displayClicks () {
  document.getElementById('display-clicks').innerHTML = totalClicks;
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
};

//Click script
$('#card-container-inner').on('click','div',function() {
  if(calculatingPair === false && gameWon === false) {
    //Grab clicked div or 'card' and toggle the 'backside' class
    //The backside class hides the image and changes the colors in css
    $(this).toggleClass('backside');
    $(this).toggleClass('current-pair');
    //Pushes id of current clicked card as a string in the id object
    id.push($(this).attr('id'));
    currentCard = $(this).attr('id');
    console.log(id)
    //Store class
    let cardClass = $(this).attr('class');
    console.log('Classes are ' + cardClass);
    console.log('You clicked a ' + currentCard);
    //Stores number of total clicks on cards to 'click' variable
    totalClicks = totalClicks + 1;
    displayClicks();
    //Stores current clicks in 'currentClicks' variable, once at 2 it will check to see
    //if symbols are matched
    currentClicks = currentClicks + 1;
    console.log('Number of clicks so far ' + totalClicks);
    console.log('Current clicks ' + currentClicks);
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
        console.log('You matched a pair, a ' + id[0] + ' and a ' + id[1])
        //Add a count of 1 to the 'totalPairs' variable
        totalPairs = totalPairs + 1;
        //Toggle the 'matched' class which will prevent clicking and keep the front flipped
        pair.toggleClass('matched');
        //Toggle the 'current-pair' class off which can then be used again for next pair
        pair.toggleClass('current-pair');
        //If the totalPairs is now 8 this means all pairs have been matched, the game is won
        if(totalPairs === 8){
          gameWon = true;
          console.log('Game won is ' + gameWon);
        }
      //If the symbols don't match the else statement will trigger setting the symbol counters
      //to 0 and toggling off 'current pair' and 'backside' classes.
      }else{
        //Update variable object based on id of card
        symbolsObject[id[0]] = 0;
        symbolsObject[id[1]] = 0;
        //Toggle off the 'current-pair' class
        pair.toggleClass('current-pair');
        //After a 1 second delay the cards return to 'backside' using the backside class
        setTimeout (function() {
          pair.toggleClass('backside');
        }, 1000);

        console.log(pair);
        console.log('No match ' + id[0] + ' and ' + id[1] + ' have been reset to 0!');
      }
      //After checking for pairs the current clicks will be reset to 0
      currentClicks = 0;
      //Resets the array containing the current pair to empty it. Otherwise the array keeps filling.
      id.length = 0;
      console.log('Current Clicks has been reset to ' + currentClicks);
      //Reset the 'calculatingPair' boolean to allow clicking again
      setTimeout (function() {
      calculatingPair = false;
      }, 1300);
    }
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
//Run 'shuffleCards' script


//Timer button
//On click start counter
//When game is 'won' counter stops
