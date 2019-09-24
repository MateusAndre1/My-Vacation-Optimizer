$(document).ready(function () {
    // web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyD3Qqvz9wD_NthtsqSTPtcFsJru-pNfOTg",
        authDomain: "my-vacation-optimizer.firebaseapp.com",
        databaseURL: "https://my-vacation-optimizer.firebaseio.com",
        projectId: "my-vacation-optimizer",
        storageBucket: "",
        messagingSenderId: "582112781210",
        appId: "1:582112781210:web:c548b53c47fc8b43989023"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // global variables

    var database = firebase.database();

    let todo;

    $("#add-todo").on("click", function (event) {
        event.preventDefault();

        todo = $("#todo-input").val().trim();

        database.ref().push({
            dbtodo: todo
        });

        $("#todo-input").val("");

    });

    database.ref().on("child_added", function (snapshot) {
        console.log(snapshot.val());

        let listName = snapshot.val().dbtodo;

        let tr = $("<tr>");

        tr.append(listName)

        $("#displayboard").append(tr)

    });

    $("tbody").on("click", "tr", function () {
        $(this).toggleClass("completed")
    });

    var firebaseConfig2 = {
        apiKey: "AIzaSyC7oATcoeWWLlLIyjT11WEOTEmDFkZKogk",
        authDomain: "my-vacation-optimizer-2.firebaseapp.com",
        databaseURL: "https://my-vacation-optimizer-2.firebaseio.com",
        projectId: "my-vacation-optimizer-2",
        storageBucket: "",
        messagingSenderId: "252046134907",
        appId: "1:252046134907:web:f7b5c5308cb57822c95cde"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig2);

      var database2 = firebase.database();


    let day1;
    let day2;
    let day3;
    let day4;
    let day5;

    $("#add-plan").on("click", function (event) {
        event.preventDefault();
        day1 = $("#day1-input").val().trim();
        day2 = $("#day2-input").val().trim();
        day3 = $("#day3-input").val().trim();
        day4 = $("#day4-input").val().trim();
        day5 = $("#day5-input").val().trim();

        database2.ref().push({
            dbday1: day1,
            dbday2: day2,
            dbday3: day3,
            dbday4: day4,
            dbday5: day5,

        });

        $("#day1-input").val("");
        $("#day2-input").val("");
        $("#day3-input").val("");
        $("#day4-input").val("");
        $("#day5-input").val("");

    });

    database2.ref().on("child_added", function (snapshot) {
        let fday = snapshot.val().dbday1;
        let sday = snapshot.val().dbday2;
        let tday = snapshot.val().dbday3;
        let thday = snapshot.val().dbday4;
        let lday = snapshot.val().dbday5;



        let tr2 = $("<tr>");

        tr2.append("<td>" + fday + "</td>",
            "<td>" + sday + "</td>",
            "<td>" + tday + "</td>",
            "<td>" + thday + "</td>",
            "<td>" + lday + "</td>"
        )

        $("#displayboard2").append(tr2)


    });

    // global variables for everything below

    let api_youtube = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5";
    let api_key = "AIzaSyCbe0-7OsepLY88Fig1jKT6pfZuXiL2FAo";
    var player = "";
    var done = false;
    var tag = document.createElement('script');
    let hotels = localStorage.getItem("value") + "hotels";
    let activites = localStorage.getItem("value") + "fun things to do";
    let restaurants = localStorage.getItem("value") + "best restaurants";
    let top10 = localStorage.getItem("value") + "top 10 things to do";

    // load each individual map

    function loadMap1() {
        $(".hotel-map").empty();

        var mapview = ` 
        <iframe class="info-map" width="100%" height="600" frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/search?q=${hotels}&key=AIzaSyCPJNHeGp_0ek10gfrLP0jcJEEA7yELeZ4"
        allowfullscreen></iframe>
        `;
        // console.log(mapview)
        $(".hotel-map").append(mapview);
    }

    function loadMap2() {
        $(".activities-map").empty();

        var mapview = ` 
        <iframe class="info-map" width="100%" height="600" frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/search?q=${activites}&key=AIzaSyCPJNHeGp_0ek10gfrLP0jcJEEA7yELeZ4"
        allowfullscreen></iframe>
        `;
        // console.log(mapview)
        $(".activities-map").append(mapview);
    }

    function loadMap3() {
        $(".restaurants-map").empty();

        var mapview = ` 
        <iframe class="info-map" width="100%" height="600" frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/search?q=${restaurants}&key=AIzaSyCPJNHeGp_0ek10gfrLP0jcJEEA7yELeZ4"
        allowfullscreen></iframe>
        `;
        // console.log(mapview)
        $(".restaurants-map").append(mapview);
    }

    // recall youtube for each video

    function youtubeCall() {
        let url = api_youtube + "&q=" + top10 + "&key=" + api_key;

        $.ajax({
                url: url,
                method: "GET"
            })
            .then(function (response) {
                let itemsid = response.items[0].id.videoId;
                console.log("In promise", itemsid);

                videoLoad(itemsid);
            })

    }

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
            width: '100%',
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

    // Creates the template on the page

    function videoLoad(itemsid) {
        $(".activities-video").empty();
        const videoTemplate = youtubeTemplate(itemsid);
        $(".activities-video").append(videoTemplate);
    }

    // call functions in order

    function calls() {

        youtubeCall(); // load first, has biggest ms latency
        loadMap1();
        loadMap2();
        loadMap3();
    }
    calls();


});