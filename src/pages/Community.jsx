function Community() {
  return (
    <section className="space-y-10">
      <div className="rounded-[2.5rem] bg-[var(--sand)] px-10 py-14">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">
          Community
        </p>
        <h1 className="font-display text-4xl md:text-5xl">
          A ritual-minded community of glow seekers.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-[var(--ink)]/70">
          Join monthly masterclasses, ingredient deep-dives, and guided routines
          hosted by our estheticians.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {[
          { title: 'Glow Sessions', text: 'Weekly live rituals and Q&A.' },
          { title: 'Ingredient Lab', text: 'Explore what powers your products.' },
          { title: 'Creator Collective', text: 'Share routines and earn rewards.' },
          { title: 'Member Stories', text: 'Real journeys, real glow.' },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-[var(--ink)]/10 bg-white/80 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_60px_-40px_rgba(59,51,40,0.6)]"
          >
            <p className="font-display text-2xl">{item.title}</p>
            <p className="mt-2 text-sm text-[var(--ink)]/70">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Community
