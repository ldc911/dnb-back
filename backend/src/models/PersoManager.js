/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
const AbstractManager = require("./AbstractManager");

class PersoManager extends AbstractManager {
  constructor() {
    super({ table: "perso" });
  }

  findByAuthor(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE idAuthor = ?`,
      [id]
    );
  }

  update(perso) {
    const arr = [];
    const initialSql = `UPDATE ${this.table}`;

    perso.nickname && perso.nickname === "null"
      ? arr.push({ column: "nickname", value: null })
      : arr.push({ column: "nickname", value: perso.nickname });
    perso.lastname && perso.lastname === "null"
      ? arr.push({ column: "lastname", value: null })
      : arr.push({ column: "lastname", value: perso.lastname });
    perso.classe && perso.classe === "null"
      ? arr.push({ column: "classe", value: null })
      : arr.push({ column: "classe", value: perso.classe });
    perso.background &&
      arr.push({ column: "background", value: perso.background });
    perso.avatar && arr.push({ column: "avatar", value: perso.avatar });
    perso.hauts_faits &&
      arr.push({ column: "hauts_faits", value: perso.hauts_faits });

    const dependencyArray = arr.map(({ value }) => value);
    dependencyArray.push(perso.id);
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

  insert(perso) {
    const {
      idAuthor,
      nickname,
      lastname,
      classe,
      background,
      avatar,
      hauts_faits,
    } = perso;
    return this.database.query(
      `INSERT INTO ${this.table} (idAuthor, nickname, lastname, classe, background, avatar, hauts_faits) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [idAuthor, nickname, lastname, classe, background, avatar, hauts_faits]
    );
  }
}

module.exports = PersoManager;
