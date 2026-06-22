const express = require('express');
const router = express.Router();
const {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
} = require('../controllers/groupController');
const { auth, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', getAllGroups);
router.get('/:id', getGroupById);
router.post('/', auth, isAdmin, createGroup);
router.put('/:id', auth, isAdmin, updateGroup);


module.exports = router;
