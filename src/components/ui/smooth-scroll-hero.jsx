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

  // Control video frame playback directly from the scroll progress (forward & reverse scrubbing)
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetTime = 0;
    let animationFrameId = null;

    const updateVideoTime = (latestProgress) => {
      if (video.duration && !isNaN(video.duration)) {
        // Map progress (0 -> 1) directly to video duration (0 -> duration)
        targetTime = latestProgress * video.duration;
      }
    };

    // Smoothly interpolate currentTime towards targetTime
    const renderLoop = () => {
      if (video.duration && !isNaN(video.duration)) {
        const current = video.currentTime;
        const diff = targetTime - current;

        // If the gap is substantial and the video is not already seeking, seek smoothly.
        // Checking !video.seeking prevents choke-points on the video decoder.
        if (!video.seeking && Math.abs(diff) > 0.01) {
          // Easing constant (0.12 means 12% towards target per frame)
          video.currentTime = current + diff * 0.12;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Listen to metadata and data load events to set the initial frame
    const handleMetadata = () => {
      if (video.duration) {
        targetTime = progress.get() * video.duration;
        video.currentTime = targetTime;
      }
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("loadeddata", handleMetadata);
    video.addEventListener("canplay", handleMetadata);

    // If metadata is already loaded, set initial frame now
    if (video.readyState >= 1) {
      handleMetadata();
    }

    // Start the animation loop
    animationFrameId = requestAnimationFrame(renderLoop);

    // Subscribe to progress changes (always, do not return early!)
    const unsubscribe = progress.on("change", (latest) => {
      updateVideoTime(latest);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("loadeddata", handleMetadata);
      video.removeEventListener("canplay", handleMetadata);
      unsubscribe();
    };
  }, [progress]);

  return (
    <motion.div
      className="absolute inset-0 bg-surface"
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
