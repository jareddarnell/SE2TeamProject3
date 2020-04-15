"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); //Local Setting

/*connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
    console.log("test");
});*/

//Login Event
document.getElementById("login").addEventListener("click", function (eventLogin)
{
    var user = document.getElementById("username").value;

    document.getElementById("logindiv").style.display = "none";

    //Call hub method
    connection.invoke("UserLogin", user).catch(function (err)
    {
        return console.error(err.toString());
    });

    eventLogin.preventDefault();
});