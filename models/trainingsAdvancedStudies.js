// trainingsAdvancedStudies.js

const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  advancedstudy: {
    type: String,
  },
  promotion: {
    type: String,
  },
  professionaldev: {
    type: String,
  },
  otherplsspecify: {
    type: String,
  },
});

const TrainingsAdvancedStudies = mongoose.model(
  'TrainingsAdvancedStudies',
  trainingSchema
);

module.exports = TrainingsAdvancedStudies;
