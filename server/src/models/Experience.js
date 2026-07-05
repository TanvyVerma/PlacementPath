const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
  roundNumber: {
    type: Number,
    required: true
  },
  roundType: {
    type: String,
    enum: ['online-assessment', 'technical', 'hr', 'managerial', 'group-discussion'],
    required: true
  },
  topics: [{
    type: String,
    trim: true
  }],
  questions: [{
    type: String,
    trim: true
  }],
  duration: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
});

const experienceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Job role is required'],
    trim: true
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true
  },
  collegeTier: {
    type: String,
    enum: ['tier1', 'tier2', 'tier3'],
    required: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: 2015,
    max: new Date().getFullYear()
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  outcome: {
    type: String,
    enum: ['selected', 'rejected', 'pending'],
    required: true
  },
  rounds: [roundSchema],
  overallDescription: {
    type: String,
    required: [true, 'Overall description is required'],
    trim: true
  },
  preparationTips: {
    type: String,
    trim: true
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  upvoteCount: {
    type: Number,
    default: 0
  },
  isApproved: {
    type: Boolean,
    default: true
  },
  isFlagged: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for fast searching
experienceSchema.index({ company: 1, year: -1 });
experienceSchema.index({ collegeTier: 1, company: 1 });
experienceSchema.index({ outcome: 1, company: 1 });

module.exports = mongoose.model('Experience', experienceSchema);