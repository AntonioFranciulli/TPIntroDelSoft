document.getElementById('formularioRefugio').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

    var formData = new FormData(this); // Crea un objeto FormData con los datos del formulario
    var json = Object.fromEntries(formData.entries()); // Convierte los datos del formulario a un objeto JSON

    fetch('http://127.0.0.1:5050/crear_refugio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
});
