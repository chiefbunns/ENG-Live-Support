SELECT id, email, title, full_name
  FROM "users"
 WHERE email = lower($1)
       AND password = crypt($2, password);