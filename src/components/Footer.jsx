import { WA_URL } from '../lib/whatsapp';

const nav = {
  Services: ['Instagram Reels', 'Brand Films', 'Product Videos', 'Behind The Scenes'],
  Company:  ['About Us', 'Our Process', 'Portfolio', 'Pricing'],
};

const contact = [
  {
    icon: (
      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: '8606625482',
    href: 'tel:8606625482',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L0 24l6.341-1.501A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.493-5.19-1.357l-.371-.22-3.851.911.976-3.767-.241-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    ),
    label: '8606625482',
    href: WA_URL,
  },
  {
    icon: (
      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'ivitna.in@gmail.com',
    href: 'mailto:ivitna.in@gmail.com',
  },
  {
    icon: (
      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    label: 'ivitna.in',
    href: 'https://instagram.com/ivitna.in',
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">

        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>
            <div className="flex items-center text-text-dark mb-5">
              <svg viewBox="0 0 120 48" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <polygon points="49.5,38 62.5,38 56,46.5" fill="#702a63" />

                {/* n */}
                <path d="M70.5 14 V32" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M70.5 20 C70.5 14, 80 14, 80 19 V32" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none" />

                {/* a */}
                <circle cx="101" cy="23.75" r="6.75" stroke="currentColor" strokeWidth="4.5" fill="none" />
                <path d="M107.75 14 V32" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                <circle cx="107.75" cy="7" r="2.5" fill="#702a63" />
              </svg>
            </div>
            <p className="text-text-dark/50 text-xs leading-relaxed max-w-[180px]">
              Instagram Video Production Studio. Making brands impossible to scroll past since 2021.
            </p>
          </div>

          {/* Nav groups */}
          {Object.entries(nav).map(([group, items]) => (
            <div key={group}>
              <p className="text-text-dark/90 font-bold text-[9px] tracking-[0.35em] uppercase mb-5">{group}</p>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-text-dark/60 hover:text-brand-purple text-xs transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <p className="text-text-dark/90 font-bold text-[9px] tracking-[0.35em] uppercase mb-5">Contact</p>
            <ul className="flex flex-col gap-3">
              {contact.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2.5 text-text-dark/60 hover:text-brand-purple text-xs transition-all duration-300"
                  >
                    <span className="text-brand-purple shrink-0">{c.icon}</span>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-dark/30 text-[10px] tracking-wide">
            © {new Date().getFullYear()} ivitna. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" className="text-text-dark/30 hover:text-text-dark/50 text-[10px] transition-colors duration-300">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
