        $(document).ready(function() {
        // This is the array of animals that are capable of displaying gifs upon button click
        var animals = ['bird', 'rabbit', 'dog', 'duck', 'fox', 'cat', 'whale', 'horse', 'dragon'];

        // This loops through the animals array and creates a button for each one
        function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
                $(areaToAddTo).empty();
                for (var i = 0; i < arrayToUse.length; i++) {
                var b = $("<button>");
                b.addClass(classToAdd);
                b.attr("data-type", arrayToUse[i]);
                b.text(arrayToUse[i]);
                $(areaToAddTo).append(b);
                }
        }

                // This function handles when an animal button is selected
        $(document).on('click', '.animal-button', function() {
                $('#gifDump').empty();
                // this changes the animation of an element on hover-over
                $(".animal-button").removeClass("active");
                $(this).addClass("active");

                var gif = $(this).attr("data-type");
                var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

                $.ajax({
                        url: queryURL,
                        method: "GET"
                }).then(function(response) {
                        console.log(response);

                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                        
                        var animalDiv = $("<div class=\"animal-item\">");
                        
                        var rating = results[i].rating;
                        var p = $('<p>').text("Rated: " + rating);
                        
                        var animated = results[i].images.fixed_height.url;
                        var still = results[i].images.fixed_height_still.url;
                        console.log(animated);
                        console.log(still);

                        var animalImg = $('<img>');

                        animalImg.attr("src", still);
                        animalImg.attr("data-still", still);
                        animalImg.attr("data-animate", animated);
                        animalImg.attr("data-state", "still");
                        animalImg.addClass("animal-image");

                        animalDiv.append(p);
                        animalDiv.append(animalImg);
                        $('#gifDump').append(animalDiv);
                }
        });
});

$(document).on("click", ".animal-image", function() {

        var state = $(this).attr("data-state");
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
});

        $('#addAnimal').on('click', function(event) {
                event.preventDefault();
                var newAnimal = $('input').val();

                if (newAnimal.length > 2) {
                        animals.push(newAnimal);
                }
                populateButtons(animals, "animal-button", "#animalButtons");

        });

        populateButtons(animals, "animal-button", "#animalButtons");
});














                // originally "tag=" where q has replaced it
        // ==========
         //   https://api.giphy.com/v1/gifs/random?api_key=9hZiQVnKSW5XO4IGzROLlMbAkgZyvWyF&tag=bird&rating=G&limit:10
    //  ==========

                // ROSS'S WAY BELOW
//     for (var i = 0; i<animals.length; i++) {
//         var b = $('<button>');
//         b.text(animals[i]);
//         b.attr("data-name", animals[i]);
//         b.addClass("animal-btn");
//         $('#animalButtons').append(b);
//     }


        // THIS IS WHAT HAPPENS WHEN THE ANIMAL BUTTONS ARE CLICKED
//     $('.animal-btn').on('click', function(event) {
//         event.preventDefault();
//         var gif = $("input").val().trim();
//       	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=9hZiQVnKSW5XO4IGzROLlMbAkgZyvWyF&rating=G&limit:10";

//       	$.ajax({
//             url: queryURL
//       	}).then(function(response) {
//                 for (var i = 0; i<animals.length; i++) {
//                         var img = $('<img>');
//                         img.attr("src", response.data[i].images.downsized_large.url);
//                         $('#gifDump').append(img);
//                         console.log(img);
//                 }
//       	});
//       });