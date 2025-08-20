export const metadata = {
  title: 'How to Set Your North Star — Front Forum Focus',
  description: 'Define and operationalize your North Star so daily work aligns.'
};

export default function HowToNorthStarPage() {
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Set your North Star in Greta',
    description: 'Define and operationalize your North Star so daily work aligns.',
    step: [
      { '@type': 'HowToStep', name: 'Open Greta', text: 'Create your workspace.' },
      { '@type': 'HowToStep', name: 'Define your North Star', text: 'Write a clear, measurable objective.' },
      { '@type': 'HowToStep', name: 'Link meetings', text: 'Attach upcoming meetings to the objective.' },
      { '@type': 'HowToStep', name: 'Triage tasks', text: 'Prioritize tasks that move the North Star.' },
      { '@type': 'HowToStep', name: 'Weekly review', text: 'Review outcomes and adjust focus.' }
    ]
  };

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">How to set your North Star</h1>
        <p className="text-white/80 mb-6">A simple workflow to align your daily work with your long-term objective.</p>
        <ol className="list-decimal space-y-4 pl-6">
          <li>
            <strong>Open Greta</strong>
            <p className="text-white/80">Create your workspace.</p>
          </li>
          <li>
            <strong>Define your North Star</strong>
            <p className="text-white/80">Write a clear, measurable objective.</p>
          </li>
          <li>
            <strong>Link meetings</strong>
            <p className="text-white/80">Attach upcoming meetings to the objective.</p>
          </li>
          <li>
            <strong>Triage tasks</strong>
            <p className="text-white/80">Prioritize tasks that move the North Star.</p>
          </li>
          <li>
            <strong>Weekly review</strong>
            <p className="text-white/80">Review outcomes and adjust focus.</p>
          </li>
        </ol>
      </main>
    </div>
  );
}

