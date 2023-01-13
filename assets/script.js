// Bring in HTML elements here
let dietDropdownBtn = $(".dropdown-diet");
let timeToPrepInputEl = $("#time-to-prep");

let cuisineDropdownBtn = $(".dropdown-cuisine");
let prevBtn = $(".previous");
let nextBtn = $(".next");
let searchBtn = $(".submit");
searchBtn.on("click", printUserInputsToConsole);
let intoleranceCheckboxes = document.forms["search-criteria-form"];

let recipeResultsSec = $("#recipe-results-section");
let recipesContainerDiv = $("#recipe-results");
let resultsContainer = $(".results-container");

// function to generate query url
function printUserInputsToConsole(event) {
  event.preventDefault();

  // How do I use intolerance as a parameter in query URL? A comma-separated list of intolerances
  // How do I use cuisine as a parameter in query URL? cuisine=italian
  // How do I use diet as a parameter in query URL? diet=vegan OR where there are two words you can use a space to seperate them e.g. diet=low foodmap
  let queryURL = `https://api.spoonacular.com/recipes/complexSearch?&number=7&type=main&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${APIKey}&diet=low fodmap&intolerances=peanut`;
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

  let userInputQueryURL = `https://api.spoonacular.com/recipes/complexSearch?&number=7&type=main&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${APIKey}&intolerances=${intolerancesString}${specialDietQueryText}${cuisineQueryText}${timeToPrepQueryText}`;
  console.log(intolerancesString);
  console.log(specialDiet);
  console.log(timeToPrep);
  console.log(cuisine);
  console.log(userInputQueryURL);
  displayRecipes(userInputQueryURL);
}

let APIKey = "2f346a836aae470092494ca66fe7f8fa";

// queryURL for searching recipes
let queryURL = `https://api.spoonacular.com/recipes/complexSearch?&number=7&type=main&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${APIKey}&diet=low fodmap&intolerances=peanut`;

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
  recipesContainerDiv.empty();
  let resultsHeading = $("<h2>").text("Try one of these recipes!");
  resultsContainer.append(resultsHeading);
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    for (let i = 0; i < 4; i++) {
      let mealTitle = response.results[i].title;
      let mealID = response.results[i].id;
      let totalResults = response.totalResults;
      console.log(totalResults);
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
        .attr("id", mealID)
        .text("Cooking instructions");

      recipeDiv.append(headerEl, recipeEl, buttonEl);
      recipeEl.append(priceEl, timeEl, caloriesEl);
      recipesContainerDiv.append(recipeDiv);
    }
  });
}




// Code to control opening and closing of modal

// Get the modal div from HTML
var modal = $("#myModal");

// Get the button that opens the modal
var modalBtn = $(".modal-btn");

// Get the <span> element that closes the modal
var span = $(".close")[0];

// When the user clicks the button, open the modal. This function is used
// so appended buttons added by JS to document can be clicked on

$(document).on("click",".modal-btns",openModal);

function openModal (event){
  event.preventDefault();
  console.log("click test 1");
  modal.css('display','block');
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.css('display','none');
}

// When the user clicks anywhere outside of the modal, close it
/* window.onclick = function(event) {
  if (event.target == modal) {
    console.log("click test 2");
    modal.css('display','none');
  }
} */
