import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';


import { config } from "dotenv";
config({ path: ".env.local" })

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be a Neon postgres connection string');
}

const sql = neon(process.env.DATABASE_URL as string);

export const db = drizzle(sql, {
    schema
})



export const runtime = 'edge'

export const preferredRegion = 'home'