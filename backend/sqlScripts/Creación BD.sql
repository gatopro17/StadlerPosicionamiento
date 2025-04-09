CREATE DATABASE IF NOT EXISTS `stadler`;
USE `stadler`;
 
-- Table structure for table `rail`
DROP TABLE IF EXISTS `rail`;
CREATE TABLE `rail` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
);
 
-- Table structure for table `balizas`
DROP TABLE IF EXISTS `balizas`;
CREATE TABLE `balizas` (
  `id` int NOT NULL,
  `mayor` int NOT NULL,
  `minor` int NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rail` (`mayor`),
  CONSTRAINT `balizas_ibfk_1` FOREIGN KEY (`mayor`) REFERENCES `rail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
 
-- Table structure for table `trackerLogs`
DROP TABLE IF EXISTS `trackerLogs`;
CREATE TABLE `trackerLogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trackerId` int NOT NULL,
  `nombre` varchar(145) DEFAULT NULL,
  `mayor` int NOT NULL,
  `minor` int NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);