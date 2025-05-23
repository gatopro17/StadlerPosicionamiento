INSERT INTO Trackers (id, nombre, tracker_id, tipo) VALUES
('TTRA1', 'Tracker transbordador TRA1', NULL, 'Transbordador'),
('TTRA2', 'Tracker transbordador TRA2', NULL, 'Transbordador'),
('TTRA3', 'Tracker transbordador TRA3', NULL, 'Transbordador'),
('TTRC1', 'Tracker transbordador Acoplado TRC1', NULL, 'Transbordador'),
('TA1', 'Tracker activo A1', NULL, 'Activo'),
('TA2', 'Tracker activo A2', NULL, 'Activo'),
('TA3', 'Tracker activo A3', NULL, 'Activo'),
('TVTRA1', 'Tracker vía TRA1', NULL, 'Vía'),
('TVTRA2', 'Tracker vía TRA2', NULL, 'Vía'),
('TVTRA3', 'Tracker vía TRA3', NULL, 'Vía'),
('TVTRC1', 'Tracker vía TRC1', NULL, 'Vía');

INSERT INTO Vias (id) VALUES
('C1'), ('C2'), ('C3'), ('C4'), ('C5'), ('C6'),
('C7'), ('C8'), ('C9'), ('C10'), ('C11'), ('C12'),
('C13'), ('C14'),
('CO1'), ('CO2'), ('CO3'), ('CO4'), ('CO5'),
('E1L'), ('E1C'), ('E2C'), ('E2L');

INSERT INTO Activos (id, nombre) VALUES
('A1', 'Activo A1'),
('A2', 'Activo A2'),
('A3', 'Activo A3');

INSERT INTO Polygons (id, type, coordinates) VALUES
('1', 'posible', NULL),
('2', 'no posible', NULL),
('3', 'exterior', NULL);

INSERT INTO Rails (id, coordinates) VALUES
('1', NULL);

INSERT INTO Agujas (id, nombre, via_origen, destinoA, destinoB, estado) VALUES
('AG1', 'AE1-C5-C9/C12', 'E1', 'C5', 'C9/C12', NULL),
('AG2', 'AC9/C12-C9-C10/C12', 'C9', 'C10', 'C12', NULL),
('AG3', 'AC10/C12-C10_C11/C12', 'C10/C12', 'C11', 'C12', 'A'),
('AG4', 'AC11/C12-C11-C12', 'C11/C12', 'C11', 'C12', 'A'),
('AG5', 'AE2-C13-C14', 'E2', 'C13', 'C14', 'A');


INSERT INTO CouplingLogs (id, tracker1Id, tracker2Id, rails, rssiDifference, timestampDiffMs, created) VALUES
('1', 'TRA1', 'TRA3', NULL, -68, NULL, '2025-04-24 16:31:00');

INSERT INTO TrackerPositionLogs (id, trackerId, trackerName, rails, position, beaconId, rssi, created) VALUES
('1', 'TR3', 'Transbordador 3', NULL, NULL, 'beacon-4', NULL, '2025-04-22 16:53:00');

INSERT INTO transbordadores (id, nombre, acoplado, tracker, tipo, parado, via1, via2, baliza)*** VALUES
('TRA1', 'Transbordador autonomo 1', NULL, 'TTRA1', 'Autonomo', TRUE, NULL),
('TRA2', 'Transbordador autonomo 2', NULL, 'TTRA2', 'Autonomo', TRUE, NULL),
('TRA3', 'Transbordador autonomo 3', NULL, 'TTRA3', 'Autonomo', TRUE, NULL),
('TRC1', 'Transbordador acoplado 1', 'TRC1', 'TTRC1', 'Acoplado', TRUE, NULL);

