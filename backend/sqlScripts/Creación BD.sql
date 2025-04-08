CREATE DATABASE IF NOT EXISTS `stadler`;
USE `stadler`;

-- 
DROP TABLE IF EXISTS `rail`;
CREATE TABLE `rail` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
);

-- 
DROP TABLE IF EXISTS `balizas`;
CREATE TABLE `balizas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mayor` int NOT NULL,
  `minor` int NOT NULL,
  `intensidad` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rail` (`mayor`),
  CONSTRAINT `balizas_ibfk_1` FOREIGN KEY (`mayor`) REFERENCES `rail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 
DROP TABLE IF EXISTS `tracker`;
CREATE TABLE `tracker` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(145) DEFAULT NULL,
  `mayor` int NOT NULL,
  `minor` int NOT NULL,
  PRIMARY KEY (`id`)
);
