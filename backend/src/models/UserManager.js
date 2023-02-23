/* eslint-disable no-unused-expressions */
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

  addTokenLostPassword(user) {
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

  update(user) {
    const arr = [];
    const initialSql = `UPDATE ${this.table}`;

    user.email && arr.push({ column: "email", value: user.email });
    user.nickname && arr.push({ column: "nickname", value: user.nickname });
    user.bio && arr.push({ column: "bio", value: user.bio });
    user.banPic && arr.push({ column: "banPic", value: user.banPic });
    user.avatar && arr.push({ column: "avatar", value: user.avatar });

    const dependencyArray = arr.map(({ value }) => value);
    dependencyArray.push(user.id);
    return this.database.query(
      arr.reduce(
        (sql, { column }, index) =>
          `${sql} ${index === 0 ? `SET` : `,`} ${column} = ? ${
            index === arr.length - 1 ? `WHERE id = ?` : ``
          }`,
        initialSql
      ),
      dependencyArray
    );
  }
}

module.exports = UserManager;
