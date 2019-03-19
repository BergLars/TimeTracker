-- Table: timetracker.project

-- DROP TABLE timetracker.project;

CREATE TABLE timetracker_backend.project
(
    pid integer PRIMARY KEY,
    client_id integer NOT NULL,
    projectname VARCHAR(40),

 	CONSTRAINT fk_pro_cli FOREIGN KEY (client_id)
        REFERENCES timetracker_backend.client (cid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


