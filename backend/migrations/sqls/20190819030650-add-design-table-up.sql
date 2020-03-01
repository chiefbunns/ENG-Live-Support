CREATE TABLE "design" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "support_type" character varying(30),
    "service" integer,
    "requestor" integer,
    "short_description" character varying(1000),
    "ee_tech" integer,
    "on_hold" text,
    "rejected" text,
    "done" text,
    "ee_notes" character varying(1000)
);
