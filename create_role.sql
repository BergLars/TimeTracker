-- Role: dbtimetracker
DO
$body$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = 'dbtimetracker') THEN
        CREATE ROLE dbtimetracker LOGIN
        PASSWORD 'x5<YfF_ZPFXA-ww]'
        NOSUPERUSER NOINHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;
   END IF;
END
$body$;
