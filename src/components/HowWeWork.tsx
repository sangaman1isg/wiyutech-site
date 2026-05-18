const steps = [
  {
    title: "Discovery",
    body: "A 15-minute conversation. We learn your business, your customers, and what\u2019s actually broken.",
  },
  {
    title: "Build",
    body: "We build fast and you see the work mid-way to shape it. No 6-month deathmarches.",
  },
  {
    title: "Launch",
    body: "We deploy, train your team, and route your first inquiries the day we go live.",
  },
  {
    title: "Support",
    body: "30 days of free support after launch. Optional monthly retainers from $40.",
  },
];

export default function HowWeWork() {
  return (
    <section
      id="process"
      className="relative border-b border-(--color-line) bg-(--color-bg-soft)"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-32">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-4">— How we work</p>
          <h2 className="headline text-[clamp(2.5rem,5.5vw,5rem)]">
            Four steps.{" "}
            <span className="text-(--color-brand)">Two weeks.</span>
          </h2>
        </div>

        {/* Steps grid — gap-px + bg-[color-line] draws 1px dividers between cards */}
        <div className="grid gap-px bg-(--color-line) md:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-(--color-bg-soft) p-8">
              <div className="numeral mb-8 text-6xl text-(--color-brand)">
                0{i + 1}
              </div>
              <h3 className="headline text-2xl">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-(--color-fg-muted)">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
