const models = require("../models");

const getFullSession = (req, res) => {
  models.session
    .getFullSession()
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getOneSession = (req, res) => {
  models.session
    .find(req.params.id)
    .then(([result]) => {
      if (result[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(result[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateSession = (req, res) => {
  const session = req.body;
  session.id = parseInt(req.params.id, 10);
  models.session
    .update(session)
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

const createSession = (req, res) => {
  const session = req.body;

  models.session
    .insert(session)
    .then(([result]) => {
      res.location(`/sessions/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteSession = (req, res) => {
  models.session
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

module.exports = {
  getFullSession,
  getOneSession,
  updateSession,
  createSession,
  deleteSession,
};
