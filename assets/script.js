// Constants
// API key for calling spoonacular
const APIKey = "2f346a836aae470092494ca66fe7f8fa";
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

let searchBtn = $(".submit");
searchBtn.on("click", searchRecipesHandler);
let intoleranceCheckboxes = document.forms["search-criteria-form"];

let recipeResultsSec = $("#recipe-results-section");
let recipesContainerDiv = $("#recipe-results");
let resultsContainer = $(".results-container");

let currentPage = 0;
let totalResults = 0;

function searchRecipesHandler(event) {
  event.preventDefault();

  // Reset pagination
  prevBtn.hide();
  nextBtn.hide();
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
  console.log(intolerancesString);
  console.log(specialDiet);
  console.log(timeToPrep);
  console.log(cuisine);
  console.log(userInputQueryURL);
  displayRecipes(userInputQueryURL);
}

// queryURL for searching recipes
// let queryURL = `https://api.spoonacular.com/recipes/complexSearch?&number=7&type=main&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${APIKey}&diet=low fodmap&intolerances=peanut`;

// Checking results for diet and intolerances by hardcoding URL
// let queryURL = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${APIKey}&diet=pescetarian&intolerances=egg&maxReadyTime=25`;

//This query url includes the following variables we can search by:
// includeIngredients - A comma-separated list of ingredients that should/must be used in the recipes.
//cuisine - type of cuisine e.g. Greek, Thai, Italian, French, full list here: https://spoonacular.com/food-api/docs#Cuisines
//intolerances - foods to exclude e.g. dairy, peanut, gluten, full list here: https://spoonacular.com/food-api/docs#Intolerances
//diet - e.g vegan, vegetarian, full list here: https://spoonacular.com/food-api/docs#Diets
//addRecipeInformation - set to true to get more recipe information.  This gives us the link to the recipe that we will follow.  This also gives us the price per serving information.
//addRecipeNutrition - set to true to get more nutrition information e.g. calories per portion.

// Build function to develop queryurl based on user inputs - hardcoded values for now but will replace with userinput.val().trim();
// User input values
// let mainIng
// let maxReadyTimeInput = 20;
// let cuisine = italian;
// let diet = vegan;
// let price =

//Function to display recipes
function displayRecipes(url) {
  resultsContainer.empty();
  recipesContainerDiv.empty();
  let resultsHeading = $("<h2>").text("Try one of these recipes!");
  resultsContainer.append(resultsHeading);

  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    for (let i = 0; i < response.results.length; i++) {
      let mealTitle = response.results[i].title;
      let mealID = response.results[i].id;

      // total results dictates whether there are more pages to show so only show the next button if there is a next page
      totalResults = response.totalResults;
      console.log(totalResults);
      if (totalResults > currentPage * pageSize) {
        nextBtn.show();
      } else {
        nextBtn.hide();
      }
      if (currentPage > 0) {
        prevBtn.show();
      } else {
        prevBtn.hide();
      }

      //Need to figure out what unit price is measured in and display accordingly
      let pricePerServing = response.results[i].pricePerServing;
      let readyInMinutes = response.results[i].readyInMinutes;
      let calories = Math.trunc(
        response.results[i].nutrition.nutrients[0].amount
      );
      let mealImgURL = response.results[i].image;
      let recipeURL = response.results[i].sourceUrl;
      console.log(`pricePerServing: ${pricePerServing}`);
      console.log(`readyInMinutes: ${readyInMinutes}`);
      console.log(`calories: ${calories}`);
      console.log(`mealImgURL: ${mealImgURL}`);
      console.log(`mealID: ${mealID}`);
      console.log(`recipeURL: ${recipeURL}`);

      //Starting to think about recipe card display
      let recipeDiv = $("<div>")
        .addClass("card-body col-lg-3 col-md-3 col-sm-6 text-center")
        // .css("background-color", "rgb(107,101,75)");
        .css("background-image", `url(${mealImgURL})`)
        .css("padding", "0");
      //recipeDiv.attr("id", "recipe-div");
      let headerEl = $("<h5>")
        .addClass("card-title")
        .text(mealTitle)
        .css("font-weight", "bold");

      let recipeImg = $("<img>").attr("src", mealImgURL);

      let recipeURLEL = $("<a href>").attr("href", `${recipeURL}`);
      let recipeEl = $("<ul>")
        .css("list-style", "none")

        .addClass("card-text")
        .addClass("recipe-list-items");

      let priceEl = $("<li>").text(`Price per serving: ${pricePerServing}`);
      let timeEl = $("<li>").text(`Minutes to prepare meal: ${readyInMinutes}`);
      let caloriesEl = $("<li>").text(`Calories: ${calories}`);

      // Modal button and properties added here
      let buttonEl = $("<button>")
        .addClass("btn btn-secondary modal-btns")
        // add attribute as an identifier for modal button to use to get recipie info from API
        .attr("url", recipeURL)
        .text("Cooking instructions");

      // Favourite button div
      let favouriteDiv = $("<div>");

      // Favourite button created and added to card here
      let buttonFavourite = $("<button>")
        .addClass("btn btn-danger favourite-btns")
        // add attribute as an identifier for favourite button
        .attr("id", mealID)
        .attr("urlBlog", recipeURL)
        .attr("urlImage", mealImgURL)
        .text("Favourite");
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

      favouriteDiv.append(buttonFavourite, iOne, iTwo);
      recipeDiv.append(headerEl, recipeEl, buttonEl, favouriteDiv);
      recipeEl.append(priceEl, timeEl, caloriesEl);
      recipesContainerDiv.append(recipeDiv);
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

  // parse existing storage key or string representation of empty array (uses || operator, means
  // to take "lis_items" or if that is false take empty array '[]')
  var existingEntries = getFavourites();
  var existingBlogEntries = getBlogFavourites();
  var existingImgEntries = getImgFavourites();

  // Add item if it's not already in the array, then store array again
  if (!existingEntries.includes(itemID)) {
    existingEntries.push(itemID);
    setFavourites(existingEntries);
    existingBlogEntries.push(itemBlogUrl);
    setBlogFavourites(existingBlogEntries);
    existingImgEntries.push(itemImgUrl);
    setImgFavourites(existingImgEntries);


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
