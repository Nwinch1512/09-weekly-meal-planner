// append rows of favourited meals when page is loaded

let tableContainer = $("#favourites-table")






// Function to append   
function appendRows(){

    // Deleting rows prior to adding new movies
      // (this may be necessary otherwise there will be repeat rows when row removed function is used)
      // tableContainer.empty();
    
      // Take array of locations from local storage and loop through them
      var favouriteIDs = JSON.parse(localStorage.getItem("favourites"));
      var imgURLs = JSON.parse(localStorage.getItem("imgFavourites"));
      var blogURLs = JSON.parse(localStorage.getItem("blogFavourites"));
      var mealTitles = JSON.parse(localStorage.getItem("titleFavourites"));

          
      for (var i = 0; i < favouriteIDs.length; i++) {
    
        // New row
        var newRow = $("<div>")
        .addClass("row entries-rows");

        var columnOne = $("<div>")
        .addClass("col-sm d-flex justify-content-center entries-columns")
        .text(`${mealTitles[i]}`);

        var columnTwo = $("<div>")
        .addClass("col-sm d-flex justify-content-center entries-columns");
        // Add meal image to this column
        let mealImg = $("<img>")
          .attr("src", imgURLs[i])
          .attr("alt", "image of meal")
          .attr("title", mealTitles[i])
          .css("margin-left", "auto")
          .css("margin-right", "auto")
          columnTwo.append(mealImg);

        var columnThree = $("<div>")
        .addClass("col-sm d-flex justify-content-center entries-columns");
        // Add button that links to blog to this column

        var columnFour = $("<div>")
        .addClass("col-sm d-flex justify-content-center entries-columns");
        // Add button to allow user to remove this item from favourites

        newRow.append(columnOne, columnTwo, columnThree, columnFour);

        tableContainer.append(newRow);


      
    };
}
    
    // Append rows from local storage when page is reloaded
    appendRows();