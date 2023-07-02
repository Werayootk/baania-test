import { Pool } from "pg"

export const pool = new Pool({
    host: "localhost",
    user: "test",
    password: "test",
    database: "test",
    port: 5432
});
  

