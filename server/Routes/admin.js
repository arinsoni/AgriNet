const express = require("express");
const { login, register, createFolders, folderAssignment, folders, deleteFolder, getAssignedFarmers, getUnAssignedFarmers, getAdmin, getImages, getText } = require("../controllers/admin");
const verifyToken = require('../middleware/auth')

const router = express.Router();

router.use("/login", login);
router.use("/register", register);
router.use("/create-folders", verifyToken ,createFolders);
router.use("/folder-assignments", verifyToken ,folderAssignment);
router.use("/folders", verifyToken ,folders);
router.use("/delete-folder/:id", verifyToken, deleteFolder);
router.use("/get-assigned-farmers", verifyToken, getAssignedFarmers);
router.use("/get-unassigned-farmers", verifyToken, getUnAssignedFarmers);
router.use("/get-admin", verifyToken, getAdmin);
router.use("/folder/:folderId/images", verifyToken, getImages);
router.use("/get-text", verifyToken, getText);

module.exports = router;
