let api_youtube = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1";
let api_key = "AIzaSyCPJNHeGp_0ek10gfrLP0jcJEEA7yELeZ4";
let input = "funnt cats"; //J3SqMNGsptI
var videoId;



function youtubeCall(cb) {
    let url = api_youtube + "&q=" + input + "&key=" + api_key;

    $.ajax({
            url: url,
            method: "GET"
        })
        .then(function (response) {
            id = response.items[0].id.videoId;
            console.log("In promise", id);
            cb();
        })
}


youtubeCall(onYouTubeIframeAPIReady);

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player = "";


function onYouTubeIframeAPIReady() {
    console.log("In the function", id)
    player = new YT.Player('player', {
        height: '585',
        width: '960',
        videoId: id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}




// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}
