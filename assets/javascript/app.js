var destinations = {
    US: ["New York City", "Chicago", "Los Angeles"],
    Canada: ["Vancouver", "Ottowa", "Toronto"],
    Mexico: ["Mexico City",]
}

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=New%20York",
	"method": "GET",
	"headers": {
	"x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
	"x-rapidapi-key": "53d40f2e3fmsh12a20b5f666e560p1b6da5jsn38ffe068fabc"
	}
}

$.ajax(settings).then(function (response) {
	var key = "4f8a13d4f8a423a049c97f0ad49fcb8b";
    var lat = 87.6298;
    var long = 41.8781;
    var time = 255657600;
    var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/"+key+"/"+lat+","+long+","+time+"?exclude=currently,flags";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response)
    })
});


var key = "4f8a13d4f8a423a049c97f0ad49fcb8b";
var lat = 87.6298;
var long = 41.8781;
var time = 255657600;
var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/"+key+"/"+lat+","+long+"?exclude=currently,flags";
$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response){
    console.log(response)
})