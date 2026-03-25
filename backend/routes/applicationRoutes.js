const express = require('express');
const { applyForJob, getMyApplications, getJobApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:jobId', protect, applyForJob);
router.get('/my-applications', protect, restrictTo('Seeker'), getMyApplications);
router.get('/job/:jobId', protect, restrictTo('Recruiter', 'Admin'), getJobApplications);
router.put('/:id/status', protect, restrictTo('Recruiter', 'Admin'), updateApplicationStatus);

module.exports = router;
