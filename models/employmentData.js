const mongoose = require('mongoose');

const employmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  presentEmploymentStatus: {
    type: String,
    enum: ['Yes', 'No', 'NeverBeenEmployed'],
    // Add any other constraints if necessary
  },
  reasonadvancedfurtherstudy: { type: String },
  reasonFamilyConcern: { type: String },
  reasonHealthRelated: { type: String },
  reasonLackOfExperience: { type: String },
  reasonNoJobOpportunity: { type: String },
  reasonDidNotLookForJob: { type: String },
  reasonOther: { type: String },
  otherReason: { type: String },
  employmentStatusRegular: { type: String },
  employmentStatusTemporary: { type: String },
  employmentStatusCasual: { type: String },
  employmentStatusContractual: { type: String },
  employmentStatusSelfEmployed: { type: String },
  selfEmployedSkills: { type: String },
  presentOccupation: { type: String },
  majorLineOfBusiness: { type: String },
  placeOfWork: { type: String },
  firstJobAfterCollege: { type: String },
  stayOnJobReasons: {
    salariesAndBenefits: { type: String },
    careerChallenge: { type: String },
    relatedToSpecialSkill: { type: String },
    relatedToCourseOrProgram: { type: String },
    proximityToResidence: { type: String },
    peerInfluence: { type: String },
    familyInfluence: { type: String },
    otherReasons: { type: String },
  },
  stayOnJobOtherReason: { type: String },
  firstJobRelatedToCollegeCourseYES: { type: String },
  firstJobRelatedToCollegeCourseNO: { type: String },
});

const EmploymentModel = mongoose.model('Employment', employmentSchema);

module.exports = EmploymentModel;
