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

