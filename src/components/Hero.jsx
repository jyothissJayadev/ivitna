import { useState, useEffect } from "react";
import {
  useMotionValue,
  useTransform,
  useMotionTemplate,
  motion,
} from "framer-motion";
import SmoothScrollHero from "./ui/smooth-scroll-hero";
import { WA_URL } from "../lib/whatsapp";

const INITIAL_CLIP = 22;   // % inset on each edge when progress = 0
const FINAL_CLIP   = 78;   // far-edge % when progress = 0  (= 100 - INITIAL_CLIP)
const WHEEL_DIVISOR = 900; // virtual px of wheel input required to reach progress = 1

export default function Hero() {
  const progress = useMotionValue(0);
  const [locked, setLocked] = useState(true);

  // ── Scroll-lock effect ────────────────────────────────────────────────────
  useEffect(() => {
    if (!locked) {
      // Release: restore native scroll
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }

    // Lock: pin the page at the top and intercept input
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const touchY = { current: 0 };

    const advance = (delta) => {
      const next = Math.min(Math.max(progress.get() + delta, 0), 1);
      progress.set(next);
      if (next >= 1) setLocked(false);
    };

    const onWheel = (e) => {
      e.preventDefault();
      advance(e.deltaY / WHEEL_DIVISOR);
    };

    const onTouchStart = (e) => {
      touchY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const delta = touchY.current - e.touches[0].clientY;
      touchY.current = e.touches[0].clientY;
      advance(delta / (WHEEL_DIVISOR * 0.7));
    };

    const onKeyDown = (e) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        advance(0.12);
      }
      if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        advance(-0.12);
      }
    };

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true  });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false });
    window.addEventListener("keydown",    onKeyDown);

    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("keydown",    onKeyDown);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [locked, progress]);

  // Re-engage scroll lock and reset progress to 1 when user scrolls back to the top of the page
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && !locked) {
        setLocked(true);
        progress.set(1);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [locked, progress]);

  // ── Gold frame — tracks the clip-path boundary ────────────────────────────
  const frameEdgeNum = useTransform(progress, [0, 1], [INITIAL_CLIP, 0]);
  const frameTop    = useMotionTemplate`${frameEdgeNum}%`;
  const frameRight  = useMotionTemplate`${frameEdgeNum}%`;
  const frameBottom = useMotionTemplate`${frameEdgeNum}%`;
  const frameLeft   = useMotionTemplate`${frameEdgeNum}%`;
  // Frame stays visible while clip expands, then fades out at full-screen
  const frameOpacity = useTransform(progress, [0, 0.8, 1], [0.82, 0.82, 0]);

  // ── Overlays that clip WITH the video ─────────────────────────────────────
  const overlay = (
    <>
      {/* Left gradient — darkens text side with a rich purple wash */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(102deg, rgba(91,36,77,0.92) 0%, rgba(91,36,77,0.78) 36%, rgba(91,36,77,0.25) 60%, rgba(91,36,77,0.05) 100%)",
        }}
      />
      {/* Top/bottom vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(91,36,77,0.55) 0%, transparent 18%, transparent 74%, rgba(91,36,77,0.65) 100%)",
        }}
      />
      {/* Warm glow left */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 35% 55% at 12% 50%, rgba(201,168,76,0.045) 0%, transparent 65%)",
        }}
      />
    </>
  );

  return (
    /*
     * h-screen + overflow-hidden is the entire hero canvas.
     * NO extra height needed — the scroll-lock handles the animation timing,
     * so the section is exactly one viewport tall with no gap below.
     */
    <section
      id="hero"
      className="relative h-screen bg-surface overflow-hidden"
    >
      <SmoothScrollHero
        progress={progress}
        videoSrc="/assests/camera%20roll.mp4"
        initialClipPercentage={INITIAL_CLIP}
        finalClipPercentage={FINAL_CLIP}
        overlay={overlay}
      >
        {/* ── Gold frame (positioned to match clip-path boundary) ─────────── */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ opacity: frameOpacity }}
        >
          <motion.div
            className="absolute"
            style={{
              top:    frameTop,
              right:  frameRight,
              bottom: frameBottom,
              left:   frameLeft,
            }}
          >
            <div className="absolute inset-0 border border-[#C9A84C]/60" />
            <div className="absolute -top-[1px]    -left-[1px]  w-5 h-5 border-t-2 border-l-2 border-[#C9A84C]" />
            <div className="absolute -top-[1px]    -right-[1px] w-5 h-5 border-t-2 border-r-2 border-[#C9A84C]" />
            <div className="absolute -bottom-[1px] -left-[1px]  w-5 h-5 border-b-2 border-l-2 border-[#C9A84C]" />
            <div className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 border-[#C9A84C]" />
          </motion.div>
        </motion.div>

        {/* ── Cinematic HUD + text (above video, grain overlay) ───────────── */}
        <div className="grain absolute inset-0 z-10 pointer-events-none">

          {/* Letterbox top + REC indicator */}
          <div
            className="lb-top absolute top-0 inset-x-0 h-[10vh] z-20"
          >
            <div className="hero-enter absolute bottom-3 left-6 lg:left-12 right-6 lg:right-12 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rec-dot inline-block w-[7px] h-[7px] rounded-full bg-[#FF3030]" />
                <span className="text-[#FF3030] text-[9px] font-mono tracking-[0.35em]">
                  REC
                </span>
              </div>
              <span
                className="text-[9px] font-mono tracking-wider"
                style={{ color: "rgba(18,18,18,0.3)" }}
              >
                00:00:00:00
              </span>
            </div>
          </div>

          {/* LEFT-ALIGNED main text */}
          <div className="hero-enter absolute inset-0 flex items-center pt-[10vh] pb-[10vh]">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
              <div className="max-w-[490px]">
                <p className="text-[#C9A84C] text-[9px] tracking-[0.55em] uppercase mb-10">
                  Instagram Video Production Studio
                </p>

                <h1
                  className="font-display font-light text-text-dark leading-[0.87]"
                  style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)" }}
                >
                  We Make Videos
                </h1>
                <h1
                  className="font-display italic text-[#C9A84C] leading-[0.87] mt-1"
                  style={{
                    fontSize: "clamp(2.8rem, 8vw, 7.5rem)",
                    fontWeight: 300,
                  }}
                >
                  That Go Viral.
                </h1>

                <p
                  className="text-base max-w-[330px] mt-8 mb-11 leading-relaxed"
                  style={{ color: "rgba(18,18,18,0.65)" }}
                >
                  Premium Reels, Brand Films &amp; Social Content for brands
                  that refuse to be ignored.
                </p>

                {/* pointer-events-auto restores click/hover inside the none layer */}
                <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-3 bg-brand-purple text-white text-[10px] font-bold tracking-[0.25em] uppercase px-9 py-4 hover:bg-brand-purple-light active:scale-95 transition-all duration-200"
                  >
                    View Our Work
                    <svg
                      width="13"
                      height="13"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[10px] font-medium tracking-[0.25em] uppercase px-9 py-4 border transition-all duration-300"
                    style={{
                      borderColor: "rgba(18,18,18,0.15)",
                      color: "rgba(18,18,18,0.6)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#702a63";
                      e.currentTarget.style.color = "#702a63";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(18,18,18,0.15)";
                      e.currentTarget.style.color = "rgba(18,18,18,0.6)";
                    }}
                  >
                    Book a Call
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Letterbox bottom + scroll indicator */}
          <div
            className="lb-bottom absolute bottom-0 inset-x-0 h-[10vh] z-20"
          >
            <div className="hero-enter absolute top-3 left-6 lg:left-12 right-6 lg:right-12 flex items-center justify-center relative">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-px h-7 overflow-hidden relative"
                  style={{ background: "rgba(18,18,18,0.08)" }}
                >
                  <div className="scroll-line absolute inset-x-0 top-0 h-4 bg-[#C9A84C]" />
                </div>
                <span
                  className="text-[8px] tracking-[0.35em] uppercase"
                  style={{ color: "rgba(18,18,18,0.3)" }}
                >
                  Scroll
                </span>
              </div>
              <span
                className="absolute right-0 text-[9px] font-mono"
                style={{ color: "rgba(18,18,18,0.25)" }}
              >
                16 : 9
              </span>
            </div>
          </div>
        </div>
        </SmoothScrollHero>
    </section>
  );
}
