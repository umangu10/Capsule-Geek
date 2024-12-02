const Lab = require('../models/Lab');
const User = require('../models/User');

exports.getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.find().select('-instructions');
    res.json({
      success: true,
      count: labs.length,
      data: labs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching labs',
      error: error.message
    });
  }
};

exports.getLabById = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id);
    if (!lab) {
      return res.status(404).json({
        success: false,
        message: 'Lab not found'
      });
    }

    res.json({
      success: true,
      data: lab
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lab',
      error: error.message
    });
  }
};

exports.updateLabProgress = async (req, res) => {
  try {
    const { labId } = req.params;
    const { progress, timeSpent } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update or create lab progress
    const labProgressIndex = user.labProgress.findIndex(
      p => p.labId.toString() === labId
    );

    if (labProgressIndex > -1) {
      user.labProgress[labProgressIndex].progress = progress;
      user.labProgress[labProgressIndex].timeSpent += timeSpent || 0;
      user.labProgress[labProgressIndex].lastAccessed = new Date();
    } else {
      user.labProgress.push({
        labId,
        progress,
        timeSpent: timeSpent || 0,
        lastAccessed: new Date()
      });
    }

    await user.save();

    res.json({
      success: true,
      data: user.labProgress.find(p => p.labId.toString() === labId)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating lab progress',
      error: error.message
    });
  }
};

exports.startPentestingLab = async (req, res) => {
  try {
    const labId = req.params.id;
    // Logic to retrieve lab details and initialize the environment
    const lab = await Lab.findById(labId);
    if (!lab) {
      return res.status(404).json({ success: false, message: 'Lab not found' });
    }

    // Here you would set up the environment for the lab
    // For example, you might return a URL to a frontend component that simulates the terminal
    res.json({
      success: true,
      lab: {
        id: lab.id,
        title: lab.title,
        description: lab.description,
        terminalUrl: `/labs/pentesting/${labId}/terminal` // Example URL for the terminal
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error starting lab', error: error.message });
  }
}; 