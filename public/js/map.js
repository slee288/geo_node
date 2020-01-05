mapboxgl.accessToken = 'pk.eyJ1Ijoic2xlZTI4OCIsImEiOiJjazUwbGptbHkwZmRnM2ZxcWlhbngxMGowIn0.erRAE-IPeH1eAGDRZPIiEQ';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom: 9,
center: [-71.157895, 42.707741]
});


// Fetch Locations from API
async function getLocations() {
    const res = await fetch("/api/v1/stores");
    const data = await res.json();

    const locations = data.data.map(loc => {
        return {
            type: "Feature",
            geometry: {
                type: 'Point',
                coordinates: [loc.location.coordinates[0], loc.location.coordinates[1]]
            },
            properties: {
                storeId: loc.stordId,
                icon: 'shop'
            }
        }
    });

    loadMap(locations);
}

// Load Map with Locations
function loadMap(locations) {
    map.on("load", function() {
        map.addLayer({
            id: "points",
            type: "symbol",
            source: {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: locations
                }
            },
            layout: {
                'icon-image': "{icon}-15",
                'icon-size': 1.5,
                'text-field': "{storeId}",
                'text-font': ["Open Sans Semibold", "Arial Unicode MS Bold"],
                'text-offset': [0, 0.9],
                'text-anchor': "top"
            }
        });
    });
}

getLocations();
