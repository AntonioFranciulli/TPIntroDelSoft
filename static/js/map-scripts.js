// Variable global hardcodeada de momento, lo ideal seria que cada uno use su propio token de mapbox localmente en su codigo
mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b25pb2ZyYW5jaXVsbGkiLCJhIjoiY2x4N3J4a2p5MHd2ajJycG1sZmU2ZWZvcSJ9.0hdKusxNrisOijQEdlLSrg';

// Variable hardcodeada temporalmente que sera generada automaticamente cuando se cargue
// la vista del mapa. Para hacerlo, se piden todos los refugios a la db y se los formatea en formato geojson.
geojson_refugios = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "description": "",
                "marker-symbol": "",
                "title": "Comedor del Movimiento Popular",
                "address": "Bonpland 1660, Palermo, Buenos Aires, 1440, Argentina"
            },
            "geometry": {
                "coordinates": [
                    -58.438025964507545,
                    -34.58350515366307
                ],
                "type": "Point"
            }
        },
        {
            "type": "Feature",
            "properties": {
                "description": "",
                "marker-symbol": "",
                "title": "Comedor Comunitario 7 Esquinas",
                "address": "Escalada 785, Villa Luro, Buenos Aires, C1407, Argentina"
            },
            "geometry": {
                "coordinates": [
                    -58.49540647994202,
                    -34.644732418557936
                ],
                "type": "Point"
            }
        },
        {
            "type": "Feature",
            "properties": {
                "description": "",
                "marker-symbol": "",
                "title": "Comedor Comunitario los Niños Primero",
                "address": "Magallanes 1505, Barracas, Buenos Aires, C1269, Argentina"
            },
            "geometry": {
                "coordinates": [
                    -58.37185223691348,
                    -34.64138565137434
                ],
                "type": "Point"
            }
        }
    ]
}

// Creo un nuevo mapa centrado en Buenos Aires.
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center:[-58.4339192, -34.6020498],
    zoom: 11
});

// Agrego menu de navegacion al mapa.
const nav = new mapboxgl.NavigationControl()
map.addControl(nav)


// Funcion que recibe un archivo geojson, toma los valores de title (nombre del lugar/refugio) 
// y address (direccion del refugio) y genera un nuevo geojson con una descripción que se mostrará 
// en los popups de los marcadores en el mapa.
function generateDescriptions(geojson) {
    var features = geojson.features;

    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        var description = "<strong>${title}</strong><map_p>${address}</map_p>";
        description = description.replace(/\${([^}]+)}/g, function(match, property) {
            return feature.properties[property];
        });
        feature.properties.description = description;
    }

    return geojson;
}

map.on('load', () => {
    map.resize()
    // Actualizo archivo geojson para que tenga descripciones
    var geojsonConDescripciones = generateDescriptions(geojson_refugios);

    // Agrego a mapa el archivo geojson.
    map.addSource('refugios', {
        'type': 'geojson',
        'data': geojsonConDescripciones       
    });

    // Agrego una capa al mapa que muestre los lugares del geojson
    map.addLayer({
        'id': 'refugios',
        'type': 'circle',
        'source': 'refugios',
        'paint': {
            'circle-color': '#4264fb',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });
});

// Creo popup base
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

// Comportamiento cuando el mouse se posiciona encima de un marker en el mapa
map.on('mouseenter', 'refugios', (e) => {
    // Cambio cursor al entrar a un popup
    map.getCanvas().style.cursor = 'pointer';

    // Guardo cordenadas y descripcion del marker que me interesa
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Me aseguro que el popup se muestre bien sin importar si zoomeo o saco zoom
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Agrego descripcion al popup y le asigno las coordenadas en el mapa.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
});

// Comportamiento cuando el mouse se deja de posicionar encima de un marker en el mapa
map.on('mouseleave', 'refugios', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
});