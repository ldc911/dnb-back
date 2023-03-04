const jwt = require("jsonwebtoken");
const models = require("../models");

const getUser = (req, res) => {
  models.user
    .findAll()
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getOneUser = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([result]) => {
      if (result[0] == null) {
        res.sendStatus(404);
      } else {
        const user = result[0];
        delete user.hashedPassword;
        delete user.token;
        res.send(result[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateUserConnexion = (req, res) => {
  const user = req.body;

  user.id = parseInt(req.params.id, 10);
  models.user
    .updateConnexion(user)
    .then(([result]) => {
      if (result.affectedresult === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updatePassword = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.id, 10);
  models.user
    .updatePassword(user)
    .then(([result]) => {
      if (result.affectedresult === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateUser = (req, res) => {
  const user = req.body;

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedresult === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const createUser = (req, res) => {
  const user = req.body;

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedresult === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res) => {
  const { token } = req.params;
  const plainToken = token.split("-").join(".");
  const payload = jwt.decode(plainToken);

  models.user
    .findByToken(payload, plainToken)
    .then(([result]) => {
      if (result.length !== 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(401).json({ message: "Invalid token" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const recoverPassword = (req, res) => {
  const { token } = req.body;
  const payload = jwt.decode(token);
  req.body.email = payload.email;
  models.user
    .updateLostPassword(req.body)
    .then(([result]) => {
      if (result.affectedRows === 1) {
        res.status(200).json({ message: "Password updated" });
      } else {
        const message = "Utilisateur non trouvé";
        res.status(404).json(message);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUser,
  getOneUser,
  updateUser,
  createUser,
  destroy,
  verifyToken,
  recoverPassword,
  updateUserConnexion,
  updatePassword,
};
