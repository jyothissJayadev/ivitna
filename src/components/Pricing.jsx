import useReveal from '../hooks/useReveal';
import { WA_URL } from '../lib/whatsapp';

const plans = [
  {
    name: 'Starter',
    price: 'Rs.15000/-',
    features: [
      { text: '• 15 Short Reels', sub: '(Script + Shoot + Edit)' },
    ],
    popular: false,
  },
  {
    name: 'Growth',
    price: 'Rs.22500/-',
    features: [
      { text: '• 20 Reels', sub: '(Script + Shoot + Edit)' },
      { text: '• Full social media page management' },
    ],
    popular: false,
  },
  {
    name: 'Value',
    price: 'Rs.25000/-',
    features: [
      { text: '• 20 Reels', sub: '(Script + Shoot + Edit)' },
      { text: '• Full social media page management' },
      { text: '• Poster & graphic design' },
      { text: '• Priority support & monthly performance report' },
    ],
    popular: true,
  },
];

const terms = [
  'Payment Schedule: 50% advance upon agreement. Remaining 50% due upon delivery and client approval.',
  'Revisions: Two rounds of minor edits are included per reel.',
  'Boost / Advertisement budget is NOT included in any package and will be billed separately.',
];

function PlanCard({ plan, delay }) {
  const ref = useReveal(0.1);
  return (
    <a
      ref={ref}
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal reveal-delay-${delay} block relative flex flex-col items-center text-center py-14 px-8 rounded-[48px] bg-brand-purple hover:bg-brand-purple-light text-white transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] shadow-md hover:shadow-xl group`}
    >
      {/* Title */}
      <h3 className={`text-3xl font-bold tracking-wider mb-3 ${plan.popular ? 'text-[#e5c46a]' : 'text-white'}`}>
        {plan.name}
      </h3>

      {/* Price */}
      <p className="font-display italic text-2xl lg:text-3xl mb-8 font-light border-b border-white/10 pb-4 w-full">
        {plan.price}
      </p>

      {/* Features Title */}
      <p className="text-sm font-semibold tracking-wide mb-4 text-white/90">
        Package Includes:
      </p>

      {/* Features List */}
      <div className="flex flex-col gap-4 flex-1 w-full text-sm font-light text-white/95">
        {plan.features.map((f, i) => (
          <div key={i} className="leading-relaxed">
            <p>{f.text}</p>
            {f.sub && <p className="text-white/70 text-xs mt-0.5">{f.sub}</p>}
          </div>
        ))}
      </div>

      {/* Action Indicator */}
      <div className="mt-8 pt-4 border-t border-white/10 w-full flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors duration-200">
        <span>Book Package</span>
        <svg className="w-2.5 h-2.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}

export default function Pricing() {
  const headRef = useReveal();
  const termsRef = useReveal(0.1);
  return (
    <section id="pricing" className="bg-surface py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div ref={headRef} className="reveal text-center mb-16">
          <p className="text-brand-purple text-[9px] tracking-[0.55em] uppercase mb-5">Pricing</p>
          <h2 className="font-display font-light text-text-dark" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
            Simple, transparent
            <br />
            <em className="italic text-brand-purple">pricing.</em>
          </h2>
          <p className="text-text-dark/70 text-sm mt-6 max-w-xs mx-auto leading-relaxed">
            No hidden fees. All plans include script, shoot &amp; edit with full usage rights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((p, i) => <PlanCard key={p.name} plan={p} delay={i + 1} />)}
        </div>

        {/* Terms & Conditions */}
        <div ref={termsRef} className="reveal mt-16 border border-border p-8 lg:p-10 bg-card rounded-2xl shadow-xs">
          <p className="text-brand-purple text-[10px] tracking-[0.45em] uppercase mb-6 font-bold">Terms &amp; conditions</p>
          <ul className="flex flex-col gap-3.5">
            {terms.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-text-dark/80 text-xs leading-relaxed">
                <span className="text-brand-purple/40 mt-0.5 shrink-0">—</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-text-dark/60 text-xs text-center mt-8">
          Need a custom package?{' '}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-brand-purple hover:underline underline-offset-2 font-medium">
            WhatsApp us →
          </a>
        </p>
      </div>
    </section>
  );
}
