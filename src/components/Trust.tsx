import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TypewriterEffect } from "./ui/typewriter-effect";

const metrics = [
  { value: "98%", label: "Timeline Certainty Index", description: "Projects delivered on schedule" },
  { value: "127", label: "Completed Projects", description: "Across four sectors" },
  { value: "12+", label: "Years Experience", description: "Material-first approach" },
  { value: "100%", label: "Budget Confidence", description: "Controlled costs, no surprises" },
];

const MetricCard = ({ metric, index }: { metric: (typeof metrics)[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.12 * (index + 1),
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="text-center group"
    >
      <motion.div
        className="font-display text-4xl md:text-5xl lg:text-6xl text-offwhite mb-4 tracking-tight"
        initial={{ opacity: 0, letterSpacing: "0.08em" }}
        animate={isInView ? { opacity: 1, letterSpacing: "0em" } : {}}
        transition={{
          duration: 0.8,
          delay: 0.15 * (index + 1),
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {metric.value}
      </motion.div>

      <motion.div
        className="caption text-brass mb-2 group-hover:opacity-100 opacity-80 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.8 } : {}}
        transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
      >
        {metric.label}
      </motion.div>

      <motion.p
        className="text-offwhite/50 text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.25 * (index + 1) }}
      >
        {metric.description}
      </motion.p>
    </motion.div>
  );
};

const Trust = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Micro-parallax for background element
  const numberY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [4, -4]);

  return (
    <section className="bg-onyx section-padding-dark relative overflow-hidden" ref={sectionRef}>
      {/* Top divider line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-offwhite/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />


      <motion.div className="container-arch relative z-10" style={{ y: sectionY }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          {/* Keep label anchored to the left edge of the section container */}


          {/* Keep headline + copy centered within a readable column */}
          <div className="max-w-2xl mx-auto">
            <motion.h2
              className="text-offwhite mb-6 text-center font-bold"
              initial={{ opacity: 0, y: 20, letterSpacing: "0.08em" }}
              animate={isInView ? { opacity: 1, y: 0, letterSpacing: "0.04em" } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Measured Excellence
            </motion.h2>

            <motion.p
              className="text-offwhite/60 text-lg text-center font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Our proprietary metrics offer measurable proof of process discipline.
            </motion.p>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-px bg-offwhite/10 mt-16 md:mt-20 origin-center"
        />

        {/* Trust statement with progressive disclosure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 md:mt-16 max-w-3xl mx-auto text-center"
        >
          <p className="text-offwhite/70 text-lg md:text-xl leading-relaxed font-display italic">
            <TypewriterEffect
              text="True luxury emerges from restraint. By prioritizing craft over trends, process over improvisation, we deliver interiors that are both timeless and contemporary."
              speed={30}
              delay={500}
            />
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom divider */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-offwhite/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </section>
  );
};

export default Trust;
