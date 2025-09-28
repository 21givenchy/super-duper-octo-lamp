import Link from 'next/link'

export const metadata = {
  title: 'Community — FrontForumFocus',
  description: 'Join the community, contribute, and collaborate',
}

export default function CommunityPage() {
  return (
    <main style={{padding: '4rem', fontFamily: 'system-ui, sans-serif'}}>
      <h1>Community</h1>
      <p style={{maxWidth: 720}}>Join our community to participate in focused conversations, beta tests, and events. We host discussions, workshops, and invite contributors.</p>

      <section style={{marginTop: '2rem'}}>
        <h2>Join</h2>
        <p>We use a waitlist & invite flow for rolling access—join to get updates and an invite link.</p>
        <Link href="/waitlist">Join the waitlist</Link>
      </section>

      <section style={{marginTop: '2rem'}}>
        <h2>Community spaces</h2>
        <ul>
          <li>Discord / Slack (link placeholder)</li>
          <li>Open forum / discussions (TBD)</li>
          <li>Events & workshops</li>
        </ul>
      </section>
    </main>
  )
}
