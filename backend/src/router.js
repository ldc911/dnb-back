const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const sessionControllers = require("./controllers/sessionControllers");
const apiControllers = require("./controllers/apiControllers");
const middleware = require("./services/middleware");
const sendMail = require("./services/sendMail");
const auth = require("./services/auth");

// route login
router.post("/logins", middleware.getUserByEmail, auth.verifyPassword);
// route pour envoyer un token de mdp oublié dans le user, puis envoi de mail avec comme url l'url front de mdp oublié/:token
router.put(
  "/pwd",
  middleware.getUserByEmail,
  auth.getLostPwdToken,
  middleware.addLostPwdToken,
  sendMail.sendMailPwd
);
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

// routes session
router.get("/sessions", sessionControllers.getFullSession);
router.get("/sessions/:id", sessionControllers.getOneSession);
router.post("/sessions", sessionControllers.createSession);
router.put("/sessions/:id", sessionControllers.updateSession);
router.delete("/sessions/:id", sessionControllers.deleteSession);

// route API
router.get("/spells", apiControllers.getAPI);

module.exports = router;
