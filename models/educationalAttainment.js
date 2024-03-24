// models/EducationalAttainmentModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const educationalAttainmentSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  degree: { type: String },
  collegeuniversity: { type: String },
  campus: { type: String },
  yeargraduated: { type: String },
  honorsrecieved: { type: String },
});

const EducationalAttainmentModel = mongoose.model(
  'EducationalAttainment',
  educationalAttainmentSchema
);

module.exports = EducationalAttainmentModel;
