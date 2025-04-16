use stadler;
CREATE TABLE trackerPositionLogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trackerId VARCHAR(50) NOT NULL,
    trackerName VARCHAR(100),
    rail INT NOT NULL,
    position INT NOT NULL,
    beaconId VARCHAR(50),
    rssi INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE couplingLogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tracker1Id VARCHAR(50) NOT NULL,
    tracker2Id VARCHAR(50) NOT NULL,
    rail INT NOT NULL,
    rssiDifference INT,
    timestampDiffMs INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE assetMountLogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assetId VARCHAR(50) NOT NULL,
    mountedOnId VARCHAR(50) NOT NULL,
    rssi INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
