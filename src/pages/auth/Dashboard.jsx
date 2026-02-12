function Dashboard() {
  return (
    <section className="space-y-8">
      <div className="border border-[var(--ink)] bg-white px-6 py-8 md:px-10">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--ink)]/65">
          Dashboard
        </p>
        <h1 className="mt-3 text-4xl font-black uppercase leading-none md:text-5xl">Your rituals</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink)]/75">
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
            className="border border-[var(--ink)] bg-white p-6 transition hover:-translate-y-1"
          >
            <p className="text-lg font-black uppercase tracking-[0.08em] text-[var(--ink)]">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--ink)]/75">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Dashboard
