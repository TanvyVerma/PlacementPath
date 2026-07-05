const express = require('express');
const router = express.Router();
const {
  submitExperience,
  getExperiences,
  getExperienceById,
  upvoteExperience,
  getMyExperiences
} = require('../controllers/experienceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getExperiences);
router.get('/my', protect, getMyExperiences);
router.get('/:id', getExperienceById);
router.post('/', protect, submitExperience);
router.put('/:id/upvote', protect, upvoteExperience);

module.exports = router;