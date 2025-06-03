const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  requiredSkills: [{ type: String }],
  teamSize: { type: Number },
  status: { type: String, enum: ['planning', 'active', 'completed'], required: true },
  managerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
