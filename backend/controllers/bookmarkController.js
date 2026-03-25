const Bookmark = require('../models/Bookmark');

const saveJob = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const alreadySaved = await Bookmark.findOne({ userId: req.user._id, jobId });
    if (alreadySaved) return res.status(400).json({ message: 'Job already saved' });

    const bookmark = new Bookmark({ userId: req.user._id, jobId });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user._id }).populate('jobId');
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeSavedJob = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ userId: req.user._id, jobId: req.params.jobId });
    if (!bookmark) return res.status(404).json({ message: 'Bookmark not found' });
    
    await bookmark.deleteOne();
    res.json({ message: 'Bookmark removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveJob, getSavedJobs, removeSavedJob };
