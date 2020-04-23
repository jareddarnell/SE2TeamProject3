"use strict";

//var connection = new signalR.HubConnectionBuilder().withUrl("http://students.cs.weber.edu/Group123/chatHub").build(); // Server setting
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build(); //Local Setting

//Client-side persistence variables
var user = "";
var clientGroups = [];

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
            div.innerHTML += `<a class="dropdown-item" href="#">${group}</a>`;
        });
    }
    else {
        div.innerHTML += `<a class="dropdown-item" href="#">${clientGroups[clientGroups.length - 1]}</a>`;
    }
});

connection.on("ReceiveItem", function (jsonObject) {
    var div = document.getElementById("rowitems");

    var dropdown = document.getElementById("dropdownmenu");
    var currentGroup = dropdown.options[dropdown.selectedIndex].value;

    var itemName = JSON.parse(jsonObject).name;
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
        div.innerHTML += `<a class="dropdown-item" href="#">${group}</a>`;
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
    var itemName = document.getElementById("newitemtext").value;

    connection.invoke("NewItem", itemName).catch(err => console.error(err.toString()));
}
