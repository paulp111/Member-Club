const pgPool = require("./pool");

// Fügt einen neuen Benutzer zur Datenbank hinzu
const pushUser = async (user) => {
  await pgPool.query(
    "INSERT INTO users (forename, surname, email, password) VALUES ($1, $2, $3, $4)",
    [user.forename, user.surname, user.email, user.password]
  );
};

// Holt die Benutzeranmeldedaten anhand der E-Mail
const getUserCredentials = async (email) => {
  const { rows } = await pgPool.query(
    "SELECT id, email, password FROM users WHERE email=$1",
    [email]
  );
  return rows[0];
};

// Holt die vollständigen Benutzerdaten anhand der Benutzer-ID
const getUserById = async (id) => {
  const { rows } = await pgPool.query(
    "SELECT u.*, r.role FROM users as u JOIN roles as r ON u.role_id=r.id WHERE u.id=$1",
    [id]
  );
  return rows[0];
};

// Holt alle Mitgliedscodes aus der member_codes-Tabelle
const getAllMemberCodes = async () => {
  const { rows } = await pgPool.query("SELECT * FROM member_codes");
  return rows;
};

// Holt alle Nachrichten aus der messages-Tabelle
const getAllMessages = async () => {
  const { rows } = await pgPool.query("SELECT * FROM messages");
  return rows;
};

// Holt alle Benutzer aus der users-Tabelle
const getAllUsers = async () => {
  const { rows } = await pgPool.query("SELECT * FROM users");
  return rows;
};

module.exports = {
  pushUser,
  getUserCredentials,
  getUserById,
  getAllMemberCodes, // Mitgliedscodes abrufen
  getAllMessages,    // Nachrichten abrufen
  getAllUsers,       // Alle Benutzer abrufen
};
