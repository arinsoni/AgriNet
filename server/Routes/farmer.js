const express = require("express");
const multer = require("multer");
const { login, register, getAllFarmers, dataUploads, getAssignedFolders } = require("../controllers/farmer");
const verifyToken = require('../middleware/auth');
const path = require('path');
const Farmer = require("../models/farmer");
const FolderAssignment = require("../models/folderAssignment");

const router = express.Router();


router.post("/login", login);
router.post("/register", register);
router.get("/all-farmers",  getAllFarmers);
router.post("/data-uploads",  dataUploads);
router.use("/assigned-folders/:farmerId",  getAssignedFolders);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { farmerId, folderId, text } = req.body;

    const imageUrl = req.file.path;
    const updatedFolderAssignments = await FolderAssignment.updateMany(
      { farmer_id: farmerId, folder_id: folderId },
      { image: imageUrl, text: text },
      { new: true }
    );

    console.log(updatedFolderAssignments);

    res.status(200).json({ success: true, folderAssignments: updatedFolderAssignments });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Error uploading image' });
  }
});


router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = router;
