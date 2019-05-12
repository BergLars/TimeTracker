-- Table: timetracker.timeentry
-- DROP TABLE timetracker.timeentry;

CREATE TABLE timetracker_backend.timeentry
(
    tid integer PRIMARY KEY,
    userprofile_id integer NOT NULL,
    project_id integer NOT NULL,
    description varchar(40) NOT NULL,
    entrydate date NOT NULL,
    worktime interval NOT NULL,
    client_id integer NOT NULL
    CONSTRAINT fk_te_pers FOREIGN KEY (userprofile_id)
        REFERENCES timetracker_backend.userprofile (uid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_te_proj FOREIGN KEY (project_id)
        REFERENCES timetracker_backend.task (pid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_pro_cli FOREIGN KEY (client_id)
        REFERENCES timetracker_backend.client (cid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
    