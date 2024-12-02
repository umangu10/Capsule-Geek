const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAllLabs,
  getLabById,
  updateLabProgress,
  startPentestingLab
} = require('../controllers/labController');

router.get('/', getAllLabs);
router.get('/:id', getLabById);
router.put('/:labId/progress', protect, updateLabProgress);
router.get('/pentesting/:id', protect, startPentestingLab);

module.exports = router; 