-- Table: timetracker.project
-- DROP TABLE timetracker.project;

CREATE TABLE timetracker.project
(
    id SERIAL,
    name CHARACTER VARYING(80) NOT NULL,
    CONSTRAINT project_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE timetracker.project
OWNER TO fluance;