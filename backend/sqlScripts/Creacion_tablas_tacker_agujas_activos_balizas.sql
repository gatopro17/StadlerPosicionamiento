USE stadler;

-- Tabla de trackers en transbordadores
CREATE TABLE IF NOT EXISTS trackerTransbordador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('grande', 'pequeño') NOT NULL
);

-- Tabla de balizas en transbordadores
CREATE TABLE IF NOT EXISTS balizasTransbordador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    posicion INT NOT NULL,
    trackerId INT,
    FOREIGN KEY (trackerId) REFERENCES trackerTransbordador(id)
);

-- Tabla de trackers de activos
CREATE TABLE IF NOT EXISTS trackerActivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de balizas en cabeceras, asociadas a rail
CREATE TABLE IF NOT EXISTS balizasCabeceras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    railId INT NOT NULL,
    FOREIGN KEY (railId) REFERENCES rail(id)
);

-- Tabla de agujas
CREATE TABLE IF NOT EXISTS agujas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL UNIQUE, -- posición física de la aguja
    nombre VARCHAR(100) NOT NULL,
    via_origen INT NOT NULL,
    destino_a INT NOT NULL,
    destino_b INT NOT NULL,
    estado ENUM('A', 'B') NOT NULL -- A habilita destino_a, B habilita destino_b
);
