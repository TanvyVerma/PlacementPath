import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1 rounded-full mb-6">
          Built for Tier 2 & Tier 3 Engineers
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Stop Preparing Blindly.
          <span className="text-blue-600"> Know Exactly What to Study.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Real interview experiences from students like you. Company-wise DSA topic analysis. 
          Free forever. Built for tier 2/3 college students across India.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/experiences"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Browse Experiences
          </Link>
          <Link
            href="/register"
            className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Share Your Experience
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Interview Experiences</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Companies Covered</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600 font-medium">Free Forever</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How PlacementPath Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Students Share
            </h3>
            <p className="text-gray-600">
              Students who gave interviews share their complete experience — rounds, topics asked, questions, and outcome.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              We Analyze
            </h3>
            <p className="text-gray-600">
              Our engine processes all experiences and generates company-wise DSA topic frequency reports automatically.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              You Prepare Smart
            </h3>
            <p className="text-gray-600">
              You know exactly which topics to focus on for your target company. No more random preparation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Prepare Smarter?
        </h2>
        <p className="text-blue-100 text-lg mb-8">
          Join thousands of tier 2/3 students who prepare with data, not guesswork.
        </p>
        <Link
          href="/register"
          className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
        >
          Get Started Free
        </Link>
      </section>

    </main>
  );
}