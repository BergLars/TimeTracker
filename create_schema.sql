-- Database: timetracker
-- DROP DATABASE timetracker;

CREATE DATABASE timetracker OWNER "fluance";

REVOKE ALL ON DATABASE timetracker FROM PUBLIC;

\c timetracker;
CREATE SCHEMA IF NOT EXISTS timetracker AUTHORIZATION "fluance";
SET SEARCH_PATH TO timetracker;

REVOKE ALL ON SCHEMA timetracker FROM PUBLIC;

GRANT CONNECT ON DATABASE timetracker TO dbtimetracker;
GRANT USAGE ON SCHEMA timetracker TO dbtimetracker;

ALTER DEFAULT PRIVILEGES IN SCHEMA timetracker GRANT SELECT,INSERT,UPDATE,DELETE ON TABLES TO dbtimetracker;
ALTER DEFAULT PRIVILEGES IN SCHEMA timetracker GRANT USAGE,SELECT ON SEQUENCES TO dbtimetracker;