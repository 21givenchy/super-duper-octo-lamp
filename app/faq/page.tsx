export const metadata = {
  title: 'FAQ — Front Forum Focus',
  description: 'Answers to common questions about Front Forum Focus (Greta).'
};

export default function FaqPage() {
  const faqs = [
    {
      q: 'What is Front Forum Focus (Greta)?',
      a: 'An OS that aligns your meetings, tasks, and notes to a single North Star so you execute with focus.'
    },
    {
      q: 'Who is it for?',
      a: 'Founders and small teams who need strategic clarity day-to-day.'
    },
    {
      q: 'How much does it cost?',
      a: '$15/month billed annually ($180). Early members lock in charter pricing.'
    },
    {
      q: 'Do you offer onboarding?',
      a: 'Yes, a 30-minute personal onboarding call to set your North Star.'
    }
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map(({ q, a }) => (
            <div key={q}>
              <h2 className="text-xl font-semibold">{q}</h2>
              <p className="text-white/80 mt-2">{a}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

