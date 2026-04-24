const express = require('express');
const router = express.Router();
// Pehle ye check karo ke saaray functions yahan se aa rahay hain:
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Auth routes
router.post('/register', register);
router.post('/login', login);

// Profile routes (In par 'protect' hona lazmi hai)
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);

module.exports = router;