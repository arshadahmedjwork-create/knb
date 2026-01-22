import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "light" | "dark";
  withChevron?: boolean;
}

const SectionDivider = ({ variant = "light", withChevron = false }: SectionDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -4]); // Micro-parallax

  const lineColor = variant === "light" ? "bg-stone/20" : "bg-offwhite/10";

  return (
    <div ref={ref} className="relative py-4 md:py-6">
      <motion.div 
        className="container-arch relative"
        style={{ y }}
      >
        {/* Animated line draw */}
        <motion.div 
          className={`h-px ${lineColor} origin-left`}
          style={{ scaleX: lineScale }}
        />
        
        {/* Directional chevron */}
        {withChevron && (
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 -bottom-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className="text-brass"
              animate={{ y: [0, 2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SectionDivider;
