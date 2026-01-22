import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import heroImage from "@/assets/hero-interior.jpg";

interface HeroProps {
  onScrollProgress?: (progress: number) => void;
}

const Hero = ({ onScrollProgress }: HeroProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Notify parent of scroll progress for header collapse
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    onScrollProgress?.(latest);
    setHasScrolled(latest > 0.05);
  });

  // Micro-parallax (2-6px range)
  const imageY = useTransform(scrollYProgress, [0, 1], ["0px", "60px"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);
  const scrollFade = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-onyx overflow-hidden">
      {/* Background Image with micro-parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
      >
        <motion.img
          src={heroImage}
          alt="Premium interior architecture"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </motion.div>


      {/* Content with micro-parallax */}
      <motion.div
        className="relative container-arch min-h-screen flex items-center pt-32 pb-20"
        style={{ y: contentY }}
      >
        <div className="max-w-3xl">

          {/* Main headline with letter-spacing animation */}
          <motion.h1
            className="text-offwhite mb-8 font-bold"
            initial={{ opacity: 0, y: 20, letterSpacing: "0.12em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.06em" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Engineered Calm.
            <br />
            <span className="text-stone">Built With Precision.</span>
          </motion.h1>

          {/* Brass accent line with draw animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="brass-line mb-8 origin-left"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-offwhite/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-semibold"
          >
            We craft premium luxury interiors for clients who prioritize
            certainty over spectacle. Material honesty. Process transparency.
            Architectural precision.
          </motion.p>

          {/* CTA Buttons with engineered hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#gallery"
              className="group inline-flex items-center justify-center gap-3 border border-brass px-8 py-4 text-offwhite uppercase tracking-wide-editorial text-sm hover:bg-brass hover:text-onyx transition-all duration-500 rounded-full"
            >
              <span className="relative">
                View Projects
                <span className="absolute bottom-0 left-0 w-full h-px bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </span>
              <ChevronRight />
            </a>
            <a
              href="#process"
              className="group inline-flex items-center justify-center gap-3 border border-stone/30 px-8 py-4 text-offwhite/70 uppercase tracking-wide-editorial text-sm hover:border-offwhite/50 hover:text-offwhite transition-all duration-500 rounded-full"
            >
              Our Process
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator with directional chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        style={{ opacity: scrollFade }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="caption text-stone text-xs">Scroll</span>
        <motion.div className="relative">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className="text-brass"
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom divider line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-offwhite/10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </section>
  );
};

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="transition-transform duration-300 group-hover:translate-x-1"
  >
    <path
      d="M6 4L10 8L6 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Hero;
