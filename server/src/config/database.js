const dotenv = require('dotenv');
const { Pool } = require('pg');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '..', '..', '/.env') });

// const db = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   port: Number(process.env.PG_PORT),
//   database: process.env.PG_DEV_DB,
// });

// const pool = new Pool({
//   user: '****',
//   database: '****',
//   password: '****',
//   port: 5432,
//   host: '****',
//   max: 5,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 5000,
// });

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  password: process.env.PG_PASSWORD,
});

module.exports = db;
