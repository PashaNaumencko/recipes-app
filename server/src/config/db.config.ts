import dotenv from 'dotenv';

dotenv.config();

const database: string = process.env.DB_NAME;
const username: string = process.env.DB_USERNAME;
const password: string = process.env.DB_PASSWORD;
const host: string = process.env.DB_HOST;

export {
  database,
  username,
  password,
  host
};
