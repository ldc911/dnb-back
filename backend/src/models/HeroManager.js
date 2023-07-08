/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
const AbstractManager = require("./AbstractManager");

class HeroManager extends AbstractManager {
  constructor() {
    super({ table: "hero" });
  }

  findByAuthor(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE idAuthor = ?`,
      [id]
    );
  }

  findAuthor(id) {
    return this.database.query(
      `SELECT u.id AS authorId FROM ${this.table} as p
        INNER JOIN user as u ON p.idAuthor = u.id
        WHERE p.id = ?`,
      [id]
    );
  }

  update(hero) {
    const arr = [];
    const initialSql = `UPDATE ${this.table}`;

    hero.nickname && hero.nickname === "null"
      ? arr.push({ column: "nickname", value: null })
      : arr.push({ column: "nickname", value: hero.nickname });
    hero.lastname && hero.lastname === "null"
      ? arr.push({ column: "lastname", value: null })
      : arr.push({ column: "lastname", value: hero.lastname });
    hero.classe && hero.classe === "null"
      ? arr.push({ column: "classe", value: null })
      : arr.push({ column: "classe", value: hero.classe });
    hero.background &&
      arr.push({ column: "background", value: hero.background });
    hero.avatar && arr.push({ column: "avatar", value: hero.avatar });
    hero.hauts_faits &&
      arr.push({ column: "hauts_faits", value: hero.hauts_faits });
    hero.species && hero.species === "null"
      ? arr.push({ column: "species", value: null })
      : arr.push({ column: "species", value: hero.species });

    const dependencyArray = arr.map(({ value }) => value);
    dependencyArray.push(hero.id);
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

  insert(hero) {
    const {
      idAuthor,
      nickname,
      lastname,
      classe,
      background,
      avatar,
      hauts_faits,
      species,
    } = hero;
    return this.database.query(
      `INSERT INTO ${this.table} (idAuthor, nickname, lastname, classe, background, avatar, hauts_faits, species) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        idAuthor,
        nickname,
        lastname,
        classe,
        background,
        avatar,
        hauts_faits,
        species,
      ]
    );
  }
}

module.exports = HeroManager;
