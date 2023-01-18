// Constants
// API key for calling spoonacular
const APIKey = "fc139f3d6d994b12a4880e135905a820";
// Number of results to show per page
const pageSize = 4;

// Bring in HTML elements here
let dietDropdownBtn = $(".dropdown-diet");
let timeToPrepInputEl = $("#time-to-prep");

let cuisineDropdownBtn = $(".dropdown-cuisine");

// Pagination elements
let prevBtn = $(".previous");
prevBtn.on("click", previousPage);
prevBtn.hide();
let nextBtn = $(".next");
nextBtn.on("click", nextPage);
nextBtn.hide();
let totalResultsEl = $(".display-results-span");
totalResultsEl.hide();

let searchBtn = $(".submit");
searchBtn.on("click", searchRecipesHandler);
let intoleranceCheckboxes = document.forms["search-criteria-form"];

let recipeResultsSec = $("#recipe-results-section");
let recipesContainerDiv = $("#recipe-results");
let resultsContainer = $(".results-container");

let currentPage = 0;
let totalResults = 0;

let masterchefHomeCooksGiphyID = "3oEjHC7al4GfnudR7y";
// let cookingImgDiv = $(".cooking-image-div").css("display", "flex");

let giphyIDArray = [
  "3oEjHC7al4GfnudR7y",
  "14caftR0LRljqw",
  "B27dmOubvXuEJ4SZOC",
  "BMfotioKIPuXzsAOTC",
  "wiH6vJTVhztio",
  "lKM5hXavdPQ4oCK83q",
  "xT1R9ytEYCBcebkMqA",
  "Kctbxnwj5VK8SnVl2p",
  "jmZGe1lFwchYx7mz4d",
  "gLBMrYhpYrGdG",
  "mei7oUWFvPTiG5rS7o",
  "Fk18SR0a3C8bIS3hiC",
  "3oeSAHYEIfgEkdCmmQ",
  "gHVtUzINxjq4zhD4aP",
  "ItpdDAhEQgjny",
  "14qNb8qJ1ZgKVa",
  "6utVufdWch09PxqXgV",
  "xUPJPhnAzy86MR7WmI",
  "26BkLTOQWzao2Cz6g",
  "3KVQSE46qbEOhq2Jo9",
  "3o85xG3XDsgCLuGC52",
  "oFy0DysfL2nGG0W6Gr",
  "1w37lihlJHnUqN0uQZ",
  "4Y2q0AfB0L839Y4FKk",
  "udsQXjWFrsmWRYMmUQ",
  "M2SV3pKcFCR3HjSxCV",
  "l3V0mIW2jr9m0rI8U",
  "orq25CSNl1F0liVBsq",
  "lrOi2I52gzCrgnDzvm",
  "3o85xHAKCUZiIvRNPq",
  "y4yJaxSPmxgEo",
  "xT1R9yvTdWCFWw1sYg",
  "CeWYtkEQC1cwU",
  "WxvH7iuPzPnE2nlKJ6",
  "UoEjs90HKfhC",
  "0bhpbd32mKR1VOowyN",
  "5n5CPcCgv8dkByKoxN",
  "ZdTH8gnZM9GpqsHTon",
  "Y3jd3RCJUD7YT92YpJ",
  "3ofSBwU8flPjspnOj6",
  "iYP63tTj3Aasw",
];

let randomFoodGiphy = giphyIDArray[Math.floor(Math.random() * 40)];
console.log(randomFoodGiphy);
let giphyImgQueryURL = `https://api.giphy.com/v1/gifs/${randomFoodGiphy}?api_key=NRE09HWQ0OyAMNBuz2iAsSYHuKKJkIV6`;

