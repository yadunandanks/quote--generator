const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

const loader = document.getElementById("loader");

let apiQuotes = [];

// get quotes from Api

//show loading function

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// get quotes from global server.

function newQuote() {
  // pick a random from apiquotes
  loading();

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //
  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //check quote length to determine styleing

  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.add("long-quote");
  }

  //set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

// get quote

async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);

    apiQuotes = await response.json();

    newQuote();
  } catch (error) {
    alert("error while loading");
  }
}

// tweet quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, "_blank");
}

//even listeners

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load

getQuotes();

// newQuote();
