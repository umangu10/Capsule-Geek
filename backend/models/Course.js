const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: String,
  level: String,
  learningObjectives: [String],
  prerequisites: [String],
  tools: [String],
  syllabus: [{
    week: Number,
    title: String,
    lessons: [{
      title: String,
      topics: [String]
    }]
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema); 