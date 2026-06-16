import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
const pool = new Pool({
  connectionString: process.env.PRODUCTION_DB,
});

// Primary Drizzle ORM client instantiated with your relational schema definitions
export const db = drizzle(pool, { schema });