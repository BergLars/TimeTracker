-- Table: timetracker.task
-- DROP TABLE timetracker.task;

CREATE TABLE timetracker.task
(
    id SERIAL,
    description CHARACTER VARYING(255),
    project_id INTEGER NOT NULL,
    CONSTRAINT task_pkey PRIMARY KEY (id),
    CONSTRAINT fk_task_proj FOREIGN KEY (project_id) REFERENCES timetracker.project(id) MATCH SIMPLE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE timetracker.task
    OWNER TO fluance;