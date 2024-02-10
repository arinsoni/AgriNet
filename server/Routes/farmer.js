const express = require("express");
const { login, register } = require("../controllers/admin");
const verifyToken = require('../middleware/auth');
const { dataUploads } = require("../controllers/farmer");


const router = express.Router();

router.use("/login", login);
router.use("/register", register);
router.use("/data-uploads", verifyToken, dataUploads);

module.exports = router;
