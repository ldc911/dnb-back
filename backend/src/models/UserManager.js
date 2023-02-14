const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    const { nickname, email, bio, banPic, isMJ, avatar, hashedPassword } = user;
    return this.database.query(
      `INSERT INTO ${this.table} (nickname, email, bio, banPic, isMJ, avatar, hashedPassword) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nickname, email, bio, banPic, isMJ, avatar, hashedPassword]
    );
  }

  updatePassword(user) {
    const { token, email } = user;
    return this.database.query(
      `UPDATE ${this.table} SET token = ? WHERE email = ?`,
      [token, email]
    );
  }

  findByEmail(user) {
    const { email } = user;
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }

  findByToken(payload, token) {
    const { email } = payload;
    return this.database.query(
      `SELECT email FROM ${this.table} WHERE token =? AND email =?`,
      [token, email]
    );
  }

  updateLostPassword(user) {
    const { email, token, hashedPassword } = user;
    return this.database.query(
      `UPDATE ${this.table} SET hashedPassword = ?, token = NULL WHERE token = ? AND email = ?`,
      [hashedPassword, token, email]
    );
  }
}

module.exports = UserManager;
