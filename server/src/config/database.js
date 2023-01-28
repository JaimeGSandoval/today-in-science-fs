const dotenv = require('dotenv');
const { Pool } = require('pg');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '..', '..', '/.env') });

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  password: process.env.PG_PASSWORD,
  user: process.env.PG_AWS_USER,
});

module.exports = db;
