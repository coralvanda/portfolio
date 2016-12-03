'use strict';

// Custom KO binding to slide the search/list panel in and out of view
ko.bindingHandlers.slideVisible = {
    update: function(element, valueAccessor) {
        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);
        var duration = 100;
        if (valueUnwrapped === true) {
            $(element).slideDown(duration);
        } else {
            $(element).slideUp(duration);
        }
    }
};


// A list of locations to add to the map
var model = {
    locations: [
        {
        	position: {lat: 47.596756, lng: -122.327037},
        	title: 'Uwajimaya Asian Supermarket',
            id: 1,
            loc: {lat: 47.596756, lng: -122.327037}
        },
        {
        	position: {lat: 47.597431, lng: -122.326550},
        	title: 'Kinokuniya Bookstore',
            id: 2,
            loc: {lat: 47.597431, lng: -122.326550}
        },
        {
        	position: {lat: 47.597078, lng: -122.327540},
        	title: 'Samurai Noodle Restaurant',
            id: 3,
            loc: {lat: 47.597078, lng: -122.327540}
        },
        {
        	position: {lat: 47.598529, lng: -122.326421},
        	title: 'International Model Toys',
            id: 4,
            loc: {lat: 47.598529, lng: -122.326421}
        },
        {
        	position: {lat: 47.596464, lng: -122.326079},
        	title: 'Daiso Japan Variety Store',
            id: 5,
            loc: {lat: 47.596464, lng: -122.326079}
        }
    ]
};


function ViewModel() {
    var self = this;

    self.placeList = ko.observableArray([]);
    self.searchTerm = ko.observable("");
    self.placeAddress = ko.observable("");
    self.showAddress = ko.observable("");

    // Import model data, transform into markers
    model.locations.forEach(function(place) {
        var marker = new google.maps.Marker(place);
        marker.setMap(map);
        marker.infoWindow = new google.maps.InfoWindow();
        marker.infoWindow.addListener('closeclick', function() {
            marker.setAnimation(null);
        });
        self.placeList.push(marker);
    });


    // Computed observable array for populating search results and markers
    self.searchResults = ko.computed(function() {
        return ko.utils.arrayFilter(self.placeList(), function(place) {
            if (place.title.toLowerCase().search(self.searchTerm().toLowerCase()) !== -1) {
                place.setVisible(true);
                place.addListener( 'click', function() {
                    return self.selectPlace(this);
                });
                return true;
            } else {
                place.setVisible(false);
                return false;
            }
        });
    });

    // Prepares timeout for AJAX request
    self.requestTimeout = setTimeout(function() {
        self.placeAddress('Request timed out');
    }, 5000);

    // KO array to determine what places a user currently has selected
    self.selectedPlaceIds = ko.observableArray([]);
    self.selectPlace = function(place) {
        // Handles removing a selection
        if (self.selectedPlaceIds().indexOf(place.id) > -1) {
            self.selectedPlaceIds.remove(place.id);
            place.setAnimation(null);
            place.infoWindow.close();
            if (self.showAddress() === place.id){
                self.showAddress("");
            }
        // Handles adding a selection
        } else {
            place.infoWindow.setContent(place.title);
            self.showAddress(place.id);
            self.selectedPlaceIds.push(place.id);
            place.setAnimation(google.maps.Animation.BOUNCE);
            place.infoWindow.open(map, place);
            map.panTo(place.getPosition());
            // Make an ajax request when place is selected and
            // display the returned info
            var latitude = place.loc.lat.toString();
            var longitude = place.loc.lng.toString();
            var dataLat = 'lat='.concat(latitude);
            var dataLng = 'lng='.concat(longitude);
            var dataUser = 'username=coralvanda';
            $.ajax({
                url: 'http://api.geonames.org/findNearestAddressJSON?',
                data: dataLat + '&' + dataLng + '&' + dataUser,
                dataType: 'json',
                cache: true,
                success: function(data, status, jqXHR) {
                    var formatedAddress = data.address.streetNumber;
                    formatedAddress += ' ' + data.address.street;
                    formatedAddress += ' ' + data.address.placename;
                    formatedAddress += ', ' + data.address.adminCode1;
                    formatedAddress += ' ' + data.address.postalcode;
                    self.placeAddress(formatedAddress);
                    clearTimeout(self.requestTimeout);
                },
                error: function(jqXHR, status, err) {
                    alert('Failed to load GeoNames data ' + status + err);
                }
            });
        }
        if (self.showAddress()) {
            $('#side-bar').height('35%');
        } else {
            $('#side-bar').height('30%');
        }
    };

    // The variable referenced by the custom binding to know when to
    // hide the search/list panel (controlled by the hamburger icon)
    self.navBar = ko.observable(true);
    self.hideSearch = function() {
        self.navBar(!self.navBar());
        if (self.navBar() === true) {
            $('#map').height('70%');
        } else {
            $('#map').height('100%');
        }
    };
}


// Create the map and place on the page
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.597516, lng: -122.326390},
      zoom: 17
    });
    ko.applyBindings(new ViewModel());
}