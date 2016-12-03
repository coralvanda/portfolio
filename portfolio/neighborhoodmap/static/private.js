'use strict';

var url = 'http://maps.googleapis.com/maps/api/js?key=' +
   'AIzaSyDxMb6gac2Ngptki37kKH4kajRvAqGjm-Y&' +
    'libraries=places&callback=initMap';

$.getScript(url)
    .fail(function() {
    	alert('Google Maps failed to load');
});