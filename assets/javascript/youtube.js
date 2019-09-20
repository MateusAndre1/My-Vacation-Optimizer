$(document).ready(function () {

    // global variables

    let api_youtube = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5";
    let api_key = "AIzaSyCPJNHeGp_0ek10gfrLP0jcJEEA7yELeZ4";
    let input = "jamaica vacation tour guide";
    var player = "";
    var done = false;
    var tag = document.createElement('script');

    function loadMap() {
        $(".tourmap").empty();
        var mapview = ` 
        <iframe class="info-map" width="960" height="600" frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/search?q=${input}&key=AIzaSyCPJNHeGp_0ek10gfrLP0jcJEEA7yELeZ4"
        allowfullscreen></iframe>
        `;
        // console.log(mapview)
        $(".tourmap").append(mapview);
    }

    loadMap();



    // This code loads the IFrame Player API code asynchronously.

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.

    function youtubeTemplate(itemsid) {

        console.log("In the function", itemsid)
        player = new YT.Player('player', {
            height: '585',
            width: '960',
            videoId: itemsid,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // The API will call this function when the video player is ready.

    function onPlayerReady(event) {
        event.target.pauseVideo();
    }

    // The API calls this function when the player's state changes.
    // The function indicates that when playing a video (state=1),
    // the player should play for six seconds and then stop.

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            done = true;
        }
    }

    function stopVideo() {
        player.stopVideo();
    }

    //

    function videoArr(itemsid) {
        $("#player").empty();
        const videoTemplate = youtubeTemplate(itemsid);
        $("#player").append(videoTemplate);
    }


    // call youtube API to retrieve data

    function youtubeCall() {
        let url = api_youtube + "&q=" + input + "&key=" + api_key;

        $.ajax({
                url: url,
                method: "GET"
            })
            .then(function (response) {
                let itemsid = response.items[0].videoId;
                console.log("In promise", itemsid);
                videoArr(itemsid);
            })
    }

    function youtubeOnClick() {
        youtubeCall();
    }

    $("#player").on("click", youtubeOnClick);

});