const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const folderSchema = new Schema({
  name: String,
  desc: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;