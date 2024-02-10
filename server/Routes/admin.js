const express = require("express");
const { login, register, createFolders, folderAssignment, folders, deleteFolder } = require("../controllers/admin");
const verifyToken = require('../middleware/auth')

const router = express.Router();

router.use("/login", login);
router.use("/register", register);
router.use("/create-folders", verifyToken ,createFolders);
router.use("/folder-assignments", verifyToken ,folderAssignment);
router.use("/folders", verifyToken ,folders);
router.use("/delete-folder/:id", verifyToken, deleteFolder);


module.exports = router;