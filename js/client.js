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