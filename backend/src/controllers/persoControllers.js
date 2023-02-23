const models = require("../models");

const getPerso = (req, res) => {
  models.perso
    .findByAuthor(req.params.id)
    .then(([result]) => {
      if (result.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updatePerso = (req, res) => {
  const perso = req.body;

  perso.id = parseInt(req.params.id, 10);

  models.perso
    .update(perso)
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

const deletePerso = (req, res) => {
  models.perso
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

const createPerso = (req, res) => {
  const perso = req.body;
  models.perso
    .insert(perso)
    .then(([result]) => {
      res.location(`/persos/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getPerso,
  updatePerso,
  deletePerso,
  createPerso,
};
