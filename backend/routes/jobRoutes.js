const express = require('express');
const { getJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getJobs)
  .post(protect, restrictTo('Recruiter', 'Admin'), createJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, restrictTo('Recruiter', 'Admin'), updateJob)
  .delete(protect, restrictTo('Recruiter', 'Admin'), deleteJob);

module.exports = router;
