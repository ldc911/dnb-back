const { default: axios } = require("axios");

const getAPI = (req, res) => {
  axios
    .get("https://api.open5e.com/spells/?format=json")
    .then((result) => {
      const randomNumber = Math.floor(
        Math.random() * result.data.results.length - 1
      );
      res.send(result.data.results[randomNumber]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getAPI,
};
