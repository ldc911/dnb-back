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
      details_apero,
      details_alcool,
      details_sweets,
      details_dessert,
      details_soft,
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
      user_soft,  details_apero,
      details_alcool,
      details_sweets,
      details_dessert,
      details_soft
  ) VALUES (?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        details_apero,
        details_alcool,
        details_sweets,
        details_dessert,
        details_soft,
      ]
    );
  }

  getFullSession() {
    return this.database.query(`SELECT * FROM ${this.table}
        ORDER BY dateSession ASC
    `);
  }

  update(session) {
    const {
      duration,
      details_alcool,
      details_apero,
      details_dessert,
      details_meals,
      details_soft,
      details_sweets,
      isCampaign,
      localisation,
      title,
      user_alcool,
      user_apero,
      user_dessert,
      user_meal,
      user_soft,
      user_sweets,
      id,
    } = session;

    return this.database.query(
      `UPDATE ${this.table} SET duration = ?,
    details_alcool = ?,
    details_apero = ?,
    details_dessert = ?,
    details_meals = ?,
    details_soft = ?,
    details_sweets = ?,
    isCampaign = ?,
    localisation = ?,
    title = ?,
    user_alcool = ?,
    user_apero = ?,
    user_dessert = ?,
    user_meal = ?,
    user_soft = ?,
    user_sweets = ? WHERE id = ?`,
      [
        duration,
        details_alcool,
        details_apero,
        details_dessert,
        details_meals,
        details_soft,
        details_sweets,
        isCampaign,
        localisation,
        title,
        user_alcool,
        user_apero,
        user_dessert,
        user_meal,
        user_soft,
        user_sweets,
        id,
      ]
    );
  }
}

module.exports = SessionManager;
