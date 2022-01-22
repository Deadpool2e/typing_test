// all of our quotes
const quotes = [
  "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
  "Life becomes easier and more beautiful when we can see the good in other people.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "Attitude is a choice. Happiness is a choice. Optimism is a choice. Kindness is a choice. Giving is a choice. Respect is a choice. Whatever choice you make makes you. Choose wisely.",
  "Do what is right, not what is easy nor what is popular.",
  "Happiness is not the absence of problems, it's the ability to deal with them.",
  "The only way of discovering the limits of the possible is to venture a little way past them into the impossible.",
];
// const quotes = [ 'a a a'];
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
let key = 1;
let errorCount;
let accuracy=100;
ourStorage = window.localStorage;
ourStorage.clear();
ourStorage.setItem(0, 0);
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const modalElement = document.getElementById("modal");
const typedValueElement = document.getElementById("typed-value");
const highestscore = document.getElementById("highest");
const success = document.getElementById("success");
const okButton = document.getElementById("okButton");

document.getElementById("start").addEventListener("click", () => {
  // get a quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // Put the quote into an array of words
  words = quote.split(" ");
  // reset the word index for tracking
  wordIndex = 0;
  //reset accuracy
  errorCount =0;
  // UI updates
  // Create an array of span elements so we can set a class
  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });
  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join("");
  // Highlight the first word
  quoteElement.childNodes[0].className = "highlight";
  // Clear any prior messages
  messageElement.innerText = "";

  // Setup the textbox
  typedValueElement.disabled = false;
  // Clear the textbox
  typedValueElement.value = "";
  // set focus
  typedValueElement.focus();
  // set the event handler

  // Start the timer
  startTime = new Date().getTime();
});

typedValueElement.addEventListener("input", () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of sentence
    // enabling modal
    modalElement.style.display = "block";
    // Display success and accuracy
    const elapsedTime = new Date().getTime() - startTime;
    let minutes = elapsedTime / 60000;
    let wpm = Math.ceil((words.length) / minutes);
    accuracy =100- Math.round((errorCount/(words.length)) * 100);
    if(accuracy<0) accuracy =0;
    const message = `CONGRATULATIONS! Your typing speed is ${wpm}wpm and accuracy is ${accuracy}% `;
    messageElement.innerText = message;

    typedValueElement.value = "";
    //disabling the textbox
    typedValueElement.disabled = "true";
    
    // storing the high score
    ourStorage.setItem(key, wpm);
    key++;
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = "";
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = "";
  } else {
    // error state
    typedValueElement.className = "error";
    errorCount++;
  }
});
// Okay button

okButton.onclick = function () {
  modalElement.style.display = "none";
  // displaying the highest score and accuracy
  let highestscorevalue = 0;
  for (let i = 0; i < ourStorage.length; i++) {
    highestscorevalue = Math.max(highestscorevalue, ourStorage.getItem(i));
  }
  highestscore.innerText = `High Score:${highestscorevalue} wpm 
    Accuracy:${accuracy}%`;

};
//for closing if user clicks anywhere on the screen
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
