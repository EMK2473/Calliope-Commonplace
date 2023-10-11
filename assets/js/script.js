const quoteObjectData = {};
const wordObjectData = {};
const authorObjectData = {};
let apiKey = "CqAY/Y5zxlIt8MM1Ia80ng==lzBAvIdejkytitBw";
let authorSaveBtn = document.getElementById("authorSaveBtn");
let quoteSaveBtn = document.getElementById("quoteSaveBtn");
let wordSaveBtn = document.getElementById("wordSaveBtn");
let wordCategoryButton = document.getElementById("wordForm");
let quoteBtn = document.getElementById("quoteCategory");
let submitAuthorButton = document.getElementById("authorForm");

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
        let authorData = result[0];
        displayAuthor(authorData);
        authorObjectData.name = authorData.name;
        authorObjectData.title = authorData.title;
      } else {
        authorResult.textContent =
          "Author not found.";
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
    let word = data.word;
    wordObjectData.word = word;
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
      if (data.length > 0) {
        data.forEach((wordObjectData) => {
          displayWord(wordObjectData);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      wordResult.textContent = "Check your spelling.";
    });
});


function renderSavedQuote() {
  var savedQuote = JSON.parse(localStorage.getItem("quoteData"))
  var display = "<strong>Quote:</strong> " + savedQuote.quoteText + " " + "<br><strong>Author:</strong> " + savedQuote.author;

  document.getElementById("quoteSaved").innerHTML = display;
}

function renderSavedAuthor() {
  var savedAuthor = JSON.parse(localStorage.getItem("authorData"));
  var display = "<strong>Name: </strong> " + savedAuthor.author + " " + "<br><strong>Title: </strong> " + savedAuthor.description
  document.getElementById("authorSaved").innerHTML = display;;
}

function renderSavedWord() {
  var savedWord = JSON.parse(localStorage.getItem("wordObjectData"));
  var display = "<strong>Word: </strong> " + savedWord.word + "<br><strong>Part of Speech: </strong> " + savedWord.partOfSpeech + " " + "<br><strong>Definition: </strong> " + savedWord.definition;
  document.getElementById("wordSaved").innerHTML = display;
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


// ToDo[3]:
// Check all submission criteria is complete and organized
