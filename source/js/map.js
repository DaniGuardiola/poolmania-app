(function() {
    "use strict";
    var mapElement = document.querySelector("google-map");

    var messageHandler = function(event) {
        console.log('Main script says hello.', event.data);

        // Send a reply
        event.source.postMessage({ 'reply': 'Sandbox received: ' + event.data }, event.origin);
    };

    function sendMessage(msg) {
        window.parent.sendMessage(msg, "*");
    }

    window.addEventListener('message', messageHandler);

    function init() {
        var styles = [{
            featureType: "poi",
            stylers: [
                { visibility: "off" }
            ]
        }];
        mapElement.map.setOptions({ styles: styles });
    }
    window.addEventListener('load', init);
}());