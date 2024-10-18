const { Pool } = require("pg");
require('dotenv').config(); 

const pgPool = new Pool({
    host: 'localhost', 
    port: 5432,
    user: 'postgres',
    password: '123',
    database: 'member_club'
});

module.exports = pgPool;
