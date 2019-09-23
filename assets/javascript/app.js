$(document).ready(function(){

//Arrays within an object that will allow the progrma to search in the selected region
var destinations = {
    usEast: ["New York City, New York", "Orlando, Florida", "Miami, Florida", "Boston, Massachusetts"],
    usWest: ["Los Angeles, California", "Las Vegas, Nevada", "San Francisco, California", "Seattle, Washington", "Portland, Oregon"],
    Canada: ["Vancouver", "Ottowa", "Toronto", "Whistler, Canada"],
    Mexico: ["Mexico City, Mexico", "Tijuana, Mexico"],
    France: ["Paris, France"],
    Spain: ["Madrid", "Barcelona"]
}

//This function searches the city inputed and determines if the city meets the weather specifications
function weatherSearch(location){
    var settings = {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location="+location,
	    "method": "GET",
	    "headers": {
	    "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
	    "x-rapidapi-key": "53d40f2e3fmsh12a20b5f666e560p1b6da5jsn38ffe068fabc"
	    }
    }

    //This ajax call searches for the latitude and longitude of the selected city
    $.ajax(settings).then(function (result) {
        //This is my algorithm to get the start date
        var startDate = $("#start-date").val();
        var splitDate = startDate.split(" ");
        splitDate[2] = 2018;
        var unixDate = moment(splitDate.join(" "), "MMM-DD-YYYY").unix();
        console.log(unixDate)
        //This is what I'm searching
	    var key = "4f8a13d4f8a423a049c97f0ad49fcb8b";
        var lat = result.Results[0].lat;
        var long = result.Results[0].lon;
        console.log(unixDate)
        //var queryUrl = "https://api.darksky.net/forecast/"+key+"/"+lat+","+long+","+unixDate+"?exclude=currently,flags";
        var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/"+key+"/"+lat+","+long+","+unixDate+"?exclude=currently,flags";
        //This ajax call searches for the weather of the selected city
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){
            let a = response.daily.data[0]
            console.log(location)
            let max = a.apparentTemperatureMax
            console.log(max)
            //These are the conditionals based on what weather the user selects
            if(max>=85){
                var climate = "Hot";
            }
            else if(max<85 && max>=60){
                var climate = "Mild";
            }
            else{
                var climate = "Cold"
            }
            //This is where we append the cities
            if(climate==$("#weatherSelect").val()){

                let a = $("<a>")
                let p = $("<p>")
                a.attr("href", "index2.html")
                a.attr("value", location)
                a.attr("id", "city-links")
                a.text(location)
                p.append(a)
                $("#city-results").append(p)

            }
            
        })
        
    });
}


//When they click on the button, have the weatherSearch function search the selected region
$("#formButton").on("click",function(event){
    event.preventDefault();
    
    var regionSelect = $("#region-select").val()
    $("#city-results").empty()

    if(regionSelect==1){
        for(i=0; i<destinations.usEast.length; i++){
            weatherSearch(destinations.usEast[i])
        }
    }
    else if(regionSelect==2){
        for(i=0; i<destinations.usWest.length; i++){
            weatherSearch(destinations.usWest[i])
        }
    }
    else if(regionSelect==3){
        for(i=0; i<destinations.Canada.length; i++){
            weatherSearch(destinations.Canada[i])
        }
    }
    else if(regionSelect==4){
        for(i=0; i<destinations.Mexico.length; i++){
            weatherSearch(destinations.Mexico[i])
        }
    }
    else if(regionSelect==5){
        for(i=0; i<destinations.Spain.length; i++){
            weatherSearch(destinations.Spain[i])
        }
    }
    else if(regionSelect==6){
        for(i=0; i<destinations.France.length; i++){
            weatherSearch(destinations.France[i])
        }
    }    

})

// $('.slider').slider({ 
//     full_width: true,
//     height : 1000, // default - height : 400
//     interval: 6000 // default - interval: 6000
// });

//Create an on-click for the results. Save the value of the result clicked as a variable
$(document).on("click", "#city-links", function(){
    const value = $(this).attr("value");
    localStorage.setItem("value", value);
})




})