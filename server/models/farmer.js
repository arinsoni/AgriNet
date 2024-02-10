const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const farmerSchema = new Schema({
  name: String,
  username: String,
  password: String, 
  isAdmin: Boolean,
  email: String,
  region: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;