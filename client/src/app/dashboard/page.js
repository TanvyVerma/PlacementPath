'use client';

import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import API from '../../lib/api';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [myExperiences, setMyExperiences] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (user) {
      API.get('/api/experiences/my')
        .then(res => setMyExperiences(res.data.experiences))
        .catch(err => console.error(err))
        .finally(() => setFetching(false));
    }
  }, [user]);

  if (loading) return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <p className="text-[#666666]">Loading...</p>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#1A1A1A] font-semibold text-xl mb-4">Please login to view dashboard</p>
        <Link href="/login" className="bg-[#E8442A] text-white px-6 py-2 rounded-lg">Login</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-1">
            Welcome back, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-[#666666]">{user.college} · {user.collegeTier}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-6">
            <div className="text-3xl font-bold text-[#E8442A] mb-1">
              {myExperiences.length}
            </div>
            <div className="text-[#666666]">Experiences Shared</div>
          </div>
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-6">
            <div className="text-3xl font-bold text-[#E8442A] mb-1">
              {myExperiences.reduce((sum, exp) => sum + exp.upvoteCount, 0)}
            </div>
            <div className="text-[#666666]">Total Upvotes Received</div>
          </div>
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-6">
            <div className="text-3xl font-bold text-[#E8442A] mb-1">
              {myExperiences.filter(e => e.outcome === 'selected').length}
            </div>
            <div className="text-[#666666]">Selected Outcomes</div>
          </div>
        </div>

        {/* My Experiences */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">My Experiences</h2>
          <Link
            href="/submit"
            className="bg-[#E8442A] hover:bg-[#d63d25] text-white px-5 py-2 rounded-lg font-medium transition-colors"
          >
            + Share New
          </Link>
        </div>

        {fetching ? (
          <p className="text-[#666666]">Loading your experiences...</p>
        ) : myExperiences.length === 0 ? (
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-12 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
              No experiences yet
            </h3>
            <p className="text-[#666666] mb-6">
              Share your interview experience and help thousands of students prepare better.
            </p>
            <Link
              href="/submit"
              className="bg-[#E8442A] text-white px-6 py-2 rounded-lg font-medium"
            >
              Share Your First Experience
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {myExperiences.map(exp => (
              <div
                key={exp._id}
                className="bg-white border border-[#E5E0D8] rounded-xl p-6 flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-[#1A1A1A] text-lg">{exp.company}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      exp.outcome === 'selected'
                        ? 'bg-green-100 text-green-700'
                        : exp.outcome === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {exp.outcome}
                    </span>
                  </div>
                  <p className="text-[#666666] text-sm">
                    {exp.role} · {exp.year} · {exp.difficulty}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[#E8442A] font-bold">{exp.upvoteCount} upvotes</div>
                  <div className="text-[#666666] text-sm">{exp.rounds.length} rounds</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}