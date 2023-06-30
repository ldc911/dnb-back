// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require("morgan");
const express = require("express");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
const cors = require("cors");

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const router = require("./router");

app.use(router);

module.exports = app;
