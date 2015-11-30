// cookies

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function deleteCookie(key) {
    var expires = new Date();
    expires.setTime(1);
    document.cookie = key + '=' + ';expires=' + expires.toUTCString();
}

// login function
$("#loginform").submit(function (e) {

    var Username = $('#userfrm').val();
    var Password = $('#passfrm').val();

    var url = "http://localhost:14555/api/login/"; // the script where you handle the form input.
    var data = '{"username": "' + Username + '", "password": "' + Password + '"}';

    console.log(data);
    $.ajax({
        type: "POST",
        url: url,
        dataType: "JSON",
        data: data, // serializes the form's elements.
        error: function (response) {
            alert("Something went wrong")

        },
        success: function (response) {
            console.log(response.message); // show response
            if (response.userid) {

                setCookie('userid', response.userid)
                window.location.href = 'game.html';

            }
            else {
                alert("Wrong username or password, please try again.")
            }
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.
});

// create game function
$("#create").click(function (e) {

    var GameName = $('#frmGameName').val();
    var Opponent = $('#frmOpponent').val();
    var Host = getCookie('userid');
    var HostControls = host_movements;
    var url = "http://localhost:14555/api/games/"; // the script where you handle the form input.
    var game =
    {
        name: GameName,
        opponent: {id: Opponent},
        host: {id: Host, controls: HostControls}
    }
    var data = JSON.stringify(game);
    console.log(data);
    $.ajax({
        type: "POST",
        url: url,
        dataType: "JSON",
        data: data, // serializes the form's elements.
        error: function (response) {
            alert("Something went wrong")

        },
        success: function (response) {
            alert("game created")
            location.reload();
            console.log(response.message); // show response

        }
    });
})

// delete game function
$("#deleteform").submit(function (e) {

    var game = $('#deletegamefrm').val();
    var url = "http://localhost:14555/api/games/" + game; // the script where you handle the form input.
    console.log(url);
    $.ajax({
        type: 'POST',
        url: url,
        dataType: "JSON",
        error: function (response) {
            alert("Something went wrong")
        },
        success: function (response) {
            console.log(response.message); // show response
            if (response.message === "Game was deleted") {
                alert("Game deleted")
                location.reload();

            }
            else {
                alert("Can't find that game.")
            }
        }
    });


    e.preventDefault(); // avoid to execute the actual submit of the form.
});

// table for deleting current games
var userid = getCookie('userid');

$.get("http://localhost:14555/api/games/host/" + userid + "/", function (data) {
    for (var i = 0; i < data.length; ++i) {
        $('#deletegames tr:last').after('<tr>' +
            '<td>' + data[i].name + '</td>' +
            '<td>' + data[i].gameId + '</td>' +

            '</tr>');
    }
    console.log(data)

});

// table of current games to join / play
var userid = getCookie('userid');

$.get("http://localhost:14555/api/games/opponent/" + userid + "/", function (data) {
    for (var i = 0; i < data.length; ++i) {
        $('#joingames tr:last').after('<tr>' +
            '<td>' + data[i].name + '</td>' +
            '<td>' + data[i].gameId + '</td>' +
            '</tr>');
    }
    console.log(data)

});


// Function for scores table
$.get("http://localhost:14555/api/scores/", function (data) {

    for (var i = 0; i < data.length && i < 10; ++i) {
        $('#top10 tr:last').after('<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td>' + data[i].user.firstName + " " + data[i].user.lastName + " (" + data[i].user.username + ")" +'</td>' +
            '<td>' + data[i].score + '</td>' +
            '</tr>');
    }
});

// Opponents on click list
$.get("http://localhost:14555/api/users/", function (data) {
    console.log(data)
    for (var i = 0; i < data.length; ++i) {
        if (getCookie('userid') != data[i].id) {
            $('#frmOpponent')
                .append($('<option>', {value: data[i].id})
                    .text(data[i].firstName + " " + data[i].lastName + " (" + data[i].username + ")"));
        }
    }
});

// Join game function
$("#join-button").click(function (e) {
    var gameid = $('#joingamefrm').val();
    setCookie('joinId', gameid);
    window.location.href = ("start.html")
    console.log(getCookie('joinId'))
});

// start game function
$("#start").click(function(e) {
    var GameId = getCookie('joinId');
    var OpponentControls = host_movements;
    var url = "http://localhost:14555/api/games/start"; // the script where you handle the form input.
    var data = '{"gameId": ' + GameId + ', "opponent": {"controls" : "'+ OpponentControls + '"}}';

    $.ajax({
        type: "POST",
        url: url,
        dataType: "JSON",
        data: data, // serializes the form's elements.
        error: function(response) {
            alert("Something went wrong")

        },
        success: function(response)
        {
            alert("game started")
            window.location.href=('game.html');
            console.log(response.message); // show response

        }
    });})
