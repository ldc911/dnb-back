// const { default: axios } = require("axios");
// eslint-disable-next-line import/no-extraneous-dependencies
const FileReader = require("filereader");
const multer = require("multer");

const upload = multer({ dest: "public/uploads/avatar" });

const getFile = (req, res, next) => {
  upload.single("avatar");

  res.json("ok");
};

const convertBase = (req, res) => {
  console.log(req);
  const reader = new FileReader();

  reader.readAsDataURL(file).then((result) => {
    console.log(result);
  });
};

module.exports = {
  convertBase,
  getFile,
};
