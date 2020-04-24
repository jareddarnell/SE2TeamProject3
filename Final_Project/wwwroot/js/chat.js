﻿"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("http://students.cs.weber.edu/Group123/chatHub").build(); // Server setting
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); //Local Setting

//Client-side persistence variables
var user = "";
var clientGroups = [];
var selectedDropdown = "";

//connection.start();

connection.start().then(function () {

}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("ReceiveGroup", function (jsonObject) {
    var div = document.querySelector('.dropdown-menu');

    var tempGroups = JSON.parse(JSON.stringify(jsonObject));

    for (var i in tempGroups) {
        clientGroups[i] = tempGroups[i].sGroupName;
        i++;
    }

    if (clientGroups.length == 0) {
        clientGroups.forEach(group => {
            div.innerHTML += `<li><a class="dropdown-item" href="#">${group}</a></li>`;
        });
    }
    else {
        //<li><a href="#">Option 1</a></li>
        div.innerHTML += `<li><a href="#">${clientGroups[clientGroups.length - 1]}</a></li>`;
    }
});

connection.on("ReceiveItem", function (jsonObject) {
    var div = document.getElementById("rowitems");

    var dropdown = document.getElementById("dropdownmenu");
    var currentGroup = dropdown.options[dropdown.selectedIndex].value;

    var tempGroups = JSON.parse(JSON.stringify(jsonObject));
    debugger;
    for (var i in tempGroups) {
        itemGroups[i] = tempGroups[i];
        i++;
    }
});

//Populate groups for late-joining user
connection.on("InitialGroups", function (jsonObject) {
    var div = document.querySelector('.dropdown-menu');

    var tempGroups = JSON.parse(JSON.stringify(jsonObject));

    for (var i in tempGroups) {
        clientGroups[i] = tempGroups[i].sGroupName;
        i++;
    }

    clientGroups.forEach(group => {

        div.innerHTML += `<li><a href="#">${group}</a></li>`;
    });
});

//Login Event
function login() {
    user = document.getElementById("username").value;

    document.getElementById("logindiv").style.display = "none";
    //alert("Got user " + user);

    //Call hub method
    connection.invoke("UserLogin", user).catch(function (err) {
        return console.error(err.toString());
    });
}

function newGroup()
{
    var groupName = document.getElementById("newcategorytext").value;

    connection.invoke("NewGroup", groupName).catch(err => console.error(err.toString()));
}

function newItem()
{
    debugger;
    var itemName = document.getElementById("newitemtext").value;

    var dropdown = document.getElementById("dropdownmenu");
    var groupName = "";

    connection.invoke("NewItem", user, itemName, groupName).catch(err => console.error(err.toString()));
}


$(".dropdown-menu li a").click(function () {
    alert("I got here" + $(this).text());
});
