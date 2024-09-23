const mongoose = require('mongoose');

// Define the schema for the Problem model
const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  solution: {
    type: String,
    required: true
  }
});

// Create the Problem model
const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
