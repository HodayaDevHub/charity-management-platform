const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  fundraiserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fundraiser',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  donorName: {
    type: String,
    required: true,
  },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Donation || mongoose.model('Donation', donationSchema);