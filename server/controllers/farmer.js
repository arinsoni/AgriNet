const Farmer = require('../models/farmer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DataUpload = require('../models/dataUpload')


const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const farmer = await Farmer.findOne({ username });

    if (!farmer || !(await bcrypt.compare(password, farmer.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ farmerId: farmer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const existingFarmer = await Farmer.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newFarmer = new Farmer({
      name,
      username,
      email,
      password: hashedPassword
    });
    const admin = await newFarmer.save();

    res.status(201).json(admin);
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

module.exports = {
  login,
  register,
  dataUploads
}