import Link from 'next/link'

export const metadata = {
  title: 'Podcast & Vibes — FrontForumFocus',
  description: 'Episodes, show notes, and vibes',
}

export default function PodcastPage() {
  return (
    <main style={{padding: '4rem', fontFamily: 'system-ui, sans-serif'}}>
      <h1>Podcast & Vibes</h1>
      <p style={{maxWidth: 720}}>Listen to conversations about civic design, community building, and meaningful engagement. This page will host an embedded player and episode list.</p>

      <section style={{marginTop: '2rem'}}>
        <h2>Latest episode</h2>
        <div style={{border: '1px dashed #ccc', padding: '1.5rem', borderRadius: 8}}>
          <p>Episode player placeholder. Consider a minimal HTML5 audio player or an embeddable widget.</p>
        </div>
      </section>

      <section style={{marginTop: '2rem'}}>
        <h2>Subscribe</h2>
        <p>Subscribe on your favorite podcast platform: Apple Podcasts, Spotify, RSS.</p>
        <Link href="/waitlist">Subscribe / Join the community</Link>
      </section>
    </main>
  )
}
