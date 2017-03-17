const address = document.getElementById("1");

function stalkButton() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        address.innerHTML = "Woops, sorry we cannot get your location because its not supported.";
    }
}

function showPosition(position) {
    address.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    console.log(position.coords.latitude,position.coords.longitude);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            address.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            address.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            address.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            address.innerHTML = "An unknown error occurred.";
            break;
    }
}