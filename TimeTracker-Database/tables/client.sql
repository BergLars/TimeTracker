-- Table: timetracker.client

-- DROP TABLE timetracker.client;

CREATE TABLE timetracker_backend.client
(
    cid SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL
);
