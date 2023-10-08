const quoteObjectData = {};

const wordData = {};
const authorObjectData = {};
let apiKey = "CqAY/Y5zxlIt8MM1Ia80ng==lzBAvIdejkytitBw";

let authorSaveBtn = document.getElementById("authorSaveBtn");


let quoteSaveBtn = document.getElementById("quoteSaveBtn");
let wordSaveBtn = document.getElementById("wordSaveBtn");
let wordCategoryButton = document.getElementById("wordForm");
let quoteBtn = document.getElementById("quoteCategory");
let submitAuthorButton = document.getElementById("authorForm");



quoteBtn.addEventListener("click", function () 
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
    wordData.partOfSpeech = partOfSpeech;
    wordData.definition = definition;
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
        data.forEach((wordData) => {
          displayWord(wordData);
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
  var savedWord = localStorage.getItem("wordData");
  document.getElementById("wordSaved").textContent = savedWord;
}
function renderSavedQuote() {
  var savedQuote = localStorage.getItem("quoteData");
  document.getElementById("quoteSaved").textContent = savedQuote;
}
function renderSavedAuthor() {
  var savedAuthor = localStorage.getItem("authorData");
  document.getElementById("authorSaved").textContent = savedAuthor;
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
    discription: authorObjectData.title,

  };
  localStorage.setItem("authorData", JSON.stringify(data));
  renderSavedAuthor();
});

wordSaveBtn.addEventListener("click", function () {
  var data = {
    partOfSpeech: wordData.partOfSpeech,
    definition: wordData.definition,
  };
  localStorage.setItem("wordData", JSON.stringify(data));
  renderSavedWord();
});
renderSavedWord();
renderSavedQuote();
renderSavedAuthor();
