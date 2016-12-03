var url = "http://maps.googleapis.com/maps/api/js?key=" +
    "PLACE_GOOGLE_MAP_API_KEY_HERE&" +
    "libraries=places&callback=initMap";

$.getScript(url)
    .fail(function() {
    	alert("Google Maps failed to load");
});