const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeUrl: { type: String, required: true },
  coverLetter: { type: String },
  status: { type: String, enum: ['Applied', 'Reviewed', 'Interview', 'Rejected', 'Hired'], default: 'Applied' }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
