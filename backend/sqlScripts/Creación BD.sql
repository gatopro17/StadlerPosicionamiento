CREATE TABLE `stadler`.`transbordadores` (
  `id` VARCHAR(4) NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `acoplado` VARCHAR(4) NULL,
  `tracker` VARCHAR(5) NULL,
  `tipo` VARCHAR(20) NULL,
  `via` VARCHAR(3) NULL,
  `parado` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `stadler`.`balizas` (
  `id` VARCHAR(10) NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `balizaid` VARCHAR(10) NULL,
  `tipo` VARCHAR(20) NULL,
  `via` VARCHAR(3) NULL,
  `mayor` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE stadler.trackers (
   id VARCHAR(10) PRIMARY KEY,
   nombre VARCHAR(100),
   tracker_id VARCHAR(10),
   tipo VARCHAR(50)
);

CREATE TABLE stadler.activos (
id VARCHAR(20) PRIMARY KEY,
   nombre VARCHAR(100)
);



CREATE TABLE stadler.polygons (
   id VARCHAR(50) PRIMARY KEY,
   type VARCHAR(50),
   coordinates TEXT
);

CREATE TABLE stadler.vias (
   id VARCHAR(10) PRIMARY KEY
);

CREATE TABLE stadler.rails (
   id INT PRIMARY KEY,
   coordinates TEXT
);


CREATE TABLE stadler.agujas (
   id VARCHAR(10) PRIMARY KEY,
   nombre VARCHAR(100),
   via_origen VARCHAR(100),
   destinoA VARCHAR(50),
   destinoB VARCHAR(50),
   estado VARCHAR(1)
);

CREATE TABLE stadler.assetMountLogs (
   id VARCHAR(50) PRIMARY KEY,
   asset VARCHAR(50),
   mountedOn VARCHAR(50),
   rssi INT,
   created TIMESTAMP
);

CREATE TABLE stadler.couplingLogs (
   id VARCHAR(50) PRIMARY KEY,
   tracker1Id VARCHAR(50),
   tracker2Id VARCHAR(50),
   rails VARCHAR(50),
   rssiDifference INT,
   timestampDiffMs INT,
   created TIMESTAMP
);

CREATE TABLE stadler.trackerPositionlogs (
   id VARCHAR(50) PRIMARY KEY,
   trackerId VARCHAR(50),
   trackerName VARCHAR(100),
   rails VARCHAR(50),
   position VARCHAR(100),
   beaconId VARCHAR(50),
   rssi INT,
   created TIMESTAMP
);