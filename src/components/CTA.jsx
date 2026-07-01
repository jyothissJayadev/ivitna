import useReveal from '../hooks/useReveal';
import { WA_URL } from '../lib/whatsapp';

export default function CTA() {
  const ref = useReveal(0.15);
  return (
    <section id="booking" className="relative bg-surface border-t border-border py-28 lg:py-36 overflow-hidden">

      {/* Ghost background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-bold text-border/30 whitespace-nowrap"
          style={{ fontSize: 'clamp(6rem, 22vw, 20rem)', lineHeight: 1 }}
        >
          VIRAL
        </span>
      </div>

      {/* Content */}
      <div ref={ref} className="reveal relative z-10 max-w-2xl mx-auto px-6 text-center">
        <p className="text-brand-purple text-[9px] tracking-[0.55em] uppercase mb-7">
          Ready to Start?
        </p>

        <h2
          className="font-display font-light text-text-dark mb-7"
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)', lineHeight: 0.9 }}
        >
          Ready to go
          <br />
          <em className="italic text-brand-purple">viral?</em>
        </h2>

        <p className="text-text-dark/70 text-base max-w-sm mx-auto mb-12 leading-relaxed">
          Book a free 30-minute strategy call. We'll map out exactly what
          content will make your brand impossible to scroll past.
        </p>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-brand-purple text-white text-[10px] font-bold tracking-[0.25em] uppercase px-10 py-5 hover:bg-brand-purple-light active:scale-95 transition-all duration-200 hover:scale-105 rounded-full"
        >
          Book Free Strategy Call
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        <p className="text-text-dark/40 text-xs mt-6">No commitment · Free 30 minutes · No hard sell</p>
      </div>
    </section>
  );
}
