const express = require('express');
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getDonationById,
} = require('../controllers/donationController');

router.post('/', createDonation);
router.get('/', getAllDonations);
router.get('/:id', getDonationById);

module.exports = router;
