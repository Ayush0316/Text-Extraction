const multer = require("multer");
const path = require("path");

const fs = require("fs");
const util = require("util");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const name =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(null, name);
  },
});

const multiUpload = multer({
  storage,
}).array("images");

module.exports = multiUpload;