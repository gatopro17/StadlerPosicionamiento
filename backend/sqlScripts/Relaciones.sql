ALTER TABLE transbordadores
ADD CONSTRAINT fk_acoplado
FOREIGN KEY (acoplado)
REFERENCES transbordadores(id)
ON UPDATE CASCADE
ON DELETE CASCADE;
 
 
ALTER TABLE transbordadores
ADD CONSTRAINT fk_tracker
FOREIGN KEY (tracker)
REFERENCES trackers(id)
ON UPDATE CASCADE
ON DELETE CASCADE;
 
 
ALTER TABLE transbordadores
ADD CONSTRAINT fk_via_transbordadores
FOREIGN KEY (via)
REFERENCES vias(id)
ON UPDATE CASCADE
ON DELETE CASCADE;
 
 
ALTER TABLE balizas
ADD CONSTRAINT fk_via_balizas
FOREIGN KEY (via)
REFERENCES vias(id)
ON UPDATE CASCADE
ON DELETE CASCADE;