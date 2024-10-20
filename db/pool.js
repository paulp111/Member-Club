const { Pool } = require("pg");
require('dotenv').config();

const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Nutze die DATABASE_URL von Railway
    ssl: {
        rejectUnauthorized: false  // SSL-Verbindung für Railway erforderlich
    }
});

module.exports = pgPool;
