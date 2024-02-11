const Folder = require('../models/folder');


const openFolder = async (req, res) => {
  const folderId = req.params.folderId;
  console.log(folderId)
  
  try {
    const folder = await Folder.findOne({ _id: folderId });
    
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    
    res.json(folder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  openFolder
}