INSERT INTO Balizas (id, nombre, BalizaID, Tipo, Via, Mayor) VALUES 
('C1_01', 'Balizas Commisioning Via1 Pos1', NULL, 'Via', 'C1', NULL),
('C1_02', 'Balizas Commisioning Via1 Pos2', NULL, 'Via', 'C1', NULL),
('C1_03', 'Balizas Commisioning Via1 Pos3', NULL, 'Via', 'C1', NULL),
('C1_04', 'Balizas Commisioning Via1 Pos4', NULL, 'Via', 'C1', NULL),
('C1_05', 'Balizas Commisioning Via1 Pos5', NULL, 'Via', 'C1', NULL),
('C1_06', 'Balizas Commisioning Via1 Pos6', NULL, 'Via', 'C1', NULL),
('C1_07', 'Balizas Commisioning Via1 Pos7', NULL, 'Via', 'C1', NULL),
('C1_08', 'Balizas Commisioning Via1 Pos8', NULL, 'Via', 'C1', NULL),
('C2_01', 'Balizas Commisioning Via2 Pos1', NULL, 'Via', 'C2', NULL),
('C2_02', 'Balizas Commisioning Via2 Pos2', NULL, 'Via', 'C2', NULL),
('C2_03', 'Balizas Commisioning Via2 Pos3', NULL, 'Via', 'C2', NULL),
('C2_04', 'Balizas Commisioning Via2 Pos4', NULL, 'Via', 'C2', NULL),
('C2_05', 'Balizas Commisioning Via2 Pos5', NULL, 'Via', 'C2', NULL),
('C2_06', 'Balizas Commisioning Via2 Pos6', NULL, 'Via', 'C2', NULL),
('C2_07', 'Balizas Commisioning Via2 Pos7', NULL, 'Via', 'C2', NULL),
('C2_08', 'Balizas Commisioning Via2 Pos8', NULL, 'Via', 'C2', NULL),
('C3_01', 'Balizas Commisioning Via3 Pos1', NULL, 'Via', 'C3', NULL),
('C3_02', 'Balizas Commisioning Via3 Pos2', NULL, 'Via', 'C3', NULL),
('C3_03', 'Balizas Commisioning Via3 Pos3', NULL, 'Via', 'C3', NULL),
('C3_04', 'Balizas Commisioning Via3 Pos4', NULL, 'Via', 'C3', NULL),
('C3_05', 'Balizas Commisioning Via3 Pos5', NULL, 'Via', 'C3', NULL),
('C3_06', 'Balizas Commisioning Via3 Pos6', NULL, 'Via', 'C3', NULL),
('C3_07', 'Balizas Commisioning Via3 Pos7', NULL, 'Via', 'C3', NULL),
('C3_08', 'Balizas Commisioning Via3 Pos8', NULL, 'Via', 'C3', NULL),
('C4_01', 'Balizas Commisioning Via4 Pos1', NULL, 'Via', 'C4', NULL),
('C4_02', 'Balizas Commisioning Via4 Pos2', NULL, 'Via', 'C4', NULL),
('C4_03', 'Balizas Commisioning Via4 Pos3', NULL, 'Via', 'C4', NULL),
('C4_04', 'Balizas Commisioning Via4 Pos4', NULL, 'Via', 'C4', NULL),
('C4_05', 'Balizas Commisioning Via4 Pos5', NULL, 'Via', 'C4', NULL),
('C4_06', 'Balizas Commisioning Via4 Pos6', NULL, 'Via', 'C4', NULL),
('C4_07', 'Balizas Commisioning Via4 Pos7', NULL, 'Via', 'C4', NULL),
('C4_08', 'Balizas Commisioning Via4 Pos8', NULL, 'Via', 'C4', NULL),
('C5_01', 'Balizas Commisioning Via4 Pos1', NULL, 'Via', 'C5', NULL),
('C5_02', 'Balizas Commisioning Via5 Pos2', NULL, 'Via', 'C5', NULL),
('C5_03', 'Balizas Commisioning Via5 Pos3', NULL, 'Via', 'C5', NULL),
('C5_04', 'Balizas Commisioning Via5 Pos4', NULL, 'Via', 'C5', NULL),
('C5_05', 'Balizas Commisioning Via5 Pos5', NULL, 'Via', 'C5', NULL),
('C5_06', 'Balizas Commisioning Via5 Pos6', NULL, 'Via', 'C5', NULL),
('C5_07', 'Balizas Commisioning Via5 Pos7', NULL, 'Via', 'C5', NULL),
('C5_08', 'Balizas Commisioning Via5 Pos8', NULL, 'Via', 'C5', NULL),
('C6_01', 'Balizas Commisioning Via6 Pos1', NULL, 'Via', 'C6', NULL),
('C6_02', 'Balizas Commisioning Via6 Pos2', NULL, 'Via', 'C6', NULL),
('C6_03', 'Balizas Commisioning Via6 Pos3', NULL, 'Via', 'C6', NULL),
('C6_04', 'Balizas Commisioning Via6 Pos4', NULL, 'Via', 'C6', NULL),
('C6_05', 'Balizas Commisioning Via6 Pos5', NULL, 'Via', 'C6', NULL),
('C6_06', 'Balizas Commisioning Via6 Pos6', NULL, 'Via', 'C6', NULL),
('C6_07', 'Balizas Commisioning Via6 Pos7', NULL, 'Via', 'C6', NULL),
('C6_08', 'Balizas Commisioning Via6 Pos8', NULL, 'Via', 'C6', NULL),
('C7_01', 'Balizas Commisioning Via7 Pos1', NULL, 'Via', 'C7', NULL),
('C7_02', 'Balizas Commisioning Via7 Pos2', NULL, 'Via', 'C7', NULL),
('C7_03', 'Balizas Commisioning Via7 Pos3', NULL, 'Via', 'C7', NULL),
('C7_04', 'Balizas Commisioning Via7 Pos4', NULL, 'Via', 'C7', NULL),
('C7_05', 'Balizas Commisioning Via7 Pos5', NULL, 'Via', 'C7', NULL),
('C7_06', 'Balizas Commisioning Via7 Pos6', NULL, 'Via', 'C7', NULL),
('C7_07', 'Balizas Commisioning Via7 Pos7', NULL, 'Via', 'C7', NULL),
('C7_08', 'Balizas Commisioning Via7 Pos8', NULL, 'Via', 'C7', NULL),
('C8_01', 'Balizas Commisioning Via8 Pos1', NULL, 'Via', 'C8', NULL),
('C8_02', 'Balizas Commisioning Via8 Pos2', NULL, 'Via', 'C8', NULL),
('C8_03', 'Balizas Commisioning Via8 Pos3', NULL, 'Via', 'C8', NULL),
('C8_04', 'Balizas Commisioning Via8 Pos4', NULL, 'Via', 'C8', NULL),
('C8_05', 'Balizas Commisioning Via8 Pos5', NULL, 'Via', 'C8', NULL),
('C8_06', 'Balizas Commisioning Via8 Pos6', NULL, 'Via', 'C8', NULL),
('C8_07', 'Balizas Commisioning Via8 Pos7', NULL, 'Via', 'C8', NULL),
('C8_08', 'Balizas Commisioning Via8 Pos8', NULL, 'Via', 'C8', NULL),
('C9_01', 'Balizas Commisioning Via9 Pos1', NULL, 'Via', 'C9', NULL),
('C9_02', 'Balizas Commisioning Via9 Pos2', NULL, 'Via', 'C9', NULL),
('C9_03', 'Balizas Commisioning Via9 Pos3', NULL, 'Via', 'C9', NULL),
('C9_04', 'Balizas Commisioning Via9 Pos4', NULL, 'Via', 'C9', NULL),
('C9_05', 'Balizas Commisioning Via9 Pos5', NULL, 'Via', 'C9', NULL),
('C9_06', 'Balizas Commisioning Via9 Pos6', NULL, 'Via', 'C9', NULL),
('C9_07', 'Balizas Commisioning Via9 Pos7', NULL, 'Via', 'C9', NULL),
('C9_08', 'Balizas Commisioning Via9 Pos8', NULL, 'Via', 'C9', NULL),
('C10_01', 'Balizas Commisioning Via10 Pos1', NULL, 'Via', 'C10', NULL),
('C10_02', 'Balizas Commisioning Via10 Pos2', NULL, 'Via', 'C10', NULL),
('C10_03', 'Balizas Commisioning Via10 Pos3', NULL, 'Via', 'C10', NULL),
('C10_04', 'Balizas Commisioning Via10 Pos4', NULL, 'Via', 'C10', NULL),
('C10_05', 'Balizas Commisioning Via10 Pos5', NULL, 'Via', 'C10', NULL),
('C10_06', 'Balizas Commisioning Via10 Pos6', NULL, 'Via', 'C10', NULL),
('C10_07', 'Balizas Commisioning Via10 Pos7', NULL, 'Via', 'C10', NULL),
('C10_08', 'Balizas Commisioning Via10 Pos8', NULL, 'Via', 'C10', NULL),
('C11_01', 'Balizas Commisioning Via11 Pos1', NULL, 'Via', 'C11', NULL),
('C11_02', 'Balizas Commisioning Via11 Pos2', NULL, 'Via', 'C11', NULL),
('C11_03', 'Balizas Commisioning Via11 Pos3', NULL, 'Via', 'C11', NULL),
('C11_04', 'Balizas Commisioning Via11 Pos4', NULL, 'Via', 'C11', NULL),
('C11_05', 'Balizas Commisioning Via11 Pos5', NULL, 'Via', 'C11', NULL),
('C11_06', 'Balizas Commisioning Via11 Pos6', NULL, 'Via', 'C11', NULL),
('C11_07', 'Balizas Commisioning Via11 Pos7', NULL, 'Via', 'C11', NULL),
('C11_08', 'Balizas Commisioning Via11 Pos8', NULL, 'Via', 'C11', NULL),
('C12_01', 'Balizas Commisioning Via12 Pos1', NULL, 'Via', 'C12', NULL),
('C12_02', 'Balizas Commisioning Via12 Pos2', NULL, 'Via', 'C12', NULL),
('C12_03', 'Balizas Commisioning Via12 Pos3', NULL, 'Via', 'C12', NULL),
('C12_04', 'Balizas Commisioning Via12 Pos4', NULL, 'Via', 'C12', NULL),
('C12_05', 'Balizas Commisioning Via12 Pos5', NULL, 'Via', 'C12', NULL),
('C12_06', 'Balizas Commisioning Via12 Pos6', NULL, 'Via', 'C12', NULL),
('C12_07', 'Balizas Commisioning Via12 Pos7', NULL, 'Via', 'C12', NULL),
('C12_08', 'Balizas Commisioning Via12 Pos8', NULL, 'Via', 'C12', NULL),
('C13_01', 'Balizas Commisioning Via13 Pos1', NULL, 'Via', 'C13', NULL),
('C13_02', 'Balizas Commisioning Via13 Pos2', NULL, 'Via', 'C13', NULL),
('C13_03', 'Balizas Commisioning Via13 Pos3', NULL, 'Via', 'C13', NULL),
('C13_04', 'Balizas Commisioning Via13 Pos4', NULL, 'Via', 'C13', NULL),
('C13_05', 'Balizas Commisioning Via13 Pos5', NULL, 'Via', 'C13', NULL),
('C13_06', 'Balizas Commisioning Via13 Pos6', NULL, 'Via', 'C13', NULL),
('C13_07', 'Balizas Commisioning Via13 Pos7', NULL, 'Via', 'C13', NULL),
('C13_08', 'Balizas Commisioning Via13 Pos8', NULL, 'Via', 'C13', NULL),
('C14_01', 'Balizas Commisioning Via14 Pos1', NULL, 'Via', 'C14', NULL),
('C14_02', 'Balizas Commisioning Via14 Pos2', NULL, 'Via', 'C14', NULL),
('C14_03', 'Balizas Commisioning Via14 Pos3', NULL, 'Via', 'C14', NULL),
('C14_04', 'Balizas Commisioning Via14 Pos4', NULL, 'Via', 'C14', NULL),
('C14_05', 'Balizas Commisioning Via14 Pos5', NULL, 'Via', 'C14', NULL),
('C14_06', 'Balizas Commisioning Via14 Pos6', NULL, 'Via', 'C14', NULL),
('C14_07', 'Balizas Commisioning Via14 Pos7', NULL, 'Via', 'C14', NULL),
('C14_08', 'Balizas Commisioning Via14 Pos8', NULL, 'Via', 'C14', NULL),
('E1C_01', 'Balizas Commisioning E1 Corta Pos1', NULL, 'Via', 'E1C', NULL),
('E1C_02', 'Balizas Commisioning E1 Corta Pos2', NULL, 'Via', 'E1C', NULL),
('E1C_03', 'Balizas Commisioning E1 Corta Pos3', NULL, 'Via', 'E1C', NULL),
('E1C_04', 'Balizas Commisioning E1 Corta Pos4', NULL, 'Via', 'E1C', NULL),
('E1L_01', 'Balizas Commisioning E1 LargaPos1', NULL, 'Via', 'E1L', NULL),
('E1L_02', 'Balizas Commisioning E1 LargaPos2', NULL, 'Via', 'E1L', NULL),
('E1L_03', 'Balizas Commisioning E1 LargaPos3', NULL, 'Via', 'E1L', NULL),
('E1L_04', 'Balizas Commisioning E1 LargaPos4', NULL, 'Via', 'E1L', NULL),
('E2C_01', 'Balizas Commisioning E2 Corta Pos1', NULL, 'Via', 'E2C', NULL),
('E2C_02', 'Balizas Commisioning E2 Corta Pos2', NULL, 'Via', 'E2C', NULL),
('E2C_03', 'Balizas Commisioning E2 Corta Pos3', NULL, 'Via', 'E2C', NULL),
('E2C_04', 'Balizas Commisioning E2 Corta Pos4', NULL, 'Via', 'E2C', NULL),
('E2C_05', 'Balizas Commisioning E2 Corta Pos5', NULL, 'Via', 'E2C', NULL),
('E2C_06', 'Balizas Commisioning E2 Corta Pos6', NULL, 'Via', 'E2C', NULL),
('E2L_01', 'Balizas Commisioning E2 Corta Pos1', NULL, 'Via', 'E2L', NULL),
('E2L_02', 'Balizas Commisioning E2 Corta Pos2', NULL, 'Via', 'E2L', NULL),
('E2L_03', 'Balizas Commisioning E2 Corta Pos3', NULL, 'Via', 'E2L', NULL),
('E2L_04', 'Balizas Commisioning E2 Corta Pos4', NULL, 'Via', 'E2L', NULL),
('E2L_05', 'Balizas Commisioning E2 Corta Pos5', NULL, 'Via', 'E2L', NULL),
('E2L_06', 'Balizas Commisioning E2 Corta Pos6', NULL, 'Via', 'E2L', NULL),
('E2L_07', 'Balizas Commisioning E2 Corta Pos7', NULL, 'Via', 'E2L', NULL),
('E2L_08', 'Balizas Commisioning E2 Corta Pos8', NULL, 'Via', 'E2L', NULL),
('TRA1_01', 'Baliza Transbordador TRA1 Pos1', NULL, 'Transbordador', 'TRA1', NULL),
('TRA1_02', 'Baliza Transbordador TRA1 Pos2', NULL, 'Transbordador', 'TRA1', NULL),
('TRA1_03', 'Baliza Transbordador TRA1 Pos3', NULL, 'Transbordador', 'TRA1', NULL),
('TRA1_04', 'Baliza Transbordador TRA1 Pos4', NULL, 'Transbordador', 'TRA1', NULL),
('TRA1_05', 'Baliza Transbordador TRA1 Pos5', NULL, 'Transbordador', 'TRA1', NULL),
('TRA1_06', 'Baliza Transbordador TRA1 Pos6', NULL, 'Transbordador', 'TRA1', NULL),
('TRA1_07', 'Baliza Transbordador TRA1 Pos7', NULL, 'Transbordador', 'TRA1', NULL),
('TRA1_08', 'Baliza Transbordador TRA1 Pos8', NULL, 'Transbordador', 'TRA1', NULL),
('TRA2_01', 'Baliza Transbordador TRA2 Pos1', NULL, 'Transbordador', 'TRA2', NULL),
('TRA2_02', 'Baliza Transbordador TRA2 Pos2', NULL, 'Transbordador', 'TRA2', NULL),
('TRA2_03', 'Baliza Transbordador TRA2 Pos3', NULL, 'Transbordador', 'TRA2', NULL),
('TRA2_04', 'Baliza Transbordador TRA2 Pos4', NULL, 'Transbordador', 'TRA2', NULL),
('TRA2_05', 'Baliza Transbordador TRA2 Pos5', NULL, 'Transbordador', 'TRA2', NULL),
('TRA2_06', 'Baliza Transbordador TRA2 Pos6', NULL, 'Transbordador', 'TRA2', NULL),
('TRA2_07', 'Baliza Transbordador TRA2 Pos7', NULL, 'Transbordador', 'TRA2', NULL),
('TRA2_08', 'Baliza Transbordador TRA2 Pos8', NULL, 'Transbordador', 'TRA2', NULL),
('TRA3_01', 'Baliza Transbordador TRA3 Pos1', NULL, 'Transbordador', 'TRA3', NULL),
('TRA3_02', 'Baliza Transbordador TRA3 Pos2', NULL, 'Transbordador', 'TRA3', NULL),
('TRA3_03', 'Baliza Transbordador TRA3 Pos3', NULL, 'Transbordador', 'TRA3', NULL),
('TRA3_04', 'Baliza Transbordador TRA3 Pos4', NULL, 'Transbordador', 'TRA3', NULL),
('TRA3_05', 'Baliza Transbordador TRA3 Pos5', NULL, 'Transbordador', 'TRA3', NULL),
('TRA3_06', 'Baliza Transbordador TRA3 Pos6', NULL, 'Transbordador', 'TRA3', NULL),
('TRA3_07', 'Baliza Transbordador TRA3 Pos7', NULL, 'Transbordador', 'TRA3', NULL),
('TRA3_08', 'Baliza Transbordador TRA3 Pos8', NULL, 'Transbordador', 'TRA3', NULL),
('TRC1_01', 'Baliza Transbordador TRC1', NULL, 'Transbordador', 'TRC1', NULL),
('CO1_01', 'Baliza Via CO1 Pos1', NULL, 'Via', 'CO1', NULL),
('CO1_02', 'Baliza Via CO1 Pos2', NULL, 'Via', 'CO1', NULL),
('CO1_03', 'Baliza Via CO1 Pos3', NULL, 'Via', 'CO1', NULL),
('CO1_04', 'Baliza Via CO1 Pos4', NULL, 'Via', 'CO1', NULL),
('CO2_01', 'Baliza Via CO2 Pos1', NULL, 'Via', 'CO2', NULL),
('CO2_02', 'Baliza Via CO2 Pos2', NULL, 'Via', 'CO2', NULL),
('CO2_03', 'Baliza Via CO2 Pos3', NULL, 'Via', 'CO2', NULL),
('CO2_04', 'Baliza Via CO2 Pos4', NULL, 'Via', 'CO2', NULL),
('CO3_01', 'Baliza Via CO3 Pos1', NULL, 'Via', 'CO3', NULL),
('CO3_02', 'Baliza Via CO3 Pos2', NULL, 'Via', 'CO3', NULL),
('CO3_03', 'Baliza Via CO3 Pos3', NULL, 'Via', 'CO3', NULL),
('CO3_04', 'Baliza Via CO3 Pos4', NULL, 'Via', 'CO3', NULL),
('CO4_01', 'Baliza Via CO4 Pos1', NULL, 'Via', 'CO4', NULL),
('CO4_02', 'Baliza Via CO4 Pos2', NULL, 'Via', 'CO4', NULL),
('CO4_03', 'Baliza Via CO4 Pos3', NULL, 'Via', 'CO4', NULL),
('CO4_04', 'Baliza Via CO4 Pos4', NULL, 'Via', 'CO4', NULL),
('C1C1', 'Baliza Cabecera C1 Pos1', NULL, 'Cabecera', 'C1', NULL),
('C1C2', 'Baliza Cabecera C1 Pos2', NULL, 'Cabecera', 'C1', NULL),
('C2C1', 'Baliza Cabecera C2 Pos1', NULL, 'Cabecera', 'C2', NULL),
('C2C2', 'Baliza Cabecera C2 Pos2', NULL, 'Cabecera', 'C2', NULL),
('C3C1', 'Baliza Cabecera C3 Pos1', NULL, 'Cabecera', 'C3', NULL),
('C3C2', 'Baliza Cabecera C3 Pos2', NULL, 'Cabecera', 'C3', NULL),
('C4C1', 'Baliza Cabecera C4 Pos1', NULL, 'Cabecera', 'C4', NULL),
('C4C2', 'Baliza Cabecera C4 Pos2', NULL, 'Cabecera', 'C4', NULL),
('C5C1', 'Baliza Cabecera C5 Pos1', NULL, 'Cabecera', 'C5', NULL),
('C5C2', 'Baliza Cabecera C5 Pos2', NULL, 'Cabecera', 'C5', NULL),
('C6C1', 'Baliza Cabecera C6 Pos1', NULL, 'Cabecera', 'C6', NULL),
('C6C2', 'Baliza Cabecera C6 Pos2', NULL, 'Cabecera', 'C6', NULL),
('C7C1', 'Baliza Cabecera C7 Pos1', NULL, 'Cabecera', 'C7', NULL),
('C7C2', 'Baliza Cabecera C7 Pos2', NULL, 'Cabecera', 'C7', NULL);
