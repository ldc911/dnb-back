/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const sessionControllers = require("./controllers/sessionControllers");
const persoControllers = require("./controllers/persoControllers");
const apiControllers = require("./controllers/apiControllers");
const middleware = require("./services/middleware");
const sendMail = require("./services/sendMail");
const auth = require("./services/auth");
const uploadControllers = require("./controllers/uploadControllers");

// route login
router.post("/login", middleware.getUserByEmail, auth.verifyPassword);
// route pour envoyer un token de mdp oublié dans le user, puis envoi de mail avec comme url l'url front de mdp oublié/:token
router.put(
  "/pwd",
  middleware.getUserByEmail,
  auth.getLostPwdToken,
  middleware.addLostPwdToken,
  sendMail.sendMailPwd
);
// route de modification du mot de passe
router.get("/passwordRecover/:token", userControllers.verifyToken);
router.put(
  "/passwordRecover",
  auth.hashPassword,
  userControllers.recoverPassword
);


// routes user
router.get("/users", userControllers.getUser);
router.get("/users/:id", userControllers.getOneUser);
router.post("/users", auth.hashPassword, userControllers.createUser);
router.put("/users/:id", userControllers.updateUser);

// routes session
router.get("/sessions", sessionControllers.getFullSession);
router.get("/sessions/:id", sessionControllers.getOneSession);
router.post("/sessions", sessionControllers.createSession);
router.put("/sessions/:id", sessionControllers.updateSession);
router.delete("/sessions/:id", sessionControllers.deleteSession);

// route perso
router.get("/persos/:id", persoControllers.getPerso);
router.put("/persos/:id", persoControllers.updatePerso);
router.delete("/persos/:id", persoControllers.deletePerso);
router.post("/persos", persoControllers.createPerso);

// routes upload
router.post(
  "/avatar",
  uploadControllers.getFile,
  uploadControllers.convertBase
);

// route API
router.get("/spells", apiControllers.getAPI);

module.exports = router;
