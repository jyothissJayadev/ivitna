import useReveal from '../hooks/useReveal';

const services = [
  {
    num: '01',
    title: 'Instagram Reels',
    desc: 'Hook-first, algorithm-optimised Reels designed to stop the scroll, earn saves, and drive follower growth every single week.',
    Icon: () => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Brand Films',
    desc: 'Cinematic short films that tell your brand story with emotional depth, precision lighting, and a narrative that sticks.',
    Icon: () => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="13" rx="2" />
        <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="7" y1="6" x2="7" y2="10" />
        <line x1="12" y1="6" x2="12" y2="10" />
        <line x1="17" y1="6" x2="17" y2="10" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Product Videos',
    desc: 'Studio-quality product showcases that make every detail irresistible — turning browsers into buyers with one watch.',
    Icon: () => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Behind The Scenes',
    desc: 'Authentic BTS content that humanises your brand, builds community trust, and fuels the parasocial connection audiences crave.',
    Icon: () => (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
];

function ServiceCard({ s, delay }) {
  const ref = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay} group border border-transparent p-8 lg:p-10 hover:border-[#C9A84C]/50 transition-all duration-500 cursor-default bg-[#050505]`}
    >
      <div className="flex items-start justify-between mb-8">
        <div className="text-[#C9A84C]">
          <s.Icon />
        </div>
        <span className="text-[#1E1E1E] font-mono text-xs tracking-widest">{s.num}</span>
      </div>
      <h3 className="font-display text-[#F2EFE8] font-light mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
        {s.title}
      </h3>
      <p className="text-[#5A5A5A] text-sm leading-[1.8]">{s.desc}</p>
      <div className="mt-8 h-px bg-[#C9A84C] w-6 group-hover:w-14 transition-all duration-500" />
    </div>
  );
}

export default function Services() {
  const headRef = useReveal();
  return (
    <section id="services" className="bg-[#050505] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div ref={headRef} className="reveal mb-16 text-center">
          <p className="text-[#C9A84C] text-[9px] tracking-[0.55em] uppercase mb-5">What We Create</p>
          <h2 className="font-display font-light text-[#F2EFE8]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
            Every format.
            <br />
            <em className="italic text-[#3A3A3A]">Every platform.</em>
          </h2>
        </div>

        {/* Grid — hairline dividers via bg-color gap trick */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1A1A1A]">
          {services.map((s, i) => (
            <ServiceCard key={s.num} s={s} delay={(i % 2) + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
