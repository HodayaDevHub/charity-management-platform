const express = require('express');
const router = express.Router();
const { adminRegister, adminLogin, getProfile } = require('../controllers/authController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/admin-register', adminRegister);
router.post('/admin-login', adminLogin);
router.get('/me', auth, getProfile);

module.exports = router;
