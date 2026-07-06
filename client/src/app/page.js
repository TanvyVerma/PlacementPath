import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-16">
        <div className="inline-block border border-[#E5E0D8] text-[#666666] text-sm font-medium px-4 py-1 rounded-full mb-8 tracking-widest uppercase">
          Crowdsourced · Free Forever
        </div>
        <h1 className="text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight max-w-3xl">
          Stop preparing{' '}
          <span className="text-[#E8442A] italic">in the dark.</span>
        </h1>
        <p className="text-xl text-[#666666] max-w-2xl mb-10">
          PlacementPath is the Wikipedia of placement preparation — built by
          students who sat the interview, for the students about to sit it next.
          Real experiences. Real topic frequencies. Real timelines.
        </p>
        <div className="flex gap-4">
          <Link
            href="/experiences"
            className="bg-[#E8442A] hover:bg-[#d63d25] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2"
          >
            Browse experiences →
          </Link>
          <Link
            href="/register"
            className="border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Share yours
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-[#E5E0D8] py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[#E8442A] mb-2">500+</div>
            <div className="text-[#666666] font-medium">Interview Experiences</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#E8442A] mb-2">50+</div>
            <div className="text-[#666666] font-medium">Companies Covered</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#E8442A] mb-2">100%</div>
            <div className="text-[#666666] font-medium">Free Forever</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-12">
          How PlacementPath Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 border border-[#E5E0D8]">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Students Share</h3>
            <p className="text-[#666666]">
              Students who gave interviews share their complete experience — rounds, topics asked, questions, and outcome.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-[#E5E0D8]">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">We Analyze</h3>
            <p className="text-[#666666]">
              Our engine processes all experiences and generates company-wise DSA topic frequency reports automatically.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-[#E5E0D8]">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">You Prepare Smart</h3>
            <p className="text-[#666666]">
              You know exactly which topics to focus on for your target company. No more random preparation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1A1A1A] py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Prepare Smarter?
        </h2>
        <p className="text-[#999999] text-lg mb-8">
          Join thousands of tier 2/3 students who prepare with data, not guesswork.
        </p>
        <Link
          href="/register"
          className="bg-[#E8442A] hover:bg-[#d63d25] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
        >
          Get Started Free
        </Link>
      </section>

    </main>
  );
}