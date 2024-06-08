CREATE TABLE IF NOT EXISTS refugios (
    id_refugio INT ,
    direccion VARCHAR(30),
    descripcion VARCHAR(100),
    tipo_refugio VARCHAR(50),
    telefono VARCHAR(15),
    link_foto VARCHAR(200),
    lista_voluntarios VARCHAR(1000),
    PRIMARY KEY(id_refugio)

);

CREATE TABLE if not EXISTS voluntarios (
cuil_voluntario_voluntario INT,
puesto VARCHAR(30),
telefono VARCHAR(15),
Nombre VARCHAR(50),
id_refugio INT,
PRIMARY KEY (cuil_voluntario),
FOREIGN KEY (id_refugio_refugio) REFERENCES refugios(id_refugio)
);




