const express = require("express");

const authController = require("../controller/authenticationController");
const userController = require("../controller/userController");
const multiUpload = require("../controller/uploadimage")

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

router.get("/", authController.verifyToken, userController.getUser);
router.post("/addDocument", userController.addDocument)

module.exports = router;
