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

    database.ref().on("child_added", function(snapshot) {
        console.log(snapshot.val());
        
        let listName = snapshot.val().dbtodo;

        let tr = $("<tr>");
        tr.append("<span><i class='far fa-trash-alt'></i>  ")
;
        tr.append(listName)

    $("#displayboard").append(tr)

    });
});

$('tbody').on("click", "span", function (e) {
    $(this).parent().fadeOut( function () {
        $(this).remove();
    });
    e.stopPropagation();
});
$("tbody").on("click", "tr", function () {
    $(this).toggleClass("completed")
});
