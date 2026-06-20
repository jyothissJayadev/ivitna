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
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 border border-[#C9A84C] flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C] transition-colors duration-300">
              <span className="text-[#C9A84C] group-hover:text-black font-bold text-[11px] tracking-widest transition-colors duration-300">IV</span>
            </div>
            <span className="text-[#F2EFE8] text-[11px] font-medium tracking-[0.3em] uppercase hidden sm:block">
              ivitna
            </span>
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
