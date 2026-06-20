import useReveal from '../hooks/useReveal';

const steps = [
  {
    num: '01',
    title: 'Strategy & Script',
    desc: 'We deep-dive into your brand, audience, and goals. Then we craft a hook-first content strategy and a shooting script engineered to perform.',
    meta: '2–3 days',
  },
  {
    num: '02',
    title: 'Film & Direct',
    desc: 'Our crew arrives on-location or in our black-wall studio. Professional lighting, sound design, and cinematic direction — every frame intentional.',
    meta: '1 day shoot',
  },
  {
    num: '03',
    title: 'Edit & Deliver',
    desc: 'We colour grade, add music, motion graphics and captions. Ready-to-post files delivered inside 72 hours. Two revision rounds included.',
    meta: '24–72 hrs',
  },
];

function Step({ step, index }) {
  const ref = useReveal(0.1);
  const isLast = index === steps.length - 1;
  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${index + 1} py-10 lg:py-0 text-center ${
        !isLast
          ? 'border-b lg:border-b-0 lg:border-r border-[#1A1A1A]'
          : ''
      } ${index > 0 ? 'lg:pl-12' : ''} ${!isLast ? 'lg:pr-12' : ''}`}
    >
      <span className="font-mono text-[#181818] font-bold leading-none select-none block mb-8"
            style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)' }}>
        {step.num}
      </span>

      <h3 className="font-display font-light text-[#F2EFE8] mb-4"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
        {step.title}
      </h3>

      <p className="text-[#5A5A5A] text-sm leading-[1.8] mb-8">
        {step.desc}
      </p>

      <div className="inline-flex items-center gap-2 border border-[#1A1A1A] px-3 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
        <span className="text-[#7A7A7A] text-[10px] font-mono tracking-wide">{step.meta}</span>
      </div>
    </div>
  );
}

export default function Process() {
  const headRef = useReveal();
  return (
    <section id="process" className="bg-[#050505] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div ref={headRef} className="reveal mb-16 text-center">
          <p className="text-[#C9A84C] text-[9px] tracking-[0.55em] uppercase mb-5">How We Work</p>
          <h2 className="font-display font-light text-[#F2EFE8]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
            Idea to published.
            <br />
            <em className="italic text-[#3A3A3A]">In three steps.</em>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Step key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
