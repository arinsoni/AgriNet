const express = require("express");
const { login, register, createFolders, folderAssignment, folders, deleteFolder, getAssignedFarmers, getUnAssignedFarmers, getAdmin, getImages, getText } = require("../controllers/admin");
const verifyToken = require('../middleware/auth')

const router = express.Router();

router.use("/login", login);
router.use("/register", register);
router.use("/create-folders", createFolders);
router.use("/folder-assignments", folderAssignment);
router.use("/folders", folders);
router.use("/delete-folder/:id",  deleteFolder);
router.use("/get-assigned-farmers",  getAssignedFarmers);
router.use("/get-unassigned-farmers",  getUnAssignedFarmers);
router.use("/get-admin",  getAdmin);
router.use("/folder/:folderId/images",  getImages);
router.use("/get-text",  getText);

module.exports = router;
