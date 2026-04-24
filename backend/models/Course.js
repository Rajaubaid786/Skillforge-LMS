const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  description: { type: String, required: true }, 
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  category: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  // 'required: true' hata diya taake purane courses crash na karein
  seats: { type: Number, default: 0 }, 
  // Naya Field: Lessons add karne ke liye 
  lessons: [
    {
      title: { type: String, required: true },
      content: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);