// Bring in HTML elements here
// let ingredientEl = $("#");

let APIKey = "2f346a836aae470092494ca66fe7f8fa";

// queryURL for searching recipes
let queryURL = `https://api.spoonacular.com/recipes/complexSearch?query=salmon&number=7&type=main&addRecipeInformation=true&apiKey=${APIKey}`;

// queryURL for searching for recipes by list of ingredients entered as string, words seperated by commas.  Returns a response object with the ingredients listed in it
let queryURLIngredients = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=7&apiKey=${APIKey}`;

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

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  let pricePerServing = response.results[0].pricePerServing;
  let readyInMinutes = response.results[0].readyInMinutes;
  let mealImgURL = response.results[0].image;
  let mealTitle = response.results[0].title;
  let mealID = response.results[0].id;
  let recipeURL = response.results[0].sourceUrl;
  console.log(`pricePerServing: ${pricePerServing}`);
  console.log(`readyInMinutes: ${readyInMinutes}`);
  console.log(`mealImgURL: ${mealImgURL}`);
  console.log(`mealID: ${mealID}`);
  console.log(`recipeURL: ${recipeURL}`);
});
