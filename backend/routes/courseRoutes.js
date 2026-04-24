const express = require('express');
const router = express.Router();
const { 
  createCourse, 
  getCourses, 
  getCourseById, 
  addLesson, 
  updateCourse, 
  deleteCourse 
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourseById); // Single course view

// Instructor only routes
router.post('/', protect, authorize('Instructor'), createCourse);
router.put('/:id', protect, authorize('Instructor'), updateCourse);
router.delete('/:id', protect, authorize('Instructor'), deleteCourse);
router.post('/:id/lessons', protect, authorize('Instructor'), addLesson); // Add lesson

module.exports = router;