$.ajax({
  url: giphyImgQueryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  let cookingImgURL = response.data.images.original.url;
  let cookingImgTitle = response.data.images.title;
  console.log(cookingImgURL);
  let cookingImg = $("<img>")
    .attr("src", cookingImgURL)
    .attr("alt", "image of chef cooking food in a pan")
    .attr("title", cookingImgTitle)
    .addClass("cooking-image")
    .css("margin-left", "auto")
    .css("margin-right", "auto")
    .css("padding", "20px");
  resultsContainer.append(cookingImg).css("display", "flex");
});

function searchRecipesHandler(event) {
  event.preventDefault();
  resultsContainer.empty();
  // Reset pagination
  prevBtn.hide();
  nextBtn.hide();
  totalResultsEl.hide();
  currentPage = 0;
  totalResults = 0;

  searchRecipes();
}

// function to generate query url
function searchRecipes() {
  // How do I use intolerance as a parameter in query URL? A comma-separated list of intolerances
  // How do I use cuisine as a parameter in query URL? cuisine=italian
  // How do I use diet as a parameter in query URL? diet=vegan OR where there are two words you can use a space to seperate them e.g. diet=low foodmap
  // let queryURL = `https://api.spoonacular.com/recipes/complexSearch?&number=7&type=main&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${APIKey}&diet=low fodmap&intolerances=peanut`;
  let selectedIntolerances = $("input[name='intolerance']:checked")
    .map(function () {
      return $(this).val();
    })
    .get();
  let intolerancesString = selectedIntolerances.join(",");
  let specialDiet = $("#diet").val().toLowerCase();
  let cuisine = $("#cuisine").val().toLowerCase();
  let timeToPrep = timeToPrepInputEl.val();
  let timeToPrepQueryText = timeToPrep > 0 ? `&timeToPrep=${timeToPrep}` : "";
  let specialDietQueryText = specialDiet ? `&diet=${specialDiet}` : "";
  let cuisineQueryText = cuisine
    ? `&cuisine=${cuisine}`
    : "&cuisine=african,american,british,cajun,caribbean,chinese,eastern european,european,french,german,greek,indian,irish,italian,japanese,jewish,korean,latin american,mediterranean,mexican,middle eastern,nordic,southern,spanish,thai,vietnamese";

  let offset = currentPage * pageSize;

  let userInputQueryURL = `https://api.spoonacular.com/recipes/complexSearch?type=main&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${APIKey}&intolerances=${intolerancesString}${specialDietQueryText}${cuisineQueryText}${timeToPrepQueryText}&number=${pageSize}&offset=${offset}`;
  displayRecipes(userInputQueryURL);
}

