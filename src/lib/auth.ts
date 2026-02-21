import dns from "node:dns";
import { betterAuth } from "better-auth";
import { Pool } from "pg";

dns.setDefaultResultOrder("ipv4first");

export const auth = betterAuth({
  database: new Pool({
    host: "aws-1-eu-west-1.pooler.supabase.com",
    port: 5432,
    user: "postgres.drypjmahvsxvlhomjjbm",
    password: process.env.DB_PASSWORD,
    database: "postgres",
    ssl: { rejectUnauthorized: false },
  }),
  emailAndPassword: {
    enabled: true,
  },
});
