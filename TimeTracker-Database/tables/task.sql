-- Table: timetracker.task

-- DROP TABLE timetracker.task;

CREATE TABLE timetracker.task
(
    tid integer PRIMARY KEY,
    project_id integer NOT NULL,
    taskname varchar(40) NOT NULL,
	CONSTRAINT fk_ta_proj FOREIGN KEY (project_id)
	    REFERENCES timetracker.project (pid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT;
)
