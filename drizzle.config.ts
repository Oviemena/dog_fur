
// {
//     "dialect": "postgresql",
//     "schema": "./app/db/schema.ts",
//     "out": "./drizzle",
//     "url": "${DATABASE_URL}"
// }

import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env.local' });

export default defineConfig({
  schema: "./app/db/schema.ts",
  out: "./migrations/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});