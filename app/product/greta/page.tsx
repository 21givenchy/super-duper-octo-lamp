import Link from 'next/link'

export const metadata = {
  title: 'Greta — FrontForumFocus',
  description: 'Greta: individual-focused conversation tools',
}

export default function GretaPage() {
  return (
    <main style={{padding: '4rem', fontFamily: 'system-ui, sans-serif'}}>
      <h1>Greta</h1>
      <p style={{maxWidth: 720}}>Greta is our individual-facing app for running focused conversations, surfacing consensus, and measuring impact. This page is a starter skeleton for the product details and an interactive demo area.</p>

      <section style={{marginTop: '2rem'}}>
        <h2>Interactive demo (placeholder)</h2>
        <div style={{border: '1px dashed #ccc', padding: '1.5rem', borderRadius: 8}}>
          <p>Replace this area with a short interactive carousel or embedded demo of Greta.</p>
        </div>
      </section>

      <section style={{marginTop: '2rem'}}>
        <h2>Try or Join</h2>
        <p>Want to try Greta? Join the waitlist or contact us for a demo.</p>
        <Link href="/waitlist">Join the waitlist</Link>
      </section>
    </main>
  )
}
