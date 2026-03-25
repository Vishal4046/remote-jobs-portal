const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    logoUrl: { type: String }
  },
  salaryRange: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' }
  },
  skillsRequired: [String],
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'], required: true },
  location: { type: String, default: 'Remote' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
