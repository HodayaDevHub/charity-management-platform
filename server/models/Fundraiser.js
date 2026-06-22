const mongoose = require('mongoose');

const FundraiserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  target: {
    type: Number,
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
});

module.exports = mongoose.models.Fundraiser || mongoose.model('Fundraiser', FundraiserSchema);
