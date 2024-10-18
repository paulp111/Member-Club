const pgPool = require("../db/pool");
const expressSession = require('express-session');
const PgSession = require('connect-pg-simple')(expressSession);

const sessionStore = new PgSession({
    pool: pgPool,
    tableName: "user_session",
    createTableIfMissing: true,
});

module.exports = sessionStore;