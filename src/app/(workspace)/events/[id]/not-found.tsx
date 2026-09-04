import Link from "next/link"

export default function EventNotFound() {
  return (
    <section className="aion-screen">
      <p className="aion-label">404</p>
      <h1>Event not in the book</h1>
      <p>That identifier is not in the current catalog.</p>
      <Link className="aion-button" data-primary="true" href="/events">
        Back to events
      </Link>
    </section>
  )
}
