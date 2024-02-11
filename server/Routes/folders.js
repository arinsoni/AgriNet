const express = require("express");
const { openFolder } = require("../controllers/folders");


const router = express.Router();

router.use("/folders/:folderId", openFolder);

module.exports = router;
