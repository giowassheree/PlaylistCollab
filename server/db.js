const { Pool } = require('pg');
require('dotenv').config();

// A pool manages database connections, it keeps a pool of connections ready for use.

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Testing the connection on app startup
pool.connect((err, client, release) => {
    if (err) {
        console.log('Error connecting to PostgreSQL: ', err.message);
    } else {
        console.log('Connected to PostgreSQL');
        release(); // return the connection to pool
    }
});

module.exports = pool;

