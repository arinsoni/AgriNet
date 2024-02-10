const express = require("express");
const { login, register, createFolders, folderAssignment } = require("../controllers/admin");
const verifyToken = require('../middleware/auth')

const router = express.Router();

router.use("/login", login);
router.use("/register", register);
router.use("/create-folders", verifyToken ,createFolders);
router.use("/folder-assignments", verifyToken ,folderAssignment);


module.exports = router;