//Function to display recipes
function displayRecipes(url) {
  resultsContainer.empty();
  recipesContainerDiv.empty();
  let resultsHeading = $("<h2>")
    .text("Try one of these recipes!")
    .addClass("results-heading")
    .css({
      width: "100%",
      "font-weight": "bold",
      "background-color": "#9A031E",
      color: "#FEE1C7",
      padding: "10px",
    });

  resultsContainer.append(resultsHeading);

  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    for (let i = 0; i < response.results.length; i++) {
      let mealTitle = response.results[i].title;
      let mealID = response.results[i].id;
      let position = currentPage * pageSize + i + 1;

      // total results dictates whether there are more pages to show so only show the next button if there is a next page
      totalResults = response.totalResults;
      console.log(totalResults);
      if (totalResults > currentPage * pageSize) {
        nextBtn.show();
        totalResultsEl.show().text(`${totalResults} results`);
      } else {
        nextBtn.hide();
        totalResultsEl.hide();
      }
      if (currentPage > 0) {
        prevBtn.show();
      } else {
        prevBtn.hide();
      }

      //Need to figure out what unit price is measured in and display accordingly
      let pricePerServing = (
        (response.results[i].pricePerServing / 100) *
        0.82
      ).toFixed(2);
      let readyInMinutes = response.results[i].readyInMinutes;
      let calories = Math.trunc(
        response.results[i].nutrition.nutrients[0].amount
      );
      let mealImgURL = response.results[i].image;
      let recipeURL = response.results[i].sourceUrl;

      //Starting to think about recipe card display
      let recipeCard = $("<div>")
        .addClass("card-body col-lg-3 col-md-3 col-sm-6 text-center")
        .css("margin-bottom", "10px");
      let recipeImg = $("<img>")
        .addClass("card-img-top")
        .attr("src", mealImgURL)
        .attr("src", mealImgURL)
        .attr("alt", "Card image cap");
      let recipeDiv = $("<div>")
        .addClass("card-body")
        // .css("background-image", `url(${mealImgURL})`)

        .css("background-color", "#6B654B")
        .css("min-height", "300px")
        .attr("id", "recipe-div");
      let headerEl = $("<h6>").addClass("card-title").text(mealTitle).css({
        "font-weight": "bold",
        "min-height": "90px",
      });
      // .css("color", "#FF7E33");

      let recipeURLEL = $("<a href>").attr("href", `${recipeURL}`);
      let recipeEl = $("<ul>")
        .css("list-style", "none")
        .addClass("card-text")
        .addClass("recipe-list-items")
        .css("color", "#fee1c7");

      let priceEl = $("<li>").text(`Price per serving: £${pricePerServing}`);
      let timeEl = $("<li>").text(`Time to prepare: ${readyInMinutes} minutes`);
      let caloriesEl = $("<li>").text(`Calories: ${calories} Kcal`);

      // Modal button and properties added here
      let buttonEl = $("<button>")
        .addClass("btn btn-secondary modal-btns")
        // add attribute as an identifier for modal button to use to get recipie info from API
        .attr("url", recipeURL)

        .text("Cooking instructions")
        .css("background-color", "#FF7E33")
        .css("border-color", "#FF7E33")
        .css("margin-bottom", "5px");

      // Favourite button div
      let favouriteDiv = $("<div>").css({
        "margin-bottom": "7px",
        "margin-top": "5px",
      });

      // Favourite button created and added to card here
      let buttonFavourite = $("<button>")
        .addClass("btn btn-danger favourite-btns")
        // add attribute as an identifier for favourite button
        .attr("id", mealID)
        .attr("urlBlog", recipeURL)
        .attr("urlImage", mealImgURL)
        .attr("title", mealTitle)
        .text("Favourite")
        .css("background-color", "#9A031E")
        .css("border-color", "#9A031E");
      // Favourite icon created and added here
      let iOne = $("<i>").addClass("glyphicon far fa-heart");
      let iTwo = $("<i>").addClass("glyphicon fas fa-heart");

      // Function- heart icon red if recipe has already been favourited and saved in local storage
      function checkIcon(mealIDValue) {
        mealIDValueText = `${mealIDValue}`;
        // get from local storage
        var existingEntriesCheck = getFavourites();
        // if in local storage turn heart icon on
        if (existingEntriesCheck.includes(mealIDValueText)) {
          iTwo.css("opacity", "1");
        } else {
          // else leave heart icon off
          iTwo.css("opacity", "0");
        }
      }

      checkIcon(mealID);

      let recipeResultsPositionEl = $("<span>")
        .text(`Showing ${position} of ${totalResults} results`)
        .css("color", "#fee1c7");
      favouriteDiv.append(buttonFavourite, iOne, iTwo);
      recipeDiv.append(
        headerEl,
        recipeEl,
        buttonEl,
        favouriteDiv,
        recipeResultsPositionEl
      );
      recipeEl.append(priceEl, timeEl, caloriesEl);
      recipesContainerDiv.append(recipeCard);
      recipeCard.append(recipeImg, recipeDiv);
    }
  });
}
// Code to control opening and closing of modal

// Get the modal div from HTML
var modal = $("#myModal");

// Get the <span> element that closes the modal
var span = $(".close")[0];

// When the user clicks the cooking button, open the modal. This function is used
// so appended buttons added by JS to document can be clicked on

$(document).on("click", ".modal-btns", openModal);

