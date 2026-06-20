import useReveal from '../hooks/useReveal';
import { WA_URL } from '../lib/whatsapp';

const plans = [
  {
    name: 'Starter',
    price: '15,000',
    tagline: 'For brands getting started with video',
    features: [
      '15 Short Reels (Script + Shoot + Edit)',
      '2 revision rounds per reel',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '22,500',
    tagline: 'For brands ready to grow their presence',
    features: [
      '20 Reels (Script + Shoot + Edit)',
      'Full social media page management',
      '2 revision rounds per reel',
    ],
    popular: false,
    cta: 'Start Growing',
  },
  {
    name: 'Value',
    price: '25,000',
    tagline: 'Complete content solution for serious brands',
    features: [
      '20 Reels (Script + Shoot + Edit)',
      'Full social media page management',
      'Poster & graphic design',
      '2 revision rounds per reel',
    ],
    popular: true,
    cta: 'Get Best Value',
  },
];

const terms = [
  'Payment: 50% advance upon agreement. Remaining 50% due upon delivery and client approval.',
  'Revisions: Two rounds of minor edits are included per reel.',
  'Boost / Advertisement budget is NOT included in any package and will be billed separately.',
];

const Check = () => (
  <svg className="w-3.5 h-3.5 text-[#C9A84C] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

function PlanCard({ plan, delay }) {
  const ref = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay} relative flex flex-col p-8 lg:p-10 border transition-all duration-500 ${
        plan.popular
          ? 'border-[#C9A84C] popular-glow'
          : 'border-[#1A1A1A] hover:border-[#2E2E2E]'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-px left-8">
          <div className="bg-[#C9A84C] text-black text-[8px] font-bold tracking-[0.35em] uppercase px-3 py-1">
            Best Value
          </div>
        </div>
      )}

      <p className={`text-[9px] tracking-[0.4em] uppercase mb-1.5 ${plan.popular ? 'text-[#C9A84C]' : 'text-[#4A4A4A]'}`}>
        {plan.name}
      </p>
      <p className="text-[#3A3A3A] text-xs mb-8 leading-relaxed">{plan.tagline}</p>

      {/* Price */}
      <div className="mb-10">
        <div className="flex items-start gap-1">
          <span className="text-[#6A6A6A] text-sm mt-3">₹</span>
          <span className="font-display font-light text-[#F2EFE8]"
                style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)', lineHeight: 1 }}>
            {plan.price}
          </span>
        </div>
        <p className="text-[#3A3A3A] text-[10px] mt-1">per month · billed monthly</p>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3.5 flex-1 mb-10">
        {plan.features.map(f => (
          <li key={f} className="flex items-start gap-3 text-sm text-[#6A6A6A]">
            <Check />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`block text-center text-[10px] font-bold tracking-[0.25em] uppercase py-4 transition-colors duration-200 ${
          plan.popular
            ? 'bg-[#C9A84C] text-black hover:bg-[#E5C46A]'
            : 'border border-[#1E1E1E] text-[#6A6A6A] hover:border-[#C9A84C] hover:text-[#C9A84C]'
        }`}
      >
        {plan.cta}
      </a>
    </div>
  );
}

export default function Pricing() {
  const headRef = useReveal();
  const termsRef = useReveal(0.1);
  return (
    <section id="pricing" className="bg-black py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div ref={headRef} className="reveal text-center mb-16">
          <p className="text-[#C9A84C] text-[9px] tracking-[0.55em] uppercase mb-5">Pricing</p>
          <h2 className="font-display font-light text-[#F2EFE8]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
            Simple, transparent
            <br />
            <em className="italic text-[#3A3A3A]">pricing.</em>
          </h2>
          <p className="text-[#4A4A4A] text-sm mt-6 max-w-xs mx-auto leading-relaxed">
            No hidden fees. All plans include script, shoot &amp; edit with full usage rights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p, i) => <PlanCard key={p.name} plan={p} delay={i + 1} />)}
        </div>

        {/* Terms & Conditions */}
        <div ref={termsRef} className="reveal mt-12 border border-[#1A1A1A] p-6 lg:p-8">
          <p className="text-[#C9A84C] text-[9px] tracking-[0.45em] uppercase mb-4">Terms &amp; Conditions</p>
          <ul className="flex flex-col gap-2.5">
            {terms.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-[#4A4A4A] text-xs leading-relaxed">
                <span className="text-[#2A2A2A] mt-0.5 shrink-0">—</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[#3A3A3A] text-xs text-center mt-8">
          Need a custom package?{' '}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline underline-offset-2">
            WhatsApp us →
          </a>
        </p>
      </div>
    </section>
  );
}
