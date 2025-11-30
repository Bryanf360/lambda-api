import 'dotenv/config';

export const envs = {
  PORT: Number(process.env.PORT ?? 3000),
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  JWT_SEED: process.env.JWT_SEED ?? ''
};
