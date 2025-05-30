import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: (() => {
    try {
      require.resolve('./dist/db/schema.js');
      return './dist/db/schema.js';
    } catch {
      return './src/db/schema.ts';
    }
  })(),
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
});
// The db already ensures the type of that entry, no need to parse int