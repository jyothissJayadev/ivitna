import useReveal from '../hooks/useReveal';
import { WA_URL } from '../lib/whatsapp';

export default function CTA() {
  const ref = useReveal(0.15);
  return (
    <section id="booking" className="relative bg-[#030303] border-t border-[#1A1A1A] py-28 lg:py-36 overflow-hidden">

      {/* Ghost background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-bold text-[#0D0D0D] whitespace-nowrap"
          style={{ fontSize: 'clamp(6rem, 22vw, 20rem)', lineHeight: 1 }}
        >
          VIRAL
        </span>
      </div>

      {/* Content */}
      <div ref={ref} className="reveal relative z-10 max-w-2xl mx-auto px-6 text-center">
        <p className="text-[#C9A84C] text-[9px] tracking-[0.55em] uppercase mb-7">
          Ready to Start?
        </p>

        <h2
          className="font-display font-light text-[#F2EFE8] mb-7"
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)', lineHeight: 0.9 }}
        >
          Ready to go
          <br />
          <em className="italic text-[#C9A84C]">viral?</em>
        </h2>

        <p className="text-[#5A5A5A] text-base max-w-sm mx-auto mb-12 leading-relaxed">
          Book a free 30-minute strategy call. We'll map out exactly what
          content will make your brand impossible to scroll past.
        </p>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-[#C9A84C] text-black text-[10px] font-bold tracking-[0.25em] uppercase px-10 py-5 hover:bg-[#E5C46A] active:scale-95 transition-all duration-200 hover:scale-105"
        >
          Book Free Strategy Call
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        <p className="text-[#2E2E2E] text-xs mt-6">No commitment · Free 30 minutes · No hard sell</p>
      </div>
    </section>
  );
}
