"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("http://students.cs.weber.edu/Group123/chatHub").build(); // Server setting
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); //Local Setting

//connection.start();


connection.start().then(function ()
{
    
} ).catch(function (err)
{
    return console.error(err.toString());
} );



connection.on("ReceiveMessage", function (user, message)
{
    
} );


//Login Event
document.getElementById("login").addEventListener("click", function (eventLogin)
{
    var user = document.getElementById("username").value;

    document.getElementById("logindiv").style.display = "none";

    //Call hub method
    connection.invoke("UserLogin", user, message).catch(function (err)
    {
        return console.error(err.toString());
    } );

    eventLogin.preventDefault();
} );