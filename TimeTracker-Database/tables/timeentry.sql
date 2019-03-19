-- Table: timetracker.timeentry
-- DROP TABLE timetracker.timeentry;

CREATE TABLE timetracker_backend.timeentry
(
    tid integer PRIMARY KEY,
    userprofile_id integer NOT NULL,
    task_id integer NOT NULL,
    description varchar(40) NOT NULL,
    entrydate date NOT NULL,
    starttime interval NOT NULL,
    endtime interval NOT NULL,
    CONSTRAINT fk_te_pers FOREIGN KEY (userprofile_id)
        REFERENCES timetracker_backend.userprofile (uid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_te_task FOREIGN KEY (task_id)
        REFERENCES timetracker_backend.task (tid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
    