let api_url = "http://api.eventful.com/json/events/search?";
let api_key = "app_key=6MpqJRCcqvBRwSn8";
// let location;
let event = "&keywords=sporting"

function eventful() {
    let url = api_url + api_key + "&&location =" + "orlando" + event;

    $.ajax({
        url: url,
        method: "GET"
    })
    .then(function (response) {
        console.log(response)
    })
}