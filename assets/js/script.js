// i changed all catData to quoteData
const quoteData = {}; 
const wordData = {}; 
const authData = {}; // consider changing to authorData 

// we use quotes, words, and authors
// we should stick those variable names for clarity

// we have authData and authorData which might be making things more complicated
// we should change our variables to be more clear and concise


// such as catSaveBtn to quoteSaveBtn 
// defSaveBtn, to wordSaveBtn
// wordCategoryButton to wordDefinitionBtn
// submitCategoryBtn to submitQuoteBtn
// categorySelect to quoteSelect
// selectedCategory to selectedQuote
// get rid of authData and authorData- make it one or change another to be more clear
// wordData seems fine

let apiKey = "CqAY/Y5zxlIt8MM1Ia80ng==lzBAvIdejkytitBw";
let authSaveBtn = document.getElementById("authSaveBtn");
let catSaveBtn = document.getElementById("catSaveBtn");
let defSaveBtn = document.getElementById("defSaveBtn");
let wordCategoryButton = document.getElementById("wordForm");
let submitCategoryButton = document.getElementById("submitCategory");
let submitAuthorButton = document.getElementById("authorForm");

submitCategoryButton.addEventListener("click", function () {
  let categorySelect = document.getElementById("categorySelect");
  let selectedCategory = categorySelect.value;
  let apiUrl =
    "https://api.api-ninjas.com/v1/quotes?category=" + selectedCategory;

  function displayQuoteAndAuthor() {
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
      displayQuoteAndAuthor();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

submitAuthorButton.addEventListener("submit", function (event) {
  event.preventDefault();
  let authorText = document.getElementById("authorText").value;
  let apiUrl = `https://api.api-ninjas.com/v1/historicalfigures?name=${authorText}`;

  function displayAuthorAndTitle(authorData) {
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
        console.log(result)
        console.log(authorData)
        displayAuthorAndTitle(authorData);
        authData.authorData = authorData.title;
        authData.authorData = authorData.name; // redundant declarations here
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
  function displayDefinitionAndSpeech(wordData) {
    let wordResult = document.getElementById("wordResult");
    wordResult.innerHTML = `
    <strong>Part of Speech:</strong> ${wordData.meanings[0].partOfSpeech}<br>
      <strong>Definition:</strong> ${wordData.meanings[0].definitions[0].definition}<br>
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
          console.log(wordData);
          let partOfSpeech = wordData.meanings[0].partOfSpeech;
          let definition = wordData.meanings[0].definitions[0].definition;
          displayDefinitionAndSpeech(wordData);
          wordData.partOfSpeech = partOfSpeech;
          wordData.definition = definition;
          console.log(wordData);
          console.log(partOfSpeech);
          console.log(definition);
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

catSaveBtn.addEventListener("click", function () {
  var data = {
    author: quoteData.author,
    quoteText: quoteData.quoteText,
  };
  localStorage.setItem("quoteData", JSON.stringify(data));
});

authSaveBtn.addEventListener("click", function () {
  var data = {
    author: authData.authorData,
    quoteText: authData.title,
  };
  localStorage.setItem("authData", JSON.stringify(data));
});

defSaveBtn.addEventListener("click", function () {
  var data = {
    author: wordData.partOfSpeech,
    quoteText: wordData.definition,
  };
  localStorage.setItem("wordData", JSON.stringify(data));
});
