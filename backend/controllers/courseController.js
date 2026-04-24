const Course = require('../models/Course');

// @desc    Create a new course
const createCourse = async (req, res) => {
  try {
    const { title, description, category, price, seats } = req.body;
    const course = await Course.create({
      title, description, category, price, seats,
      instructor: req.user._id 
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

// @desc    Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

// @desc    Get single course by ID (New Fix)
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course' });
  }
};

// @desc    Add a lesson to a course
const addLesson = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    console.log("Adding lesson to Course ID:", req.params.id);

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.lessons.push({ title, content });
    
    await course.save();

    res.status(201).json({ 
      message: 'Lesson added successfully', 
      course 
    });
  } catch (error) {
    console.error("Lesson Save Error:", error.message);
    res.status(500).json({ message: 'Error adding lesson', error: error.message });
  }
};
const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course' });
  }
};

module.exports = { 
  createCourse, 
  getCourses, 
  getCourseById, 
  addLesson, 
  updateCourse, 
  deleteCourse 
};