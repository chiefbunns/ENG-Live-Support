-- enable pgcrypto
CREATE EXTENSION pgcrypto;

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "full_name" character varying,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "title" character varying
);