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

  update(user) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [user.title, user.id]
    );
  }

  findByEmail(user) {
    const { email } = user;
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }
}

module.exports = UserManager;
