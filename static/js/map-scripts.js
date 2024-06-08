mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b25pb2ZyYW5jaXVsbGkiLCJhIjoiY2x4Mjh6cnBjMDU3bTJtcTQ3MHF6MHd1NSJ9.Y0mKINbt5hFNcSeizlZ-MA';

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
    zoom: 12
});

// Agrego menu de navegacion al mapa.
const nav = new mapboxgl.NavigationControl()
map.addControl(nav)


// Funcion que recibe un archivo geojson, toma los valores de title (nombre del lugar/refugio) 
// y address (direccion del refugio) y genera un nuevo geojson con una descripción que se mostrará 
// en los popups de los marcadores en el mapa.
generateDescriptions(geojson) {
    var features = geojson.features;

    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        var description = "<strong>${title}</strong><p>${address}</p>";
        description = description.replace(/\${([^}]+)}/g, function(match, property) {
            return feature.properties[property];
        });
        feature.properties.description = description;
    }

    return geojson;
}