// Open Modal then
function openModal(event) {
  event.preventDefault();
  modal.css("display", "block");
  iframeWebsite($(this).attr("url"));
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.css("display", "none");
};

// When the user clicks anywhere outside of the modal, close it
/* window.onclick = function(event) {
  if (event.target == modal) {
    console.log("click test 2");
    modal.css('display','none');
  }
} */

// When the user clicks the favourite button, save the card id
// to local storage and fill in the heart icon, or remove if it's
// already there

$(document).on("click", ".favourite-btns", saveToLocalStorage);

// Save to local storage
function saveToLocalStorage(event) {
  event.preventDefault();
  let itemID = $(this).attr("id");
  let itemBlogUrl = $(this).attr("urlBlog");
  let itemImgUrl = $(this).attr("urlImage");
  let itemTitle = $(this).attr("title");

  // parse existing storage key or string representation of empty array (uses || operator, means
  // to take "lis_items" or if that is false take empty array '[]')
  var existingEntries = getFavourites();
  var existingBlogEntries = getBlogFavourites();
  var existingImgEntries = getImgFavourites();
  var existingTitleEntries = getTitleFavourites();

  // Add item if it's not already in the array, then store array again
  if (!existingEntries.includes(itemID)) {
    existingEntries.push(itemID);
    setFavourites(existingEntries);
    existingBlogEntries.push(itemBlogUrl);
    setBlogFavourites(existingBlogEntries);
    existingImgEntries.push(itemImgUrl);
    setImgFavourites(existingImgEntries);
    existingTitleEntries.push(itemTitle);
    setTitleFavourites(existingTitleEntries);

    // Also turn the heart icon on as value is added to local storage
    $(this).siblings(".fas").css("opacity", "1");
  } else {
    // if item is already there remove it, ie. 'unfavourite-ing' it
    let itemIDindex = existingEntries.indexOf(itemID);
    existingEntries.splice(itemIDindex, 1);
    setFavourites(existingEntries);
    existingBlogEntries.splice(itemIDindex, 1);
    setBlogFavourites(existingBlogEntries);
    existingImgEntries.splice(itemIDindex, 1);
    setImgFavourites(existingImgEntries);
    existingTitleEntries.splice(itemIDindex, 1);
    setTitleFavourites(existingTitleEntries);

    // Also turn the heart icon off as value is removed from local storage
    $(this).siblings(".fas").css("opacity", "0");
  }
}

// function to load webpage into iframe in modal window
function iframeWebsite(website) {
  // select iframe SRC attribute as website URL of meal cooking instructions
  $("#iframeEl").attr("src", website);
}

// function to get values from local storage
function getFavourites() {
  return JSON.parse(localStorage.getItem("favourites") || "[]");
}

function getBlogFavourites() {
  return JSON.parse(localStorage.getItem("blogFavourites") || "[]");
}

function getImgFavourites() {
  return JSON.parse(localStorage.getItem("imgFavourites") || "[]");
}

function getTitleFavourites() {
  return JSON.parse(localStorage.getItem("titleFavourites") || "[]");
}

// function to set values from array in local storage
function setFavourites(favArray) {
  localStorage.setItem("favourites", JSON.stringify(favArray));
}

function setBlogFavourites(favBlogArray) {
  localStorage.setItem("blogFavourites", JSON.stringify(favBlogArray));
}

function setImgFavourites(favImgArray) {
  localStorage.setItem("imgFavourites", JSON.stringify(favImgArray));
}

function setTitleFavourites(favTitleArray) {
  localStorage.setItem("titleFavourites", JSON.stringify(favTitleArray));
}

function previousPage(event) {
  event.preventDefault();
  if (currentPage > 0) {
    currentPage--;
    searchRecipes();
  }
}

function nextPage(event) {
  event.preventDefault();
  if (currentPage * pageSize < totalResults) {
    currentPage++;
    searchRecipes();
  }
}
