const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: String,
  username: String,
  password: String, 
  email: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

