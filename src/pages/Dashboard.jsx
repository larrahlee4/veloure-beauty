function Dashboard() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--gold)]">
          Dashboard
        </p>
        <h1 className="font-display text-4xl">Your rituals</h1>
        <p className="mt-2 text-sm text-[color:var(--ink)]/70">
          Track routines, reorder essentials, and view your glow progress.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: 'Active Routine', detail: 'Morning + Evening, 6 steps' },
          { title: 'Refill Schedule', detail: 'Next shipment in 12 days' },
          { title: 'Skin Notes', detail: 'Balanced, hydrated, calm' },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-[var(--ink)]/10 bg-white/80 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_60px_-40px_rgba(59,51,40,0.6)]"
          >
            <p className="font-display text-2xl">{item.title}</p>
            <p className="mt-2 text-sm text-[color:var(--ink)]/70">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Dashboard
