'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '../../lib/api';

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    company: '',
    collegeTier: '',
    difficulty: '',
    outcome: ''
  });

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.company) params.append('company', filters.company);
      if (filters.collegeTier) params.append('collegeTier', filters.collegeTier);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.outcome) params.append('outcome', filters.outcome);

      const res = await API.get(`/api/experiences?${params.toString()}`);
      setExperiences(res.data.experiences);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchExperiences();
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">
            Interview Experiences
          </h1>
          <p className="text-[#666666]">
            Real experiences from students across tier 2/3 colleges
          </p>
        </div>

        {/* Filters */}
        <form onSubmit={handleSearch} className="bg-white border border-[#E5E0D8] rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              name="company"
              value={filters.company}
              onChange={handleFilterChange}
              placeholder="Search company..."
              className="border border-[#E5E0D8] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8442A] bg-[#FAF7F2]"
            />
            <select
              name="collegeTier"
              value={filters.collegeTier}
              onChange={handleFilterChange}
              className="border border-[#E5E0D8] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8442A] bg-[#FAF7F2]"
            >
              <option value="">All Tiers</option>
              <option value="tier1">Tier 1</option>
              <option value="tier2">Tier 2</option>
              <option value="tier3">Tier 3</option>
            </select>
            <select
              name="difficulty"
              value={filters.difficulty}
              onChange={handleFilterChange}
              className="border border-[#E5E0D8] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8442A] bg-[#FAF7F2]"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select
              name="outcome"
              value={filters.outcome}
              onChange={handleFilterChange}
              className="border border-[#E5E0D8] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E8442A] bg-[#FAF7F2]"
            >
              <option value="">All Outcomes</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#E8442A] hover:bg-[#d63d25] text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Search
          </button>
        </form>

        {/* Results */}
        {loading ? (
          <p className="text-[#666666]">Loading experiences...</p>
        ) : experiences.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">No experiences found</h3>
            <p className="text-[#666666]">Try different filters or be the first to share</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {experiences.map(exp => (
              <div
                key={exp._id}
                className="bg-white border border-[#E5E0D8] rounded-xl p-6 hover:border-[#E8442A] transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-[#1A1A1A]">{exp.company}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        exp.outcome === 'selected'
                          ? 'bg-green-100 text-green-700'
                          : exp.outcome === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {exp.outcome}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-[#FAF7F2] text-[#666666] border border-[#E5E0D8]">
                        {exp.difficulty}
                      </span>
                    </div>
                    <p className="text-[#666666]">
                      {exp.role} · {exp.collegeTier} · {exp.year}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-[#E8442A] font-bold">▲ {exp.upvoteCount}</div>
                    <div className="text-[#666666] text-sm">{exp.rounds.length} rounds</div>
                  </div>
                </div>
                <p className="text-[#666666] text-sm line-clamp-2">
                  {exp.overallDescription}
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {exp.rounds.slice(0, 3).flatMap(r => r.topics).slice(0, 5).map((topic, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-[#FAF7F2] border border-[#E5E0D8] rounded-full text-[#666666]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}