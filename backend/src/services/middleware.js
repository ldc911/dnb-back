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
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addLostPwdToken = (req, res, next) => {
  const user = req.body;
  models.user
    .addTokenLostPassword(user)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyUserAccess = (req, res, next) => {
  const { currentuserid } = req.headers;
  if (currentuserid === req.params.id) {
    next();
  } else {
    res.status(401).json("Unauthorized");
  }
};

module.exports = {
  getUserByEmail,
  addLostPwdToken,
  verifyUserAccess,
};
