const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createCourse,
  listCourses,
  getCourse,
  enrollInCourse
} = require('../controllers/courseController');

router.post('/', protect, authorize('teacher'), createCourse);
router.get('/', protect, listCourses);
router.get('/:id', protect, getCourse);
router.post('/:id/enroll', protect, authorize('student'), enrollInCourse);

module.exports = router;