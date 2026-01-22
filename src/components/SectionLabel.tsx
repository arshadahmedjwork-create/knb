import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionLabelProps {
  number: string;
  label: string;
  variant?: "light" | "dark";
}

const SectionLabel = ({ number, label, variant = "light" }: SectionLabelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const textColor = variant === "light" ? "text-graphite" : "text-stone";
  const numberColor = variant === "light" ? "text-stone/40" : "text-offwhite/20";

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-4 mb-4"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Section number */}
      <motion.span
        className={`font-display text-sm ${numberColor}`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {number}
      </motion.span>
      
      {/* Divider line */}
      <motion.div
        className={`w-8 h-px ${variant === "light" ? "bg-stone/30" : "bg-offwhite/20"}`}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{ originX: 0 }}
      />
      
      {/* Label with letter-spacing animation */}
      <motion.span
        className={`caption ${textColor}`}
        initial={{ opacity: 0, letterSpacing: "0.08em" }}
        animate={isInView ? { opacity: 1, letterSpacing: "0.04em" } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

export default SectionLabel;
