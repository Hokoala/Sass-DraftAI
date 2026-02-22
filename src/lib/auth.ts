import dns from "node:dns";
import { betterAuth } from "better-auth";
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
const { Pool } = require("pg") as any;

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
