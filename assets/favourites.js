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
        .text(`${mealTitles[i]}`)
        .css("font-size", "20px");

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
        let linkDiv = $("<div>");

        let buttonLink = $("<button>")
          .addClass("btn btn-danger")
          // add attribute as an identifier for favourite button
          .attr("urlBlog", blogURLs[i])
          .text("Blog Link")
          .css("background-color", "#9A031E")
          .css("border-color", "#9A031E");
          
          linkDiv.append(buttonLink);
          columnThree.append(linkDiv);

        var columnFour = $("<div>")
        .addClass("col-sm d-flex justify-content-center entries-columns");
       
        // Add button to allow user to remove this item from favourites
        let removeDiv = $("<div>");

        let buttonRemove = $("<button>")
          .addClass("btn btn-danger")
          // add attribute as an identifier for favourite button
          .attr("id", favouriteIDs[i])
          .text("X")
          .css("background-color", "#9A031E")
          .css("border-color", "#9A031E");
          
          removeDiv.append(buttonRemove);
          columnFour.append(removeDiv);



        newRow.append(columnOne, columnTwo, columnThree, columnFour);

        tableContainer.append(newRow);


      
    };
}
    
    // Append rows from local storage when page is reloaded
    appendRows();


/*     // Code to control opening and closing of modal

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
}; */