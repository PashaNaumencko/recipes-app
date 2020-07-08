const dotenv = require('dotenv');

dotenv.config();

const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

module.exports = {
  database,
  username,
  password,
  host
};
