-- Table: timetracker.person
-- DROP TABLE timetracker.person;

CREATE TABLE timetracker.person
(
    id SERIAL,
    username CHARACTER VARYING(80) UNIQUE NOT NULL,
    password CHARACTER VARYING(255) NOT NULL,
    percentageofwork NUMERIC(3,2) NOT NULL,
    isadmin BOOLEAN NOT NULL,
    CONSTRAINT person_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE timetracker.person
    OWNER TO fluance;