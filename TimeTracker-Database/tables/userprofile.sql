-- Table: timetracker.userprofile

-- DROP TABLE timetracker.userprofile;

CREATE TABLE timetracker.userprofile
(
    uid integer PRIMARY KEY,
    username CHARACTER VARYING(255) UNIQUE NOT NULL,
    name CHARACTER VARYING(255) NOT NULL,
    password CHARACTER VARYING(255) NOT NULL,
    isadmin BOOLEAN NOT NULL,
    CONSTRAINT userprofile_pkey PRIMARY KEY (id);
)
