-- Table: timetracker.project

-- DROP TABLE timetracker.project;

CREATE TABLE timetracker_backend.project
(
    pid SERIAL PRIMARY KEY,
    projectname VARCHAR(40),
    projectOwner VARCHAR(40)
);


