-- Table: timetracker.entry
-- DROP TABLE timetracker.entry;

CREATE TABLE timetracker.entry
(
    id SERIAL,
    startdt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    enddt TIMESTAMP WITHOUT TIME ZONE,
    person_id INTEGER,
    task_id INTEGER,
    CONSTRAINT entry_pkey PRIMARY KEY (id),
    CONSTRAINT fk_entr_pers FOREIGN KEY (person_id) REFERENCES timetracker.person(id) MATCH SIMPLE,
    CONSTRAINT fk_entr_task  FOREIGN KEY (task_id) REFERENCES timetracker.task(id) MATCH SIMPLE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE timetracker.entry
    OWNER TO fluance;