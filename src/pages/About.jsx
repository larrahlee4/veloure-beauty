function About() {
  return (
    <section className="space-y-10">
      <div className="rounded-[2.5rem] bg-[var(--sand)] px-10 py-14">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">
          Visit Velouré
        </p>
        <h1 className="font-display text-4xl md:text-5xl">
          A quiet luxury studio in the heart of the city.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-[var(--ink)]/70">
          Stop by for consultations, private rituals, and curated product edits.
          We are here to help you build a routine that fits your lifestyle.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Studio Location',
            text: 'SM Megacenter Cabanatuan, General Tinio Street, Cabanatuan City, 3100 Nueva Ecija',
            href:
              'https://www.google.com/maps/dir//SM+Megacenter+Cabanatuan,+General+Tinio+Street,+Cabanatuan+City,+3100+Nueva+Ecija/@15.4903,120.9682,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x339729b1de95792d:0x2874e66774b96e64!2m2!1d120.9679142!2d15.4878374?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s-6-5.5-6-10a6 6 0 1 1 12 0c0 4.5-6 10-6 10Z" />
                <circle cx="12" cy="11" r="2.5" />
              </svg>
            ),
          },
          {
            title: 'Contact Number',
            text: '0956 557 2455',
            href: 'tel:+639565572455',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 4l4 1 2 5-3 2a12 12 0 0 0 6 6l2-3 5 2 1 4c-8 3-18-7-15-15Z" />
              </svg>
            ),
          },
          {
            title: 'Email Us',
            text: 'espregantekris@gmail.com',
            href: 'mailto:espregantekris@gmail.com',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            ),
          },
          {
            title: 'Facebook',
            text: 'facebook.com/share/1A7JiPfZPG/',
            href: 'https://www.facebook.com/share/1A7JiPfZPG/',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v3H7v3h3v5h3v-5h3l1-3h-4V9a1 1 0 0 1 1-1Z" />
              </svg>
            ),
          },
        ].map((item) => (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-3xl border border-[var(--ink)]/10 bg-white/80 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_60px_-40px_rgba(59,51,40,0.6)]"
          >
            <div className="flex items-center gap-3 text-[var(--gold)]">
              {item.icon}
              <p className="font-display text-2xl text-[var(--ink)]">{item.title}</p>
            </div>
            <p className="mt-2 text-sm text-[var(--ink)]/70">{item.text}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

export default About
