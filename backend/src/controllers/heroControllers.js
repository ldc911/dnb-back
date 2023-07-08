const models = require("../models");

const getHero = (req, res) => {
  const authorId = req.params.id;
  models.hero
    .findByAuthor(authorId)
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateHero = (req, res) => {
  const hero = req.body;

  hero.id = parseInt(req.params.id, 10);
  models.hero
    .update(hero)
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

const deleteHero = (req, res) => {
  models.hero
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

const createHero = (req, res) => {
  const hero = req.body;
  models.hero
    .insert(hero)
    .then(([result]) => {
      res.location(`/persos/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getHero,
  updateHero,
  deleteHero,
  createHero,
};
