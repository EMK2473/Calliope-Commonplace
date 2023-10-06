const catData = {}; //catData = "quoteData"
const wordData = {};
const authData = {};
let apiKey = "CqAY/Y5zxlIt8MM1Ia80ng==lzBAvIdejkytitBw";
// let saveButtonEl = document.getElementById("saveButton");
let authSaveBtn = document.getElementById("authSaveBtn");
let catSaveBtn = document.getElementById("catSaveBtn");
let defSaveBtn = document.getElementById("defSaveBtn");
let submitCategoryButton = document.getElementById("submitCategory");
let submitAuthorButton = document.getElementById("authorForm");



// quote function
submitCategoryButton.addEventListener("click", function () {
  let categorySelect = document.getElementById("categorySelect");
  let selectedCategory = categorySelect.value;
  let apiUrl =
    "https://api.api-ninjas.com/v1/quotes?category=" + selectedCategory;

    function displayQuoteResult() {
      let quoteResult = document.getElementById("quoteResult");
      quoteResult.innerHTML = `<strong>Quote:</strong> ${catData.quoteText}<br><strong>Author:</strong> ${catData.author}`;
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
      catData.quoteText = quoteText;
      catData.author = author;
      displayQuoteResult();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// DOMContentLoaded fires once the HTML doc has been COMPLETELY parsed; does not wait for asnycs.
// "load" is only used to detect a fully loaded-page;

// word definition function

// document.addEventListener("click", function () {
//   let form = document.getElementById("wordForm");
//   let resultDiv = document.getElementById("result");
//   form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     let inputText = document.getElementById("inputText").value;

//     if (inputText.trim() !== "") {
//       fetchDefinition(inputText);
//       wordData.inputText = inputText;
//     } else {
//       resultDiv.textContent = "Please enter a word.";
//     }
//   });
//   function fetchDefinition(word) {
//     console.log("Input word:", word);
//     fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
//       method: "GET",
//       credentials: "same-origin",
//       redirect: "follow",
//     })
//       .then(function (response) {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(function (data) {
//         displayDefinition(data);
//       })
//       .catch(function (error) {
//         console.error("Error fetching definition:", error);
//         resultDiv.textContent = "Check your spelling.";
//       });
//   }

//   function displayDefinition(data) {
//     resultDiv.innerHTML = "";
//     if (Array.isArray(data) && data.length > 0) {
//       data.forEach((definitionData) => {
//         let partOfSpeech = definitionData.meanings[0].partOfSpeech;
//         let definition = definitionData.meanings[0].definitions[0].definition;
//         let definitionElement = document.createElement("div");
//         definitionElement.innerHTML = `<strong>${partOfSpeech}:</strong> ${definition}`;
//         resultDiv.appendChild(definitionElement);
//         wordData.partOfSpeech = partOfSpeech;
//         wordData.definition = definition;
//         console.log("Data Object:", definitionData);
//       });
//     } else {
//       resultDiv.textContent = "Definition not found.";
//     }
//   }
// });



      

// event listener for author name submission
  submitAuthorButton.addEventListener("submit", function (event) {
  event.preventDefault();
  let authorText = document.getElementById("authorText").value;
  let apiUrl = `https://api.api-ninjas.com/v1/historicalfigures?name=${authorText}`;

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


catSaveBtn.addEventListener("click", function(){
  var data = {
    author: catData.author,
    quoteText: catData.quoteText
  };
  localStorage.setItem("catData", JSON.stringify(data));
});

authSaveBtn.addEventListener("click", function(){
  var data = {
    author: authData.authorData,
    quoteText: authData.author
  };
  localStorage.setItem("authData", JSON.stringify(data));
});

defSaveBtn.addEventListener("click", function(){
  var data = {
    author: wordData.partOfSpeech,
    quoteText: wordData.definition
  };
  localStorage.setItem("wordData", JSON.stringify(data));
});





// authSaveBtn.addEventListener("click", function(){
//   localStorage.setItem("globalData", JSON.stringify(globalData.authorData, globalData.author));
// })
// defSaveBtn.addEventListener("click", function(){
//   localStorage.setItem("globalData", JSON.stringify(globalData.partOfSpeech, globalData.definition));
// })