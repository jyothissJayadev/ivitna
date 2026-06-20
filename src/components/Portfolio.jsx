import useReveal from '../hooks/useReveal';

const projects = [
  {
    id: 1,
    cat: 'Fashion',
    title: 'Luminary SS25 Campaign',
    views: '2.4M views',
    gradient: 'linear-gradient(135deg, #1c0a35 0%, #0a0a0a 100%)',
    col: '',
  },
  {
    id: 2,
    cat: 'Beauty',
    title: 'Velvet Glow Launch',
    views: '890K views',
    gradient: 'linear-gradient(135deg, #1a0a20 0%, #0a0a0a 100%)',
    col: '',
  },
  {
    id: 3,
    cat: 'Fitness',
    title: 'NOVA Transform Series',
    views: '1.1M views',
    gradient: 'linear-gradient(135deg, #001a10 0%, #0a0a0a 100%)',
    col: '',
  },
  {
    id: 4,
    cat: 'Tech',
    title: 'Orbit App Campaign',
    views: '3.2M views',
    gradient: 'linear-gradient(135deg, #001828 0%, #0a0a0a 100%)',
    col: 'lg:col-span-2',
  },
  {
    id: 5,
    cat: 'Food',
    title: 'Harvest Table Reels',
    views: '760K views',
    gradient: 'linear-gradient(135deg, #1a0e00 0%, #0a0a0a 100%)',
    col: '',
  },
  {
    id: 6,
    cat: 'Lifestyle',
    title: 'Morning Ritual Series',
    views: '5.7M views',
    gradient: 'linear-gradient(135deg, #1a1000 0%, #0a0a0a 100%)',
    col: 'col-span-full',
  },
];

function ProjectCard({ p }) {
  const ref = useReveal(0.08);
  return (
    <div ref={ref} className={`reveal group relative overflow-hidden cursor-pointer ${p.col}`}>
      {/* Visual */}
      <div className="aspect-video relative" style={{ background: p.gradient }}>
        {/* Corner brackets — film aesthetic */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[#2A2A2A] group-hover:border-[#C9A84C]/40 transition-colors duration-500" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t border-r border-[#2A2A2A] group-hover:border-[#C9A84C]/40 transition-colors duration-500" />
        <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-[#2A2A2A] group-hover:border-[#C9A84C]/40 transition-colors duration-500" />
        <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[#2A2A2A] group-hover:border-[#C9A84C]/40 transition-colors duration-500" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border border-[#C9A84C]/25 flex items-center justify-center group-hover:border-[#C9A84C]/70 group-hover:bg-[#C9A84C]/8 transition-all duration-500">
            <svg className="w-5 h-5 text-[#C9A84C] ml-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
          <span className="text-[#F2EFE8] text-xs tracking-[0.2em] uppercase font-medium">
            View Project →
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0A0A0A] border border-t-0 border-[#1A1A1A] group-hover:border-[#C9A84C]/20 transition-colors duration-500 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-[#C9A84C] text-[8px] tracking-[0.45em] uppercase mb-1">{p.cat}</p>
          <p className="text-[#F2EFE8] text-sm font-medium">{p.title}</p>
        </div>
        <span className="text-[#3A3A3A] text-[10px] font-mono">{p.views}</span>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const headRef = useReveal();
  return (
    <section id="work" className="bg-black py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div ref={headRef} className="reveal text-center mb-16">
          <p className="text-[#C9A84C] text-[9px] tracking-[0.55em] uppercase mb-5">Our Work</p>
          <h2 className="font-display font-light text-[#F2EFE8]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
            Results you can
            <br />
            <em className="italic text-[#3A3A3A]">measure.</em>
          </h2>
          <a
            href="#"
            className="inline-block mt-6 text-[#C9A84C] text-[9px] tracking-[0.25em] uppercase border-b border-[#C9A84C]/25 pb-0.5 hover:border-[#C9A84C] transition-colors"
          >
            All Projects →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
