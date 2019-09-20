$(document).ready(function(){

//Arrays within an object that will allow the progrma to search in the selected region
var destinations = {
    usEast: ["New York City", "Orlando", "Miami", "Boston"],
    usWest: ["Los Angeles", "Las Vegas", "San Fransisco", "Seattle", "Portland, Oregon"],
    Canada: ["Vancouver", "Ottowa", "Toronto"],
    Mexico: ["Mexico City", "Tijuana"],
    France: ["Paris"],
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
        console.log(result)
        console.log(result.Results)
        console.log(result.Results[0])
	    var key = "4f8a13d4f8a423a049c97f0ad49fcb8b";
        var lat = result.Results[0].lat;
        var long = result.Results[0].lon;
        var time = 255657600;
        var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/"+key+"/"+lat+","+long+","+time+"?exclude=currently,flags";
        //This ajax call searches for the weather of the selected city
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){
            let a = response.daily.data[0]
            console.log(a)
            let max = a.apparentTemperatureMax
            console.log(max)
            //These are the conditionals based on what weather the user selects
            if(max>=35){
                var climate = "Hot"
            }
            else if(max<35 && max>15){
                var climate = "Warm"
            }
            else{
                var climate = "Cold"
            }
            //This is where we append the cities
            if(climate==$("#weatherSelect").val()){
                let p = $("<p>")
                p.attr("value", location+" vacation guide")
                p.attr("id", "city-links")
                p.text(location)
                $("#city-results").append(p)
            }
        })
    });
}


//When they click on the button, have the weatherSearch function search the selected region
$("#formButton").on("click",function(){
    event.preventDefault
    var regionSelect = $("#region-select").val()
    console.log(regionSelect)
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
            weatherSearch(destinations.usWest[i])
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


//Create an on-click for the results. Save the value of the result clicked as a variable
$("document").on("click", "#city-links", function(){

})



})