const express = require('express');
const router = express.Router();
const {
  createFundraiser,
  getAllFundraisers,
  getFundraiserById,
  updateFundraiser,
} = require('../controllers/fundraiserController');
const { auth, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', getAllFundraisers);
router.get('/:id', getFundraiserById);
router.post('/', createFundraiser);
router.put('/:id', auth, isAdmin, updateFundraiser);


module.exports = router;
