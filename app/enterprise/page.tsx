import Link from 'next/link'

export const metadata = {
  title: 'Enterprise — FrontForumFocus',
  description: 'Impact dashboard and enterprise offerings',
}

export default function EnterprisePage() {
  return (
    <main style={{padding: '4rem', fontFamily: 'system-ui, sans-serif'}}>
      <h1>Enterprise & Impact Dashboard</h1>
      <p style={{maxWidth: 720}}>For organizations: measure conversation health, track impact metrics, and run focused engagement at scale. This is a placeholder for the enterprise product page and demo charts.</p>

      <section style={{marginTop: '2rem'}}>
        <h2>Demo dashboard</h2>
        <div style={{border: '1px dashed #ccc', padding: '1.5rem', borderRadius: 8}}>
          <p>Insert mock charts or an interactive demo here.</p>
        </div>
      </section>

      <section style={{marginTop: '2rem'}}>
        <h2>Request a demo</h2>
        <p>Contact us to schedule a demo and see enterprise integrations (SSO, data exports, SLAs).</p>
        <Link href="/waitlist">Request demo / Join waitlist</Link>
      </section>
    </main>
  )
}
