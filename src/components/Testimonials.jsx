import useReveal from '../hooks/useReveal';

const testimonials = [
  {
    badge: '200K+ Views Per Reel',
    quote: 'Frame Studio transformed our Instagram presence. Our Reels now consistently hit 200K+ views — every single week. The ROI is undeniable.',
    name: 'Sarah Chen',
    title: 'CEO, Luminary Brand',
  },
  {
    badge: '300% Traffic Increase',
    quote: 'Professional, fast, and the results speak for themselves. Our product launch video drove 300% more website traffic in the first seven days.',
    name: 'Marcus Reid',
    title: 'Marketing Director, NOVA Fitness',
  },
  {
    badge: '10× Return on Investment',
    quote: 'I was genuinely skeptical about investing this much in video production. Our first batch of Reels paid for itself ten times over. Absolutely worth it.',
    name: 'Priya Sharma',
    title: 'Founder, Velvet Collective',
  },
];

function Card({ t, delay }) {
  const ref = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay} flex flex-col bg-[#080808] border border-[#1A1A1A] p-8 lg:p-10`}
    >
      {/* Result badge */}
      <div className="inline-flex w-fit items-center gap-2 border border-[#C9A84C]/20 bg-[#C9A84C]/5 px-3 py-1 mb-8">
        <span className="w-1 h-1 rounded-full bg-[#C9A84C]" />
        <span className="text-[#C9A84C] text-[8px] tracking-[0.4em] uppercase">{t.badge}</span>
      </div>

      {/* Large quote mark */}
      <span className="font-display text-[#1A1A1A] leading-none select-none mb-3"
            style={{ fontSize: '4.5rem' }}>"</span>

      {/* Quote */}
      <p className="text-[#7A7A7A] text-sm leading-[1.9] flex-1 mb-8">{t.quote}</p>

      {/* Author */}
      <div className="border-t border-[#1A1A1A] pt-6">
        <p className="text-[#F2EFE8] text-sm font-medium">{t.name}</p>
        <p className="text-[#4A4A4A] text-xs mt-1">{t.title}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const headRef = useReveal();
  return (
    <section className="bg-[#050505] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div ref={headRef} className="reveal mb-16 text-center">
          <p className="text-[#C9A84C] text-[9px] tracking-[0.55em] uppercase mb-5">Client Results</p>
          <h2 className="font-display font-light text-[#F2EFE8]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
            Words from brands
            <br />
            <em className="italic text-[#3A3A3A]">that grew.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <Card key={t.name} t={t} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
