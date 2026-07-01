import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 500, suffix: '+',   label: 'Videos Created',  sub: 'since 2021' },
  { value: 50,  suffix: 'M+',  label: 'Total Views',     sub: 'across all clients' },
  { value: 120, suffix: '+',   label: 'Happy Clients',   sub: 'and counting' },
  { value: 3,   suffix: '-Day',label: 'Avg. Delivery',   sub: 'or less' },
];

function CountUp({ to, suffix, run }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!run) return;
    let start = null;
    const duration = 1800;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(to);
    };
    requestAnimationFrame(tick);
  }, [run, to]);

  return (
    <span className="font-display font-light text-brand-purple"
          style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', lineHeight: 1 }}>
      {val}{suffix}
    </span>
  );
}

function StatItem({ stat }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRun(true); obs.unobserve(el); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center text-center py-12 px-6 bg-surface">
      <CountUp to={stat.value} suffix={stat.suffix} run={run} />
      <p className="text-text-dark text-[10px] tracking-[0.3em] uppercase mt-3 mb-1">{stat.label}</p>
      <p className="text-text-dark/60 text-xs">{stat.sub}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {stats.map(s => <StatItem key={s.label} stat={s} />)}
      </div>
    </section>
  );
}
