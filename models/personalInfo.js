// models/PersonalInfoModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const personalInfoSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  emailadd: { type: String },
  contactnumber: { type: String },
  civilstatus: { type: String },
  gender: { type: String },
  birthday: { type: Date },
  regionorigin: { type: String },
  province: { type: String },
  residence: { type: String },
});

const personalInfoModel = mongoose.model('PersonalInfo', personalInfoSchema);

module.exports = personalInfoModel;
