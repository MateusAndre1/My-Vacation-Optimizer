let api_youtube = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10";
let api_key = "AIzaSyCPJNHeGp_0ek10gfrLP0jcJEEA7yELeZ4";
let input = "orlando, fl vacation";

function youtubeCall() {
    let url = api_youtube + "&q=" + input + "&key="+ api_key;

    $.ajax({
        url: url,
        method: "GET"
    })
    .then(function (response){
        console.log(response);
    })


}

youtubeCall();