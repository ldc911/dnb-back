/* eslint-disable import/no-extraneous-dependencies */
require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyUser = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  models.user
    .find(id)
    .then(([result]) => {
      if (result.length === 1) {
        argon2
          .verify(result[0].hashedPassword, req.body.oldPassword)
          .then((valid) => {
            if (valid) {
              delete req.body.oldPassword;
              next();
            } else {
              res.sendStatus(401);
            }
          });
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: req.user.id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// verifier si le token en params est bien encodé ou s'il faut le passer en headers
const verifyToken = (req, res) => {
  const { token } = req.params;
  const validToken = jwt.verify(token, process.env.JWT_SECRET);
  models.user
    .findByToken(validToken)
    .then(([result]) => {
      if (result.length === 1) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getLostPwdToken = (req, res, next) => {
  const payload = { sub: req.user.id, email: req.user.email };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 900000,
  });
  req.body.token = token;
  next();
};

module.exports = {
  hashPassword,
  verifyPassword,
  getLostPwdToken,
  verifyToken,
  verifyUser,
};
