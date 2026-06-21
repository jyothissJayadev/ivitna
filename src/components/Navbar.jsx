import { useState, useEffect } from 'react';
import { WA_URL } from '../lib/whatsapp';

const links = [
  { label: 'Work',     href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process',  href: '#process' },
  { label: 'Pricing',  href: '#pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-[#1E1E1E]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px] lg:h-[82px]">

          {/* Logo */}
          <a href="#" className="flex items-center text-[#F2EFE8] hover:text-[#C9A84C] transition-colors duration-300">
            <svg viewBox="0 0 120 48" className="h-9 w-auto transition-colors duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* i (first) */}
              <rect x="12" y="14" width="4.5" height="18" rx="1" fill="currentColor" />
              <circle cx="14.25" cy="7" r="2.5" fill="currentColor" />

              {/* v */}
              <path d="M22 14.5 L28.5 31 L35 14.5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* i (second) */}
              <rect x="41" y="14" width="4.5" height="18" rx="1" fill="currentColor" />
              <circle cx="43.25" cy="7" r="2.5" fill="currentColor" />

              {/* t */}
              <polygon points="53.5,32 58,32 58,6 53.5,11.5" fill="currentColor" />
              <path d="M49.5 17.5 H61.5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
              {/* Downward triangle (brand purple) */}
              <polygon points="49.5,38 62.5,38 56,46.5" fill="#5B244D" />

              {/* n */}
              <path d="M70.5 14 V32" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M70.5 20 C70.5 14, 80 14, 80 19 V32" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none" />

              {/* a */}
              <circle cx="101" cy="23.75" r="6.75" stroke="currentColor" strokeWidth="4.5" fill="none" />
              <path d="M107.75 14 V32" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="107.75" cy="7" r="2.5" fill="#5B244D" />
            </svg>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[#5A5A5A] hover:text-[#F2EFE8] text-[10px] tracking-[0.25em] uppercase transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-[#C9A84C] text-black text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#E5C46A] transition-colors duration-200"
          >
            Book a Call
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-[#F2EFE8] transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block h-px bg-[#F2EFE8] transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-5'}`} />
            <span className={`block w-5 h-px bg-[#F2EFE8] transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden border-t border-[#1E1E1E] transition-all duration-300 overflow-hidden ${
            open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-5 flex flex-col gap-1">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="block py-3 text-[#5A5A5A] hover:text-[#F2EFE8] text-[10px] tracking-[0.25em] uppercase transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex mt-4 w-fit bg-[#C9A84C] text-black text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-3"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
