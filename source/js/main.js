(function() {
    "use strict";
    var list = document.querySelector("#club-list");
    var mapListButton = document.querySelector("#map-list-button");

    var dataPromise;

    function getData() {
        if (!dataPromise) {
            dataPromise = new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "data/data.json", true);
                xhr.addEventListener("load", function(result) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(result.target.response));
                    } else {
                        reject(result);
                    }
                });
                xhr.send();
            });
        }
        return dataPromise;
    }

    function loadClubList(data) {
        for (var i = data.length - 1; i >= 0; i--) {
            var card = document.createElement("paper-card");
            card.classList.add("club-list-item");

            var content = document.createElement("div");
            content.classList.add("content");
            card.appendChild(content);

            var imageWrapper = document.createElement("div");
            imageWrapper.classList.add("image-wrapper");
            card.appendChild(imageWrapper);

            var image = document.createElement("img");
            image.classList.add("image");
            image.src = data[i].image;
            imageWrapper.appendChild(image);

            var cardContent = document.createElement("div");
            cardContent.classList.add("card-content");
            content.appendChild(cardContent);

            var title = document.createElement("div");
            title.classList.add("title");
            title.textContent = data[i].title;
            var city = document.createElement("div");
            city.classList.add("city");
            city.textContent = data[i].city;
            var country = document.createElement("div");
            country.classList.add("country");
            country.textContent = data[i].country;
            cardContent.appendChild(title);
            cardContent.appendChild(city);
            cardContent.appendChild(country);

            list.appendChild(card);
        }
    }

    /* MAP */
    function initMap() {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            scrollwheel: false,
            zoom: 8
        });
    }

    window.initMap = initMap;

    var mode = "map";

    function mapListButtonListener() {
        if (mode === "map") {
            mapListButton.icon = "view-list";
            mode = "list";
            document.body.classList.add("list-mode");
            document.body.classList.remove("map-mode");
        } else {
            mapListButton.icon = "maps:map";
            mode = "map";
            document.body.classList.add("map-mode");
            document.body.classList.remove("list-mode");
        }
    }

    function addMapListButtonListener() {
        mapListButton.addEventListener("click", mapListButtonListener);
    }

    function init() {
        addMapListButtonListener();
        getData().then(function(data) {
            loadClubList(data);
        });
    }

    window.addEventListener("load", init);
}());