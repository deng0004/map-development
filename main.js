
var osmMap = L.tileLayer.provider('OpenStreetMap.Mapnik');
var stamenMap = L.tileLayer.provider("Stamen.Watercolor");
var imageryMap = L.tileLayer.provider('Esri.WorldImagery');

var baseMaps = {
    OSM: osmMap,
    'Stamen Watercolor': stamenMap,
    'World Imagery': imageryMap
};

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.nazwa);
}

// adding geojson by fetch
// of course you can use jquery, axios etc.
var polandStateLayer = fetch("wojewodztwa-medium.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // use geoJSON
      var geojsonLayer = L.geoJSON(data, {
          onEachFeature: onEachFeature,
      });
    var overlayMaps = {
  'Poland': geojsonLayer,
    
};

var map = L.map('map',{
    center: [51.918904, 19.1343786],
    zoom: 5,
    layers: [osmMap]
});
    
var mapLayers = L.control.layers(baseMaps, overlayMaps).addTo(map);

var controlMeasure = L.control.polylineMeasure({
    position: 'topleft',
    measureControlTitle: 'Measure Length'
}).addTo(map);
     
    var control = L.Routing.control({
    waypoints: [
        // L.latLng(51.918904, 19.1343786),
        // L.latLng(55.97, 20.18)
    ],
    createMarker: function (i, waypoints, n) {
        var startIcon = L.icon({
            iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
          var sampahIcon = L.icon({
            iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          var destinationIcon = L.icon({
            iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
        
        if (i == 0) {
            marker_icon = startIcon
        } else if (i > 0 && i < n - 1) {
            marker_icon = sampahIcon
        } else if (i == n - 1) {
            marker_icon = destinationIcon
        }
        var marker = L.marker(waypoints.latLng, {
            draggable: true,
            bounceOnAdd: true,
            bounceOnAddOptions: {
                duration: 1000,
                height: 800,
                function() {
                    (bindPopup(myPopup).openOn(mymap))
                }
            },
            icon: marker_icon
        });
        return marker
    },
    showAlternatives: true,
    altLineOptions: {
        styles: [
            { color: 'black', opacity: 0.15, weight: 9 },
            { color: 'white', opacity: 0.8, weight: 6 },
            { color: 'blue', opacity: 0.5, weight: 2 },
        ]
    },
    geocoder: L.Control.Geocoder.nominatim()
})
    .on('routingstart', showSpinner)
    .on('routesfound routingerror', hideSpinner)
    .addTo(map);

function startHere(e) {
    control.spliceWaypoints(0, 1, e.latlng);
}

function goHere(e){
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
}

var spinner = true;
function showSpinner() {
    if (spinner) {
        document.getElementById('loader').style.display = 'block';
    }
}

function hideSpinner() {
    document.getElementById('loader').style.display = 'none';
  
}
map.on('zoomstart', function (e) { spinner = false });
map.on('zoomend', function (e) { spinner = true }); 
    
     var toggleButton = document.getElementById("toggle");
      var routingContainer = document.querySelector(
        ".leaflet-routing-container"
      );

      toggleButton.addEventListener("click", function () {
        routingContainer.classList.toggle("show");
      });

      toggleButton.addEventListener("dblclick", function () {
        routingContainer.classList.remove("show");
      });

 });
 
