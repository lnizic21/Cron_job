import pgPromise from "pg-promise";


const db = pgPromise()({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database:  process.env.DB_NAME || "cron-job",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  schema: "base",

});

export default db;