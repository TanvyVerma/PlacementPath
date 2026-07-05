const Experience = require('../models/Experience');

// GET ALL COMPANIES WITH EXPERIENCE COUNT
const getCompanies = async (req, res) => {
  try {
    const companies = await Experience.aggregate([
      { $match: { isApproved: true } },
      {
        $group: {
          _id: '$company',
          totalExperiences: { $sum: 1 },
          selectedCount: {
            $sum: { $cond: [{ $eq: ['$outcome', 'selected'] }, 1, 0] }
          },
          avgDifficulty: { $push: '$difficulty' }
        }
      },
      {
        $project: {
          company: '$_id',
          totalExperiences: 1,
          selectedCount: 1,
          selectionRate: {
            $multiply: [
              { $divide: ['$selectedCount', '$totalExperiences'] },
              100
            ]
          }
        }
      },
      { $sort: { totalExperiences: -1 } }
    ]);

    res.status(200).json({
      success: true,
      count: companies.length,
      companies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET TOPIC FREQUENCY ANALYSIS FOR A COMPANY
const getCompanyAnalysis = async (req, res) => {
  try {
    const { company } = req.params;

    // Get all experiences for this company
    const experiences = await Experience.find({
      company: { $regex: company, $options: 'i' },
      isApproved: true
    });

    if (experiences.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No experiences found for this company'
      });
    }

    // Count topic frequency across all rounds
    const topicCount = {};
    let totalRounds = 0;

    experiences.forEach(exp => {
      exp.rounds.forEach(round => {
        totalRounds++;
        round.topics.forEach(topic => {
          const normalized = topic.trim().toLowerCase();
          topicCount[normalized] = (topicCount[normalized] || 0) + 1;
        });
      });
    });

    // Convert to array and calculate percentage
    const topicFrequency = Object.entries(topicCount)
      .map(([topic, count]) => ({
        topic: topic.charAt(0).toUpperCase() + topic.slice(1),
        count,
        percentage: Math.round((count / experiences.length) * 100)
      }))
      .sort((a, b) => b.count - a.count);

    // Round type distribution
    const roundTypes = {};
    experiences.forEach(exp => {
      exp.rounds.forEach(round => {
        roundTypes[round.roundType] = (roundTypes[round.roundType] || 0) + 1;
      });
    });

    // Difficulty distribution
    const difficultyCount = { easy: 0, medium: 0, hard: 0 };
    experiences.forEach(exp => {
      difficultyCount[exp.difficulty]++;
    });

    // Selection rate
    const selectedCount = experiences.filter(
      exp => exp.outcome === 'selected'
    ).length;

    res.status(200).json({
      success: true,
      company,
      totalExperiences: experiences.length,
      selectionRate: Math.round((selectedCount / experiences.length) * 100),
      topicFrequency,
      roundTypes,
      difficultyDistribution: difficultyCount,
      averageRounds: Math.round(
        experiences.reduce((sum, exp) => sum + exp.rounds.length, 0) /
        experiences.length
      )
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { getCompanies, getCompanyAnalysis };