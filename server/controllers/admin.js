const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Folder = require('../models/folder');
const FolderAssignment = require('../models/folderAssignment');
const Farmer = require('../models/farmer');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      const tempFarmer = await Farmer.findOne({ username });
      if (tempFarmer) {
        return res.status(501).json({ message: 'You are a farmer' })
      }
      else{
        return res.status(401).json({ message: 'Admin doesn\'t exist' });
      }
    }

    if (!(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


    res.status(200).json({ admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      username,
      isAdmin: true,
      email,
      password: hashedPassword
    });
    const admin = await newAdmin.save();

    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const createFolders = async (req, res) => {
  try {
    const { name, desc } = req.body;

    const newFolder = new Folder({
      name,
      desc
    });

    const folder = await newFolder.save();

    res.status(201).json(folder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const folderAssignment = async (req, res) => {
  try {
    const { folder_id, farmer_id, assigned_by } = req.body;

    const newFolderAssignment = new FolderAssignment({
      folder_id,
      farmer_id,
      assigned_by
    });

    const folderAssignment = await newFolderAssignment.save();

    res.status(201).json(folderAssignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const folders = async (req, res) => {
  try {
    const folders = await Folder.find();
    res.status(200).json(folders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const deleteFolder = async (req, res) => {
  try {
    let folder = await Folder.findById(req.params.id);
    if (!folder) {
      return res.status(404).send("Not Found");
    }
    folder = await Folder.findByIdAndDelete(req.params.id);
    res.json({ "Success": "the Folder has been deleted", folder: folder });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  login,
  register,
  createFolders,
  folderAssignment,
  folders,
  deleteFolder,
}