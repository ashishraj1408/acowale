import dotenv from 'dotenv';

dotenv.config();

export const port = Number(process.env.PORT ?? 4000);
export const databaseUrl = process.env.DATABASE_URL ?? '';
