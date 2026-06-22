const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  target: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.models.Group || mongoose.model('Group', GroupSchema);