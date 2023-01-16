// append rows of favourited meals when page is loaded

let tableContainer = $("#favourites-table")






// Function to append   
function appendRows(){

    // Deleting the buttons prior to adding new movies
      // (this is necessary otherwise there will be repeat buttons)
      // tableContainer.empty();
    
      // Take array of locations from local storage and loop through them
      var favouriteIDs = JSON.parse(localStorage.getItem("favourites"));
      
    
      for (var i = 0; i < favouriteIDs.length; i++) {
    
        // New row
        var newRow = $("<div>")
        .addClass("row");

        var columnOne = $("<div>")
        .addClass("col-sm d-flex justify-content-center lead")
        .text(`${favouriteIDs[i]}`);

        var columnTwo = $("<div>")
        .addClass("col-sm d-flex justify-content-center lead");

        var columnThree = $("<div>")
        .addClass("col-sm d-flex justify-content-center lead");

        var columnFour = $("<div>")
        .addClass("col-sm d-flex justify-content-center lead");

        newRow.append(columnOne, columnTwo, columnThree, columnFour);

        tableContainer.append(newRow);



        // columnOne.innerHTML += `<p>${favouriteIDs[i]}</p>`




        /* // Then dynamicaly generating buttons for each location in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var newBtn = $("<button>");
        // Adding a type to the button
        // newBtn.addType("button");
        // Adding a class of movie to our button
        newBtn.addClass("btn btn-secondary btn-block w-100 rounded mt-3 added-buttons");
        // Adding a data-attribute
        newBtn.attr("data-name", locations[i]);
        // Providing the initial button text
        newBtn.text(locations[i]);
        // Adding the button to the "list-group" div
        $(".list-group").append(newBtn); */
      }
      
    };
    
    
    // Append rows from local storage when page is reloaded
    appendRows();