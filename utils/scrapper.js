/* global console*/
"use strict";
//var page = +document.querySelector(".pool-content form .pagination li.active").textContent;
var nextPage = document.querySelector(".pool-content form .pagination li.active").nextElementSibling || false;
nextPage = nextPage ? nextPage.querySelector("a").href : false;

var clubes = document.querySelector("#clubs-destacados").children;
var club, title, premium, city, country, image;

var result = [];

for (var i = clubes.length - 1; i >= 0; i--) {
    club = clubes[i];
    title = club.querySelector(".product .description h4:first-child a").textContent.trim();
    premium = club.querySelector(".product .description h4:nth-child(2)").textContent === "Club Premium";
    city = club.querySelector(".product .description p b");
    country = city.textContent;
    city.parentNode.removeChild(city);
    city = club.querySelector(".product .description p").textContent.trim();
    image = club.querySelector("img").src;
    if (image === "http://www.poolmania.es/img/web/foto-club.jpg") {
        image = "assets/club-list/no-image.png"
    }

    result.push({
        title: title,
        city: city,
        country: country,
        premium: premium,
        image: image
    });
}

console.debug(JSON.stringify(result));

if (nextPage) {
    window.location = nextPage;
}