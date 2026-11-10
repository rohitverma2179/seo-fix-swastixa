"use client";

export default function AwardList() {
  const awards = [
    "🏆 Design Excellence Award 2024",
    "⭐ Best Startup UI Design 2025",
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
        Awards &amp; Recognition
      </h1>
      <p className="text-gray-600 mb-8">
        Recognition earned by the Swastixa Digital team for design, digital marketing
        and video production work.
      </p>
      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        {awards.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
    </section>
  );
}
