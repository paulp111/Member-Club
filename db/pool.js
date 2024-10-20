const { Pool } = require("pg");

const pgPool = new Pool({
    connectionString: 'postgresql://postgres:mORjmOtURScXcjZSSzPJItZOPPLewKqZ@postgres.railway.internal:5432/railway',
    ssl: {
        rejectUnauthorized: false  // SSL ist erforderlich für Railway-Verbindungen
    }
});

module.exports = pgPool;
