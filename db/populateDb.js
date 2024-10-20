const { Client } = require("pg");

const client = new Client({
    connectionString: 'postgresql://postgres:mORjmOtURScXcjZSSzPJItZOPPLewKqZ@postgres.railway.internal:5432/railway',
    ssl: {
        rejectUnauthorized: false  // SSL ist erforderlich für Railway-Verbindungen
    }
});

const SQL = `
    CREATE TABLE IF NOT EXISTS roles(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        role VARCHAR(100) UNIQUE
    );
    INSERT INTO roles (role)
    VALUES  ('user'),
            ('members'),
           ('admin')
    ON CONFLICT DO NOTHING;

    CREATE TABLE IF NOT EXISTS member_codes (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        code VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        forename VARCHAR(100),
        surname VARCHAR(100),
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role_id INTEGER NOT NULL DEFAULT 1,
        CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles (id)
    );

    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR(255),
        date DATE,
        user_id INTEGER NOT NULL,
        message VARCHAR(255),
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
    );
`;

const memberCodes = [
    'f94518e2-2e27-4a46-b336-a82da1bed8d3',
    '10a009f2-8b0b-44cb-a60d-d80c385baaf5',
    '5941b406-0fa0-43eb-a365-cf428533c2c6',
    '7caad7f5-8af7-4aa1-b1d8-ccc37c41ced2',
    'f1915f21-a86c-4a4b-b4b9-5abaf1f0ca43'
];

async function populateMemberCodes(client) {
    for (let code of memberCodes) {
        try {
            await client.query("INSERT INTO member_codes (code) VALUES ($1) ON CONFLICT DO NOTHING", [code]);
        } catch (err) {
            console.error(`Fehler beim Einfügen des Mitgliedscodes: ${err.message}`);
        }
    }
}

async function main() {
    console.log('Seeding ...');

    try {
        await client.connect();
        await client.query(SQL);
        console.log('Tabellen erfolgreich erstellt.');

        await populateMemberCodes(client);
        console.log('Mitgliedscodes erfolgreich hinzugefügt.');
    } catch (err) {
        console.error(`Fehler: ${err.message}`);
    } finally {
        await client.end();
        console.log('Datenbankverbindung geschlossen. All done.');
    }
}

main();
