/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class SessionManager extends AbstractManager {
  constructor() {
    super({ table: "session" });
  }

  insert(session) {
    const {
      dateSession,
      duration,
      localisation,
      isCampaign,
      title,
      user_meal,
      details_meals,
      user_apero,
      user_alcool,
      user_sweets,
      user_dessert,
      user_soft,
    } = session;
    return this.database.query(
      `INSERT INTO ${this.table} (
      dateSession,
      duration,
      localisation,
      isCampaign,
      title,
      user_meal,
      details_meals,
      user_apero,
      user_alcool,
      user_sweets,
      user_dessert,
      user_soft
  ) VALUES (?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        dateSession,
        duration,
        localisation,
        isCampaign,
        title,
        user_meal,
        details_meals,
        user_apero,
        user_alcool,
        user_sweets,
        user_dessert,
        user_soft,
      ]
    );
  }

  getFullSession() {
    return this.database
      .query(`SELECT s.id, s.dateSession, s.duration, s.localisation, s.isCampaign, s.title, u.nickname AS mealDealer, s.details_meals, u2.nickname AS aperoDealer, u3.nickname AS alcoolDealer, u4.nickname AS sweetsDealer, u5.nickname AS dessertDealer, u6.nickname AS softDealer, s.user_meal, s.user_apero, s.user_alcool, s.user_sweets, s.user_dessert, s.user_soft FROM ${this.table} AS s
    LEFT JOIN user AS u ON s.user_meal = u.id
    LEFT JOIN user AS u2 ON s.user_apero = u2.id
    LEFT JOIN user AS u3 ON s.user_alcool = u3.id
    LEFT JOIN user AS u4 ON s.user_sweets = u4.id
    LEFT JOIN user AS u5 ON s.user_dessert = u5.id
    LEFT JOIN user AS u6 ON s.user_soft = u6.id
    ORDER BY s.dateSession ASC
    `);
  }

  update(session) {
    const arr = [];
    const initialSql = `UPDATE ${this.table}`;
    session.dateSession &&
      arr.push({ column: "dateSession", value: session.dateSession });
    session.duration &&
      arr.push({ column: "duration", value: session.duration });
    session.localisation &&
      arr.push({ column: "localisation", value: session.localisation });
    session.isCampaign &&
      arr.push({ column: "isCampaign", value: session.isCampaign });
    session.title && arr.push({ column: "title", value: session.title });
    session.user_meal &&
      arr.push({ column: "user_meal", value: session.user_meal });

    session.details_meals &&
      arr.push({ column: "details_meals", value: session.details_meals });
    session.user_apero &&
      arr.push({ column: "user_apero", value: session.user_apero });

    session.user_alcool &&
      arr.push({ column: "user_alcool", value: session.user_alcool });

    session.user_sweets &&
      arr.push({ column: "user_sweets", value: session.user_sweets });

    session.user_dessert &&
      arr.push({ column: "user_dessert", value: session.user_dessert });

    session.user_soft &&
      arr.push({ column: "user_soft", value: session.user_soft });

    const dependencyArray = arr.map(({ value }) => value);
    dependencyArray.push(session.id);

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

module.exports = SessionManager;
