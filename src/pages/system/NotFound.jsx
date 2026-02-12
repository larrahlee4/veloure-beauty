import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="grid gap-6 rounded-[2rem] bg-[var(--sand)] p-10 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--gold)]">
        404
      </p>
      <h1 className="font-display text-4xl">Page not found</h1>
      <p className="text-sm text-[color:var(--ink)]/70">
        The page you are looking for is missing. Let&apos;s head back to the glow.
      </p>
      <Link
        to="/"
        className="mx-auto rounded-full bg-[var(--brown)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Return home
      </Link>
    </section>
  )
}

export default NotFound
