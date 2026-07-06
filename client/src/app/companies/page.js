'use client';

import { useState, useEffect } from 'react';
import API from '../../lib/api';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  useEffect(() => {
    API.get('/api/companies')
      .then(res => setCompanies(res.data.companies))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const fetchAnalysis = async (company) => {
    setSelected(company);
    setAnalysisLoading(true);
    try {
      const res = await API.get(`/api/companies/${company}/analysis`);
      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalysisLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Companies</h1>
        <p className="text-[#666666] mb-8">Click any company to see DSA topic frequency analysis</p>

        {loading ? (
          <p className="text-[#666666]">Loading companies...</p>
        ) : companies.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏢</div>
            <p className="text-[#666666]">No companies yet. Share your experience first.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Company List */}
            <div className="space-y-3">
              {companies.map(comp => (
                <div
                  key={comp._id}
                  onClick={() => fetchAnalysis(comp.company)}
                  className={`bg-white border rounded-xl p-5 cursor-pointer transition-colors ${
                    selected === comp.company
                      ? 'border-[#E8442A]'
                      : 'border-[#E5E0D8] hover:border-[#E8442A]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-[#1A1A1A] text-lg">{comp.company}</h3>
                      <p className="text-[#666666] text-sm">{comp.totalExperiences} experiences</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[#E8442A] font-bold">
                        {Math.round(comp.selectionRate)}%
                      </div>
                      <div className="text-[#666666] text-xs">selection rate</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Analysis Panel */}
            <div>
              {!selected ? (
                <div className="bg-white border border-[#E5E0D8] rounded-xl p-12 text-center">
                  <div className="text-5xl mb-4">📊</div>
                  <p className="text-[#666666]">Select a company to see topic frequency analysis</p>
                </div>
              ) : analysisLoading ? (
                <div className="bg-white border border-[#E5E0D8] rounded-xl p-12 text-center">
                  <p className="text-[#666666]">Loading analysis...</p>
                </div>
              ) : analysis ? (
                <div className="bg-white border border-[#E5E0D8] rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">{analysis.company}</h2>
                  <p className="text-[#666666] mb-6">
                    {analysis.totalExperiences} experiences · {analysis.selectionRate}% selection rate · avg {analysis.averageRounds} rounds
                  </p>

                  <h3 className="font-bold text-[#1A1A1A] mb-4">DSA Topic Frequency</h3>
                  <div className="space-y-3">
                    {analysis.topicFrequency.slice(0, 8).map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-[#1A1A1A]">{item.topic}</span>
                          <span className="text-[#E8442A] font-bold">{item.percentage}%</span>
                        </div>
                        <div className="h-2 bg-[#FAF7F2] rounded-full">
                          <div
                            className="h-2 bg-[#E8442A] rounded-full transition-all"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-bold text-[#1A1A1A] mt-6 mb-3">Difficulty Distribution</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(analysis.difficultyDistribution).map(([level, count]) => (
                      <div key={level} className="bg-[#FAF7F2] rounded-lg p-3 text-center">
                        <div className="font-bold text-[#E8442A]">{count}</div>
                        <div className="text-xs text-[#666666] capitalize">{level}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}