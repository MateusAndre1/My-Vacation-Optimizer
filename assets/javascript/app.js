var destinations = {
    US: ["New York City", "Chicago", "Los Angeles"],
    Canada: ["Vancouver", "Ottowa", "Toronto"],
    Mexico: ["Mexico City",]
}

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

    $.ajax(settings).then(function (result) {
        console.log(result)
        console.log(result.Results)
        console.log(result.Results[0])
	    var key = "4f8a13d4f8a423a049c97f0ad49fcb8b";
        var lat = result.Results[0].lat;
        var long = result.Results[0].lon;
        var time = 255657600;
        var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/"+key+"/"+lat+","+long+","+time+"?exclude=currently,flags";
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){
            let a = response.daily.data[0]
            console.log(a)
            let min = a.apparentTemperatureMin
            let max = a.apparentTemperatureMax
            let precip = a.precipType
            console.log(min)
            console.log(max)
            console.log(precip)
        })
    });
}
$("#formButton").on("click", function(){
    event.preventDefault
    var startDate = $("#start-date").val()
    console.log(startDate)
    var endDate = $("#end-date").val()
})
