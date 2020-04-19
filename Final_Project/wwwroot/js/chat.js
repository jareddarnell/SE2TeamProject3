﻿"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("http://students.cs.weber.edu/Group123/chatHub").build(); // Server setting
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); //Local Setting

//Client-side persistance variables
var user = "";
var clientGroups = [];

//connection.start();

connection.on("sendstuff_raw_text", function (paramData) {
    alert("sendstuff_raw_text - paramData is: " + paramData);
});

connection.on("sendstuff_1", function (jsonObject) {
    alert("sendstuff_1 - paramData is: " + JSON.stringify(jsonObject));
});


connection.on("sendstuff_2", function (jsonObject) {
    alert("sendstuff_2 - paramData is: " + JSON.stringify(jsonObject));
});

connection.start().then(function ()
{
    
} ).catch(function (err)
{
    return console.error(err.toString());
} );



connection.on("ReceiveGroups", (groups) =>
{
    
} );


//Login Event
document.getElementById("login").addEventListener("click", function (eventLogin)
{
    user = document.getElementById("username").value;

    document.getElementById("logindiv").style.display = "none";
    alert("Got user " + user);
    //Call hub method
    connection.invoke("UserLogin", user).catch(function (err)
    {
        return console.error(err.toString());
    } );

    eventLogin.preventDefault();
});

function newGroup()
{
    var groupName = document.getElementById("newcategorytext").value;

    connection.invoke("NewGroup", groupName).catch(err => console.error(err.toString()));
}

function newItem()
{
    var itemName = document.getElementById("newitemtext").value;

    connection.invoke("NewItem", itemName).catch(err => console.error(err.toString()));
}
