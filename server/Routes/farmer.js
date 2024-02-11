const express = require("express");
const multer = require("multer");
const { login, register, getAllFarmers, dataUploads } = require("../controllers/farmer");
const verifyToken = require('../middleware/auth');
const path = require('path');
const Farmer = require("../models/farmer");


const router = express.Router();

// Define routes for login, register, and data uploads
router.post("/login", login);
router.post("/register", register);
router.get("/all-farmers", verifyToken, getAllFarmers);
router.post("/data-uploads", verifyToken, dataUploads);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/'); // Define the directory to save uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to handle image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Assuming you have a Farmer model with an image field
    const { farmerId } = req.body;
    const imageUrl = req.file.path; // Path to the uploaded image
    const farmer = await Farmer.findByIdAndUpdate(farmerId, { image: imageUrl }, { new: true });

    res.status(200).json({ success: true, farmer });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Error uploading image' });
  }
});


module.exports = router;
