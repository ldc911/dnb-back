require("dotenv").config();
const mailer = require("../../../mailer");

const sendMailPwd = (req, res) => {
  const { email, token } = req.body;
  mailer.sendMail(
    {
      from: "duclos.laurent@gmail.com",
      to: email,
      subject: "Mot de passe oublié",
      text: `Veux-tu bien ne plus oublier ton mot de passe. Ton score d'intel ne doit pas être bien haut. Clique sur le lien : ${
        process.env.FRONTEND_URL
      }/password_recover/${token.split(".").join("-")}`,
      html: `<p>Veux-tu bien ne plus oublier ton mot de passe. Ton score d'intel ne doit pas être bien haut. Clique sur le lien : <a href=${
        process.env.FRONTEND_URL
      }/password_recover/${token
        .split(".")
        .join("-")}> je suis un gobours sans tête</a></p>`,
    },
    (err) => {
      if (err) console.error(err);
      else {
        res.sendStatus(200);
      }
    }
  );
};

const sendMailSession = (session) => {
  mailer.sendMail(
    {
      from: "duclos.laurent@gmail.com",
      to: "my-personnal-email@gmail.com",
      subject: "Une nouvelle session vient d'être planifiée !",
      text: "Session Planifiée !",
      html: "<p>Session planifiée !</p>",
    },
    (err, info) => {
      if (err) console.error(err);
      else console.info(info);
    }
  );
};

module.exports = { sendMailPwd, sendMailSession };
