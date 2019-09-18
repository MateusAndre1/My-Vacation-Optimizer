let api_url = "https://cors-anywhere.herokuapp.com/api.eventful.com/json/events/search?";
let api_key = "app_key=6MpqJRCcqvBRwSn8";
// let location;
let event = "&keywords=sports"

function eventful() {
    let url = api_url + api_key + "&&location =" + "orlando" + event;

    $.ajax({
        url: url,
        method: "GET"
    })
    .then(function (response) {
        console.log(response);
    })
};

eventful()