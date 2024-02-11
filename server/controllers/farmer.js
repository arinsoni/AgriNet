const Farmer = require('../models/farmer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DataUpload = require('../models/dataUpload');
const Admin = require('../models/admin');


const login = async (req, res) => {
  let success = false;
  try {
    const { username, password } = req.body;

    const farmer = await Farmer.findOne({ username });

    
    if (!farmer) {
      const tempAdmin = await Admin.findOne({ username });
      if (tempAdmin) {
        return res.status(501).json({ message: 'You are a admin not allowed to login as farmer' })
      }
      else{
        return res.status(401).json({ message: 'Farmer doesn\'t exist' });
      }
    }
    if (!(await bcrypt.compare(password, farmer.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ farmerId: farmer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    success = true;

    res.status(200).json({ farmer, success, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const register = async (req, res) => {
  let success = false;
  try {
    const { name, username, email, password } = req.body;
    const existingFarmer = await Farmer.findOne({ username });
    if (existingFarmer) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newFarmer = new Farmer({
      name,
      username,
      email,
      isAdmin: true,
      password: hashedPassword
    });
    const farmer = await newFarmer.save();
    success = true;

    res.status(201).json({farmer, success});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const dataUploads = async (req, res) => {
    try {
        const { folder_id, farmer_id, data } = req.body;

        const newDataUpload = new DataUpload({
            folder_id,
            farmer_id,
            data
        });

        const dataUpload = await newDataUpload.save();

        res.status(201).json(dataUpload);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

}

const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.status(200).json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  login,
  register,
  dataUploads,
  getAllFarmers
}