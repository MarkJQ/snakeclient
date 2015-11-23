console.log("TEST");

// login function
$("#loginform").submit(function(e) {

    var Username = $('#userfrm').val();
    var Password = $('#passfrm').val();

    var url = "http://localhost:14555/api/login/"; // the script where you handle the form input.
    var data = '{"username": "' + Username + '", "password": "'+ Password +'"}';

    console.log(data);
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
            console.log(response.message); // show response
            if(response.userid) {

                userid = response.userid;
                document.cookie=userid;
                window.location.href = 'game.html';

            }
            else {
                alert("Wrong username or password, please try again.")
            }
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.
});

// delete game function
$("#deleteform").submit(function(e) {

    var game = $('#gamefrm').val();
    var url = "http://localhost:14555/api/games/" + game; // the script where you handle the form input.
    console.log(url);
    $.ajax({
        type: 'POST',
        url: url,
        dataType: "JSON",
        error: function(response) {
            alert("Something went wrong")
        },
        success: function(response)
        {
            console.log(response.message); // show response
            if(response.message === "Game was deleted") {
                alert("Game deleted")

            }
            else {
                alert("Can't find that game.")
            }
        }
    });




    e.preventDefault(); // avoid to execute the actual submit of the form.
});

$.get("http://localhost:14555/api/scores",   function( data )  {

    for (var i=0;i<data.length && i < 10 ;++i)
    {
        $('#top10 tr:last').after('<tr>' +
            '<td>' + (i+1) + '</td>' +
            '<td>' + data[i].user.firstName +" "+ data[i].user.lastName + '</td>' +
            '<td>' + data[i].score + '</td>' +
            '</tr>');
    }
    console.log(data)

});

var userid = document.cookie;

$.get("http://localhost:14555/api/games/host/"+ userid + "/", function( data )  {
    for (var i=0;i<data.length;++i)
    {
        $('#games tr:last').after('<tr>' +
            '<td>' + data[i].name + '</td>' +
            '<td>' + data[i].gameId + '</td>' +

            '</tr>');
    }
    console.log(data)

});

// Opponents on click list
$.get("http://localhost:14555/api/users/", function( data )  {
    console.log(data)
    for (var i=0;i<data.length;++i)
    {
        $('#frmOpponent')
            .append($('<option>', { value : data[i].id })
                .text(data[i].firstName + " " + data[i].lastName + " (" + data[i].username + ")"));
    }
});
