const express = require('express');
const { saveJob, getSavedJobs, removeSavedJob } = require('../controllers/bookmarkController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/:jobId')
  .post(protect, saveJob)
  .delete(protect, removeSavedJob);

router.get('/', protect, getSavedJobs);

module.exports = router;
