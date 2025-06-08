const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'obatln',
  password: '15112005',
  port: 5432,
});

module.exports = pool;