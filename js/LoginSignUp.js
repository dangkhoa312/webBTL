$(document).ready(function(){
    $("#btt-open").click(function(){
        $("#mymodal").modal();
        $("#registerForm").css("display", "none");
        $("#logIn").css("display", "block");
        
    })
});

