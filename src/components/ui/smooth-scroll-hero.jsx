import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useTransform,
} from "framer-motion";

/**
 * Inner background — driven by an external progress MotionValue (0 → 1).
 * Uses absolute positioning so it fills whatever container wraps it.
 */
const SmoothScrollHeroBackground = ({
  progress,
  videoSrc,
  mobileImage,
  initialClipPercentage,
  finalClipPercentage,
  children,
}) => {
  const clipStart = useTransform(progress, [0, 1], [initialClipPercentage, 0]);
  const clipEnd   = useTransform(progress, [0, 1], [finalClipPercentage, 100]);
  const clipPath  = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const videoScale = useTransform(progress, [0, 1], [1.25, 1.0]);
  const videoRef = React.useRef(null);

  // Ping-pong reverse: seeked-chain with fastSeek() for keyframe-aligned seeks.
  // fastSeek() snaps to the nearest keyframe instead of decoding every
  // intermediate frame — far faster than exact currentTime seeks.
  // STEP = 1/8 s → 8 seeks per real second, keeps reverse feeling brisk.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let reversing = false;
    const STEP = 1 / 8;

    const seek = (t) => {
      if (video.fastSeek) {
        video.fastSeek(t);      // keyframe-aligned — fast
      } else {
        video.currentTime = t;  // fallback
      }
    };

    const seekBack = () => {
      if (!reversing) return;
      const next = video.currentTime - STEP;
      if (next <= 0) {
        reversing = false;
        seek(0);
        video.play();
      } else {
        seek(next);
      }
    };

    const onSeeked = () => {
      if (reversing) seekBack();
    };

    const onEnded = () => {
      reversing = true;
      video.pause();
      seekBack();
    };

    video.addEventListener("ended",  onEnded);
    video.addEventListener("seeked", onSeeked);

    return () => {
      video.removeEventListener("ended",  onEnded);
      video.removeEventListener("seeked", onSeeked);
      reversing = false;
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-black"
      style={{ clipPath }}
    >
      {/* Mobile fallback image */}
      {mobileImage && (
        <motion.div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url(${mobileImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Video — no loop; ping-pong handled in JS */}
      <motion.video
        ref={videoRef}
        src={videoSrc}
        className={`absolute inset-0 w-full h-full object-cover${
          mobileImage ? " hidden md:block" : ""
        }`}
        style={{ objectPosition: "68% center", scale: videoScale }}
        muted
        playsInline
        autoPlay
      />

      {/* Overlays that clip with the video (gradients, grain, etc.) */}
      {children}
    </motion.div>
  );
};

/**
 * SmoothScrollHero
 *
 * Props:
 *   progress              – framer-motion MotionValue (0 → 1) that drives the reveal
 *   videoSrc              – video file URL
 *   mobileImage           – optional fallback image URL for small screens
 *   initialClipPercentage – inset % on each edge at progress = 0   (default 22)
 *   finalClipPercentage   – far edge % at progress = 0             (default 78)
 *   overlay               – rendered INSIDE the clip (gradients, etc.)
 *   children              – rendered OUTSIDE / above the clip (text, frame, HUD)
 */
const SmoothScrollHero = ({
  progress,
  videoSrc = "/assests/camera%20roll.mp4",
  mobileImage,
  initialClipPercentage = 22,
  finalClipPercentage   = 78,
  overlay,
  children,
}) => {
  return (
    <div className="relative w-full h-full">
      <SmoothScrollHeroBackground
        progress={progress}
        videoSrc={videoSrc}
        mobileImage={mobileImage}
        initialClipPercentage={initialClipPercentage}
        finalClipPercentage={finalClipPercentage}
      >
        {overlay}
      </SmoothScrollHeroBackground>

      {/* Siblings to the clip — rendered on top */}
      {children}
    </div>
  );
};

export default SmoothScrollHero;
