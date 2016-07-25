/* global google */
(function() {
    "use strict";
    var mapElement = document.querySelector("google-map");

    function messageHandler(event) {
        var data = event.data;
        if (data.type === "mapData") {
            refreshMarkers(data.result);
        }
    }

    function sendMessage(msg) {
        window.top.postMessage(msg, "*");
    }

    window.addEventListener('message', messageHandler);

    function getBounds() {
        var bounds = mapElement.map.getBounds();
        return {
            topRight: {
                lat: bounds.getNorthEast().lat(),
                lng: bounds.getNorthEast().lng()
            },
            bottomLeft: {
                lat: bounds.getSouthWest().lat(),
                lng: bounds.getSouthWest().lng()
            }
        };
    }

    function getData() {
        sendMessage({
            type: "mapDataRequest",
            bounds: getBounds()
        });
    }

    function refreshMarkers(data) {
        data = data.features;
        var marker, options, i, thisData;
        mapElement.map.markers = mapElement.map.markers || [];
        for (i = 0; i < data.length; i++) {
            thisData = data[i];

            if (thisData.properties.lat === null) {
                continue;
            }

            options = {
                position: {
                    lat: +thisData.properties.lat,
                    lng: +thisData.properties.long
                },
                map: mapElement.map,
                title: thisData.properties.nombre
            };

            marker = new google.maps.Marker(options);
            mapElement.map.markers.push(marker);
        }
    }

    function init() {
        var styles = [{
            featureType: "poi",
            stylers: [
                { visibility: "off" }
            ]
        }];
        mapElement.map.setOptions({ styles: styles });
        sendMessage(getBounds());
        getData();
    }
    window.addEventListener('load', init);
}());