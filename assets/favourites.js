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
          .addClass("btn btn-danger button-link")
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
          .addClass("btn btn-danger btn-remove")
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


    // Function to load blog page when blog link button is clicked
    $(document).on("click", ".button-link", openBlog);

    function openBlog(event) {
      
      console.log(`${$(this).attr("urlBlog")}`);
      event.preventDefault();
      var url = `${$(this).attr("urlBlog")}`;
      var win = window.open(url, '_blank');
      win.focus();
    }


    // Function to remove from favourites when link button is clicked
    $(document).on("click", ".btn-remove", removeMeal);

    function removeMeal(event) {
      
      event.preventDefault();

      console.log(`${$(this).attr("id")}`);
      
      let itemID = $(this).attr("id");
      
      // parse existing storage key or string representation of empty array (uses || operator, means
      // to take "lis_items" or if that is false take empty array '[]')
      var existingEntries = getFavourites();
      var existingBlogEntries = getBlogFavourites();
      var existingImgEntries = getImgFavourites();
      var existingTitleEntries = getTitleFavourites();

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

      appendRows();
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