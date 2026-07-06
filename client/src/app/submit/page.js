'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import API from '../../lib/api';

const DSA_TOPICS = [
  'Arrays', 'Strings', 'Linked List', 'Trees', 'Graphs',
  'Dynamic Programming', 'Recursion', 'Backtracking', 'Sorting',
  'Binary Search', 'Hashing', 'Stacks', 'Queues', 'Heaps',
  'Greedy', 'Bit Manipulation', 'Math', 'System Design'
];

export default function SubmitPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    college: user?.college || '',
    collegeTier: user?.collegeTier || '',
    year: new Date().getFullYear(),
    difficulty: '',
    outcome: '',
    overallDescription: '',
    preparationTips: '',
    isAnonymous: false,
    rounds: [
      {
        roundNumber: 1,
        roundType: '',
        topics: [],
        questions: [''],
        duration: '',
        description: ''
      }
    ]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleRoundChange = (index, field, value) => {
    const updated = [...formData.rounds];
    updated[index][field] = value;
    setFormData({ ...formData, rounds: updated });
  };

  const handleTopicToggle = (roundIndex, topic) => {
    const updated = [...formData.rounds];
    const topics = updated[roundIndex].topics;
    if (topics.includes(topic)) {
      updated[roundIndex].topics = topics.filter(t => t !== topic);
    } else {
      updated[roundIndex].topics = [...topics, topic];
    }
    setFormData({ ...formData, rounds: updated });
  };

  const handleQuestionChange = (roundIndex, qIndex, value) => {
    const updated = [...formData.rounds];
    updated[roundIndex].questions[qIndex] = value;
    setFormData({ ...formData, rounds: updated });
  };

  const addQuestion = (roundIndex) => {
    const updated = [...formData.rounds];
    updated[roundIndex].questions.push('');
    setFormData({ ...formData, rounds: updated });
  };

  const addRound = () => {
    setFormData({
      ...formData,
      rounds: [...formData.rounds, {
        roundNumber: formData.rounds.length + 1,
        roundType: '',
        topics: [],
        questions: [''],
        duration: '',
        description: ''
      }]
    });
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await API.post('/api/experiences', formData);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl font-bold text-[#1A1A1A] mb-4">Please login to share experience</p>
        <a href="/login" className="bg-[#E8442A] text-white px-6 py-2 rounded-lg">Login</a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Share Your Experience</h1>
        <p className="text-[#666666] mb-8">Help thousands of students prepare smarter</p>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-10">
          {[1, 2, 3].map(s => (
            <div key={s} className={`flex-1 h-2 rounded-full transition-colors ${
              s <= step ? 'bg-[#E8442A]' : 'bg-[#E5E0D8]'
            }`} />
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Step 1 - Basic Details */}
        {step === 1 && (
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-8 space-y-5">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Basic Details</h2>
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full border border-[#E5E0D8] rounded-lg px-4 py-2 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8442A]"
                placeholder="Microsoft, Google, Amazon..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-[#E5E0D8] rounded-lg px-4 py-2 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8442A]"
                placeholder="SDE Intern, Software Engineer..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full border border-[#E5E0D8] rounded-lg px-4 py-2 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8442A]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">College Tier</label>
                <select
                  name="collegeTier"
                  value={formData.collegeTier}
                  onChange={handleChange}
                  className="w-full border border-[#E5E0D8] rounded-lg px-4 py-2 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8442A]"
                >
                  <option value="">Select</option>
                  <option value="tier1">Tier 1</option>
                  <option value="tier2">Tier 2</option>
                  <option value="tier3">Tier 3</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full border border-[#E5E0D8] rounded-lg px-4 py-2 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8442A]"
                >
                  <option value="">Select</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Outcome</label>
                <select
                  name="outcome"
                  value={formData.outcome}
                  onChange={handleChange}
                  className="w-full border border-[#E5E0D8] rounded-lg px-4 py-2 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8442A]"
                >
                  <option value="">Select</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#E8442A] hover:bg-[#d63d25] text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2 - Round Details */}
        {step === 2 && (
          <div className="space-y-6">
            {formData.rounds.map((round, rIndex) => (
              <div key={rIndex} className="bg-white border border-[#E5E0D8] rounded-xl p-8">
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-5">Round {round.roundNumber}</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Round Type</label>
                      <select
                        value={round.roundType}
                        onChange={e => handleRoundChange(rIndex, 'roundType', e.target.value)}
                        className="w-full border border-[#E5E0D8] rounded-lg px-4 py-2 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8442A]"
                      >
                        <option value="">Select</option>
                        <option value="online-assessment">Online Assessment</option>
                        <option value="technical">Technical</option>
                        <option value="hr">HR</option>
                        <option value="managerial">Managerial</option>
                        <option value="group-discussion">Group Discussion</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Duration</label>
                      <input
                        type="text"
                        value={round.duration}
                        onChange={e => handleRoundChange(rIndex, 'duration', e.target.value)}
                        className="w-full border border-[#E5E0D8] rounded-lg px-4 py-2 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8442A]"
                        placeholder="60 minutes"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Topics Asked</label>
                    <div className="flex flex-wrap gap-2">
                      {DSA_TOPICS.map(topic => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => handleTopicToggle(rIndex, topic)}
                          className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                            round.topics.includes(topic)
                              ? 'bg-[#E8442A] text-white border-[#E8442A]'
                              : 'bg-[#FAF7F2] text-[#666666] border-[#E5E0D8] hover:border-[#E8442A]'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Questions Asked</label>
                    {round.questions.map((q, qIndex) => (
                      <input
                        key={qIndex}
                        type="text"
                        value={q}
                        onChange={e => handleQuestionChange(rIndex, qIndex, e.target.value)}
                        className="w-full border border-[#E5E0D8] rounded-lg px-4 py-2 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8442A] mb-2"
                        placeholder={`Question ${qIndex + 1}`}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => addQuestion(rIndex)}
                      className="text-[#E8442A] text-sm font-medium hover:underline"
                    >
                      + Add Question
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Round Description</label>
                    <textarea
                      value={round.description}
                      onChange={e => handleRoundChange(rIndex, 'description', e.target.value)}
                      rows={3}
                      className="w-full border border-[#E5E0D8] rounded-lg px-4 py-2 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8442A]"
                      placeholder="Describe what happened in this round..."
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addRound}
              className="w-full border-2 border-dashed border-[#E5E0D8] hover:border-[#E8442A] text-[#666666] hover:text-[#E8442A] py-3 rounded-xl font-medium transition-colors"
            >
              + Add Another Round
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-[#E5E0D8] text-[#1A1A1A] py-3 rounded-lg font-semibold"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-[#E8442A] hover:bg-[#d63d25] text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Final Details */}
        {step === 3 && (
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-8 space-y-5">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Final Details</h2>
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Overall Description</label>
              <textarea
                name="overallDescription"
                value={formData.overallDescription}
                onChange={handleChange}
                rows={4}
                className="w-full border border-[#E5E0D8] rounded-lg px-4 py-2 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8442A]"
                placeholder="Describe your overall experience, the interview culture, what surprised you..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Preparation Tips</label>
              <textarea
                name="preparationTips"
                value={formData.preparationTips}
                onChange={handleChange}
                rows={3}
                className="w-full border border-[#E5E0D8] rounded-lg px-4 py-2 bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#E8442A]"
                placeholder="What would you suggest to someone preparing for this company?"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isAnonymous"
                id="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
                className="w-4 h-4 accent-[#E8442A]"
              />
              <label htmlFor="isAnonymous" className="text-sm text-[#666666]">
                Submit anonymously — your name will not be shown
              </label>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-[#E5E0D8] text-[#1A1A1A] py-3 rounded-lg font-semibold"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-[#E8442A] hover:bg-[#d63d25] text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Experience'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}