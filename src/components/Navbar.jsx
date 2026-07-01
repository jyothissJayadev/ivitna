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
          ? 'bg-surface/95 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px] lg:h-[82px]">

          {/* Logo */}
          <a
            href="#"
            className="flex items-center"
          >
            <img
              src="/assests/logo.png"
              alt="ivitna"
              className="h-10 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`text-[10px] tracking-[0.25em] uppercase transition-colors duration-200 ${
                  scrolled
                    ? 'text-text-dark/60 hover:text-brand-purple'
                    : 'text-[#FAF6EE]/60 hover:text-[#FAF6EE]'
                }`}
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
            className="hidden md:inline-flex items-center gap-2 bg-brand-purple text-white text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-3 hover:bg-brand-purple-light transition-colors duration-200"
          >
            Book a Call
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px transition-all duration-300 origin-center ${
              scrolled ? 'bg-text-dark' : 'bg-cream'
            } ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block h-px transition-all duration-300 ${
              scrolled ? 'bg-text-dark' : 'bg-cream'
            } ${open ? 'w-0 opacity-0' : 'w-5'}`} />
            <span className={`block w-5 h-px transition-all duration-300 origin-center ${
              scrolled ? 'bg-text-dark' : 'bg-cream'
            } ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            scrolled ? 'border-t border-border bg-surface' : 'border-t border-white/10 bg-black/95'
          } ${open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="py-5 flex flex-col gap-1 px-2">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={`block py-3 text-[10px] tracking-[0.25em] uppercase transition-colors ${
                  scrolled
                    ? 'text-text-dark/60 hover:text-brand-purple'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex mt-4 w-fit bg-brand-purple text-white text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-3 hover:bg-brand-purple-light transition-colors duration-200"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
