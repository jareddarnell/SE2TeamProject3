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
    var ul = document.querySelector('.dropdown-menu');
    debugger;
    var tempGroups = JSON.parse(JSON.stringify(jsonObject));
    clearCards();
    for (var i in tempGroups) {
        clientGroups[i] = tempGroups[i].sGroupName;
        createCards(clientGroups[i]);

        var li = document.createElement("li");
        li.onclick = function () {
            alert("I got here" + $(this).text());
        }
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.innerText = `${ clientGroups[i] }`;
        li.appendChild(a);
        ul.appendChild(li);
        i++;
    }




    //var newHTML = document.createElement('li');
    //newHTML.innerHTML = `<a href="#">${clientGroups[clientGroups.length - 1]}</a>`;

    //div.appendChild(newHTML);
});

connection.on("ReceiveItems", function (jsonObject) {
    var div = document.getElementById("rowitems");

    var currentGroup = selectedDropdown;

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
    var groupName = selectedDropdown;

    connection.invoke("NewItem", user, itemName, groupName).catch(err => console.error(err.toString()));
}


$(".dropdown-menu li a").click(function () {
    alert("I got here" + $(this).text());
});

//show cards at bottom
function createCards(group) {

    var card = document.createElement("div");
    var cardBorder = document.createElement("div");
    var cardHeader = document.createElement("h2");
    var cardBody = document.createElement("div");
    var cardHeaderText = document.createTextNode(group);

    cardHeader.appendChild(cardHeaderText);
    cardHeader.appendChild(cardBody).classList.add("h3");
    cardBorder.appendChild(cardHeader);
    card.appendChild(cardBorder).classList.add("card");
    document.getElementById("rowitems").appendChild(card).classList.add("container");

}
//clear old cards
function clearCards() {
    document.getElementById("rowitems").innerHTML = "";
}

function createCardItems() {
    var cardItem = document.createElement("p")
    document.getElementById(cardBody).appendChild(cardItem);
}
