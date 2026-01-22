import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ImageReveal = ({ children, className = "", delay = 0 }: ImageRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Image container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {children}
      </motion.div>
      
      {/* Mask overlay that slides away */}
      <motion.div
        className="absolute inset-0 bg-onyx z-10"
        initial={{ x: 0 }}
        animate={isInView ? { x: "100%" } : {}}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: [0.65, 0, 0.35, 1] 
        }}
      />
      
      {/* Secondary accent line */}
      <motion.div
        className="absolute top-0 left-0 w-px h-full bg-brass z-20"
        initial={{ scaleY: 0, opacity: 1 }}
        animate={isInView ? { scaleY: 1, opacity: 0 } : {}}
        transition={{ 
          duration: 0.8, 
          delay: delay + 0.1,
          ease: [0.65, 0, 0.35, 1] 
        }}
        style={{ originY: 0 }}
      />
    </div>
  );
};

export default ImageReveal;
