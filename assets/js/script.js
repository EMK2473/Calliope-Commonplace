const quoteObjectData = {};
const wordObjectData = {};
const authorObjectData = {};
console.log(wordObjectData)
let apiKey = "CqAY/Y5zxlIt8MM1Ia80ng==lzBAvIdejkytitBw";
let authorSaveBtn = document.getElementById("authorSaveBtn");
let quoteSaveBtn = document.getElementById("quoteSaveBtn");
let wordSaveBtn = document.getElementById("wordSaveBtn");
let wordCategoryButton = document.getElementById("wordForm");
let quoteBtn = document.getElementById("quoteCategory");
let submitAuthorButton = document.getElementById("authorForm");

// ToDo[0]:
// Confirm Monday Night Group Session, and/or Tuesday Night Group Session

// ToDo[1]:
// change event listeners: submit to click, or vice versa 
// add prevent default
// check displayWord conditional considering forEach array method

// ToDo[2]:
// consider putting render functions inside each event listener/ displayQuote functions
// if localStorage = null, then render
// else render upon save button

// ToDo[3]:
// resolve tailwind install issue
// decide on creating render container in JavaScript or HTML
// If JavaScript, then createElement, append, appendChild methods
// If !JavaScript, then create render container element in HTML

// ToDo[4]:
// consider adding wordObjectData? Is it needed?

// ToDo[5]: 
// Test for MVP

// ToDo[6]:
// Prepare for presentation
// Check all submission criteria is complete and organized



quoteBtn.addEventListener("click", function () {
  let categorySelect = document.getElementById("categorySelect");
  let selectedCategory = categorySelect.value;
  let apiUrl =
    "https://cors-anywhere.herokuapp.com/https://api.api-ninjas.com/v1/quotes?category=" +
    selectedCategory;

  function displayQuoteResult() {
    let quoteResult = document.getElementById("quoteResult");
    quoteResult.innerHTML = `<strong>Quote:</strong> ${quoteObjectData.quoteText}<br><strong>Author:</strong> ${quoteObjectData.author}`;
  }

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then((result) => {
      let quoteText = result[0].quote;
      let author = result[0].author;
      quoteObjectData.quoteText = quoteText;
      quoteObjectData.author = author;
      displayQuoteResult();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

submitAuthorButton.addEventListener("submit", function (event) {
  event.preventDefault();
  let authorText = document.getElementById("authorText").value;
  let apiUrl = `https://cors-anywhere.herokuapp.com/https://api.api-ninjas.com/v1/historicalfigures?name=${authorText}`;


  function displayAuthor(authorData) {
    let authorResult = document.getElementById("authorResult");
    authorResult.innerHTML = `
      <strong>Name:</strong> ${authorData.name}<br>
      <strong>Title:</strong> ${authorData.title}<br>
    `;
  }

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then((result) => {
      if (result.length > 0) {
        console.log(result[0]);
        let authorData = result[0];
        displayAuthor(authorData);
        authorObjectData.name = authorData.name;
        authorObjectData.title = authorData.title;
      } else {
        console.log("Author not found");
        authorResult.textContent =
          "Author not found. Double check your spelling.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

wordCategoryButton.addEventListener("submit", function (event) {
  event.preventDefault();
  let wordText = document.getElementById("wordText").value;
  let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordText}`;
  function displayWord(data) {
    let partOfSpeech = data.meanings[0].partOfSpeech;
    let definition = data.meanings[0].definitions[0].definition;
    let word = data.word
    
    wordObjectData.word = word
    wordObjectData.partOfSpeech = partOfSpeech;
    wordObjectData.definition = definition;
    let wordResult = document.getElementById("wordResult");
    wordResult.innerHTML = `
      <strong>Part of Speech:</strong> ${partOfSpeech}<br>
      <strong>Definition:</strong> ${definition}<br>
    `;
  }
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((wordObjectData) => {
          displayWord(wordObjectData);
        });
      } else {
        console.log("Word not found");
        wordResult.textContent = "Check your spelling.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function renderSavedWord() {
  var savedWord = JSON.parse(localStorage.getItem("wordObjectData"));
  console.log(savedWord)
  var display = "<strong>Word: </strong> " + savedWord.word + "<br><strong>Part of Speech: </strong> " + savedWord.partOfSpeech + " " + "<br><strong>Definition: </strong> " + savedWord.definition
  document.getElementById("wordSaved").innerHTML = display;
}

function renderSavedQuote() {
  var savedQuote = JSON.parse(localStorage.getItem("quoteData"))
  var display = "<strong>Quote:</strong> " + savedQuote.quoteText + " " + "<br><strong>Author:</strong> " + savedQuote.author

  document.getElementById("quoteSaved").innerHTML = display;
}

function renderSavedAuthor() {
  var savedAuthor = JSON.parse(localStorage.getItem("authorData"));
  var display = "<strong>Name: </strong> " + savedAuthor.author + " " + "<br><strong>Title: </strong> " + savedAuthor.description
  document.getElementById("authorSaved").innerHTML = display;
}

quoteSaveBtn.addEventListener("click", function () {
  var data = {
    author: quoteObjectData.author,
    quoteText: quoteObjectData.quoteText,
  };
  localStorage.setItem("quoteData", JSON.stringify(data));
  renderSavedQuote();
});

authorSaveBtn.addEventListener("click", function () {
  var data = {
    author: authorObjectData.name,
    description: authorObjectData.title,

  };
  localStorage.setItem("authorData", JSON.stringify(data));
  renderSavedAuthor();
});

wordSaveBtn.addEventListener("click", function () {
  var data = {
    partOfSpeech: wordObjectData.partOfSpeech,
    definition: wordObjectData.definition,
    word: wordObjectData.word
  };
  localStorage.setItem("wordObjectData", JSON.stringify(data));
  renderSavedWord();
});

renderSavedWord();
renderSavedQuote();
renderSavedAuthor();
