const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderAssignmentSchema = new Schema({
  folder_id: { type: Schema.Types.ObjectId, ref: 'Folder' },
  farmer_id: { type: Schema.Types.ObjectId, ref: 'Farmer' },
  assigned_by: { type: Schema.Types.ObjectId, ref: 'Admin' },
  assigned_at: { type: Date, default: Date.now }
});


const DataUpload = mongoose.model('DataUpload', folderAssignmentSchema);

module.exports = DataUpload;