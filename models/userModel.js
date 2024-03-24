const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },

  personalInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo' },
  educationalAttainment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EducationalAttainment',
  },
  trainingsAdvancedStudies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingsAdvancedStudies',
  },
  employment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employment',
  },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
