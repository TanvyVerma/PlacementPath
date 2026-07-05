const Experience = require('../models/Experience');

// SUBMIT EXPERIENCE
const submitExperience = async (req, res) => {
  try {
    const {
      company,
      role,
      college,
      collegeTier,
      year,
      difficulty,
      outcome,
      rounds,
      overallDescription,
      preparationTips,
      isAnonymous
    } = req.body;

    const experience = await Experience.create({
      student: req.user.id,
      company,
      role,
      college,
      collegeTier,
      year,
      difficulty,
      outcome,
      rounds,
      overallDescription,
      preparationTips,
      isAnonymous: isAnonymous || false
    });

    res.status(201).json({
      success: true,
      message: 'Experience submitted successfully',
      experience
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET ALL EXPERIENCES WITH SEARCH AND FILTER
const getExperiences = async (req, res) => {
  try {
    const {
      company,
      collegeTier,
      year,
      difficulty,
      outcome,
      role,
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object dynamically
    const filter = { isApproved: true };

    if (company) filter.company = { $regex: company, $options: 'i' };
    if (collegeTier) filter.collegeTier = collegeTier;
    if (year) filter.year = parseInt(year);
    if (difficulty) filter.difficulty = difficulty;
    if (outcome) filter.outcome = outcome;
    if (role) filter.role = { $regex: role, $options: 'i' };

    const total = await Experience.countDocuments(filter);

    const experiences = await Experience.find(filter)
      .populate('student', 'name college')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Hide student info for anonymous submissions
    const sanitized = experiences.map(exp => {
      const obj = exp.toObject();
      if (obj.isAnonymous) {
        obj.student = { name: 'Anonymous', college: obj.college };
      }
      return obj;
    });

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      experiences: sanitized
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET SINGLE EXPERIENCE
const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
      .populate('student', 'name college');

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    const obj = experience.toObject();
    if (obj.isAnonymous) {
      obj.student = { name: 'Anonymous', college: obj.college };
    }

    res.status(200).json({
      success: true,
      experience: obj
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPVOTE EXPERIENCE
const upvoteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    const alreadyUpvoted = experience.upvotes.includes(req.user.id);

    if (alreadyUpvoted) {
      // Remove upvote
      experience.upvotes = experience.upvotes.filter(
        id => id.toString() !== req.user.id.toString()
      );
      experience.upvoteCount = experience.upvotes.length;
    } else {
      // Add upvote
      experience.upvotes.push(req.user.id);
      experience.upvoteCount = experience.upvotes.length;
    }

    await experience.save();

    res.status(200).json({
      success: true,
      message: alreadyUpvoted ? 'Upvote removed' : 'Upvoted successfully',
      upvoteCount: experience.upvoteCount
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET MY SUBMISSIONS
const getMyExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ student: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: experiences.length,
      experiences
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  submitExperience,
  getExperiences,
  getExperienceById,
  upvoteExperience,
  getMyExperiences
};