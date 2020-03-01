INSERT INTO "users"(full_name, title, email, password)
     VALUES ($1, $2, lower($3), crypt($4, gen_salt('bf', 8)))
  RETURNING id, email, title, full_name;
