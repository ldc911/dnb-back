const models = require("../models");

const getUserByEmail = (req, res, next) => {
  const user = req.body;
  models.user
    .findByEmail(user)
    .then(([result]) => {
      if (result.length > 0) {
        [req.user] = result;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUserByEmail,
};
