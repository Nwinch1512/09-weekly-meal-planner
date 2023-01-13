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

//Intolerances
// let noIntolerancesCheckbox = $(".no-intolerances");
// let dairyIntoleranceCheckbox = $(".dairy");
// let eggIntoleranceCheckbox = $(".egg");
// let glutenIntoleranceCheckbox = $(".gluten");
// let grainIntoleranceCheckbox = $(".grain");
// let seafoodIntoleranceCheckbox = $(".seafood");
// let shellfishIntoleranceCheckbox = $(".shellfish");
// let soyIntoleranceCheckbox = $(".soy");
// let sulfiteIntoleranceCheckbox = $(".sulfite");
// let treenutIntoleranceCheckbox = $(".treenut");
// let wheatIntoleranceCheckbox = $(".wheat");

// function to generate query url
function printUserInputsToConsole(event) {
  event.preventDefault();
  // How do I use intolerance as a parameter in query URL? A comma-separated list of intolerances
  // How do I get the values from checkboxes
  // let noIntolerance = noIntolerancesCheckbox.val();
  // let dairyIntolerance = dairyIntoleranceCheckbox.val();
  // let eggIntolerance = eggIntoleranceCheckbox.val();
  // let glutenIntolerance = glutenIntoleranceCheckbox.val();

  //let allIntolerances = $("input[name='intolerance']:checked");
  let selectedIntolerances = $("input[name='intolerance']:checked")
    .map(function () {
      return $(this).val();
    })
    .get();

  // let diet = dietDropdownBtn.val();
  // let cuisine = cuisineDropdownBtn.val();
  let timeToPrep = timeToPrepInputEl.val();
  let intolerancesString = selectedIntolerances.join(",");
  console.log(`${intolerancesString}`);

  console.log(timeToPrep);
}

let APIKey = "2f346a836aae470092494ca66fe7f8fa";

// queryURL for searching recipes
let queryURL = `https://api.spoonacular.com/recipes/complexSearch?&number=7&type=main&addRecipeInformation=true&addRecipeNutrition=true&apiKey=${APIKey}&intolerances=peanut`;

// Checking results for diet and intolerances by hardcoding URL
// let queryURL = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${APIKey}&diet=pescetarian&intolerances=egg`;

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

//Example query
// function displayRecipeCard(cuisine) {
recipeResultsSec.empty();
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  let mealTitle = response.results[0].title;
  let mealID = response.results[0].id;
  //Need to figure out what unit price is measured in and display accordingly
  let pricePerServing = response.results[0].pricePerServing;
  let readyInMinutes = response.results[0].readyInMinutes;
  let calories = Math.trunc(response.results[0].nutrition.nutrients[0].amount);
  let mealImgURL = response.results[0].image;
  let recipeURL = response.results[0].sourceUrl;
  console.log(`pricePerServing: ${pricePerServing}`);
  console.log(`readyInMinutes: ${readyInMinutes}`);
  console.log(`calories: ${calories}`);
  console.log(`mealImgURL: ${mealImgURL}`);
  console.log(`mealID: ${mealID}`);
  console.log(`recipeURL: ${recipeURL}`);

  //Starting to think about recipe card display
  let recipeDiv = $("<div>");
  recipeDiv.attr("id", "recipe-div");
  let headerEl = $("<h2>");
  let recipeImg = $("<img>");
  let recipeEl = $("<ul>");
  let priceEl = $("<li>");
  let timeEl = $("<li>");
  let caloriesEl = $("<li>");
  recipeEl.addClass("recipe-list-items");
  recipeImg.attr("src", imageURL);
  headerEl.text(mealTitle).css("font-weight", "bold");
  recipeResultsSec.append(recipeResultsDiv);
  recipeResultsDiv.append(recipeDiv);
  recipeDiv.append(headerEl, recipeEl);
  console.log(timeToPrepInputEl.val());
});
// }
