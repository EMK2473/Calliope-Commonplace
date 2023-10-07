const quoteData = {}; //catData = "quoteData"
const wordData = {};
const authData = {};
let apiKey = "CqAY/Y5zxlIt8MM1Ia80ng==lzBAvIdejkytitBw";
// let saveButtonEl = document.getElementById("saveButton");
let authSaveBtn = document.getElementById("authSaveBtn");
let quoteSaveBtn = document.getElementById("quoteSaveBtn");
let wordSaveBtn = document.getElementById("wordSaveBtn");
let wordCategoryButton = document.getElementById("wordForm");
let quoteBtn = document.getElementById("quoteCategory");
let submitAuthorButton = document.getElementById("authorForm");








// quote function

quoteBtn.addEventListener("click", function () {
  let categorySelect = document.getElementById("categorySelect");
  let selectedCategory = categorySelect.value;
  let apiUrl =
    `https://cors-anywhere.herokuapp.com/https://api.api-ninjas.com/v1/quotes?category=` + selectedCategory;

  function displayQuoteResult() {
    let quoteResult = document.getElementById("quoteResult");
    quoteResult.innerHTML = `<strong>Quote:</strong> ${quoteData.quoteText}<br><strong>Author:</strong> ${quoteData.author}`;
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
      quoteData.quoteText = quoteText;
      quoteData.author = author;
      displayQuoteResult();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// DOMContentLoaded fires once the HTML doc has been COMPLETELY parsed; does not wait for asnycs.
// "load" is only used to detect a fully loaded-page;

// word definition function



// event listener for author name submission

submitAuthorButton.addEventListener("submit", function (event) {
  event.preventDefault();
  let authorText = document.getElementById("authorText").value;
  let apiUrl = `https://cors-anywhere.herokuapp.com/https://api.api-ninjas.com/v1/historicalfigures?name=${authorText}`;

  // author functions

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
        authData.authorData = authorData.title;
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



quoteSaveBtn.addEventListener("click", function () {
  var data = {
    author: quoteData.author,
    quoteText: quoteData.quoteText,
  };
  localStorage.setItem("quoteData", JSON.stringify(data));
});

authSaveBtn.addEventListener("click", function () {
  var data = {
    author: authData.authorData,
    quoteText: authData.author,
  };
  localStorage.setItem("authData", JSON.stringify(data));
});

wordSaveBtn.addEventListener("click", function () {
  var data = {
    author: wordData.partOfSpeech,
    quoteText: wordData.definition,
  };
  localStorage.setItem("wordData", JSON.stringify(data));
});


