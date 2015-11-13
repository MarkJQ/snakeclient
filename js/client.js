console.log("TEST");

// this is the id of the form
$("#loginform").submit(function(e) {

    var Username = $('#userfrm').val();
    var Password = $('#passfrm').val();

    var url = "http://localhost:9998/api/login/"; // the script where you handle the form input.
    var data = '{"username": "' + Username + '", "password": "'+ Password +'"}';

    console.log(data);
    $.ajax({
        type: "POST",
        url: url,
        dataType: "JSON",
        data: data, // serializes the form's elements.
        error: function(response) {
            $(".info").text(" Server Error");

            // document location is for testing, to make it redirect to game.html - correct location is when the correct user/pass is entered
            document.location ="game.html"
        },
        success: function(response)
        {
            console.log(response.message); // show response
            // checking for correct username & password
            if(response.userid) {
                $(".squared")
                // if username & password is correct, redirects you to game.html
                document.location = "game.html";
            }
            else {
                $(".info").text("Wrong username or password. Please try again.")

        // sends you the following message
                document.location = '/index.html?info=Wrong username or password. Please try again.';
            }
        }
    });



    e.preventDefault(); // avoid to execute the actual submit of the form.
});

