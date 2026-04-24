const express = require('express');
const router = express.Router();

const { enrollCourse, getMyCourses, getCourseStudents } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

// Student Routes
router.post('/', protect, enrollCourse);
router.get('/my-courses', protect, getMyCourses); // Crash fix: Ye route wapas aa gaya

// Instructor Route
router.get('/course/:courseId', protect, getCourseStudents);

module.exports = router;