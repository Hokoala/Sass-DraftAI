import dns from "node:dns";
import { betterAuth } from "better-auth";
import { Pool } from "pg";

dns.setDefaultResultOrder("ipv4first");

export const auth = betterAuth({
  database: new Pool({
    host: process.env.DB_HOST!,
    port: 5432,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    ssl: { rejectUnauthorized: false },
  }),
  emailAndPassword: {
    enabled: true,
  },
});
