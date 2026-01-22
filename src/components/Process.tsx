import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionLabel from "./SectionLabel";

const steps = [
  {
    number: "01",
    title: "Discovery & Brief",
    description: "Understanding your vision, requirements, and spatial needs through detailed consultation.",
  },
  {
    number: "02",
    title: "Concept Development",
    description: "Material palettes, spatial layouts, and design direction crafted with precision.",
  },
  {
    number: "03",
    title: "Design Documentation",
    description: "Comprehensive technical drawings, specifications, and procurement schedules.",
  },
  {
    number: "04",
    title: "Build & Delivery",
    description: "Meticulous construction management ensuring timeline certainty and budget control.",
  },
];

const ProcessStep = ({ step, index, totalSteps }: { step: typeof steps[0]; index: number; totalSteps: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.12 * (index + 1), ease: [0.25, 0.1, 0.25, 1] }}
      className="relative group"
    >
      {/* Connector line for desktop */}


      {/* Step number with letter-spacing animation */}
      <motion.div
        className="text-brass font-display text-4xl md:text-5xl mb-6 tracking-tight"
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={isInView ? { opacity: 1, letterSpacing: "0em" } : {}}
        transition={{ duration: 0.8, delay: 0.15 * (index + 1) }}
      >
        {step.number}
      </motion.div>

      {/* Step content */}
      <h3 className="text-offwhite text-lg font-medium mb-3 tracking-label group-hover:text-brass transition-colors duration-500">
        {step.title}
      </h3>

      <p className="text-offwhite/50 text-sm leading-relaxed">
        {step.description}
      </p>

      {/* Subtle underline on hover */}
      <motion.div
        className="h-px bg-brass/30 mt-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
      />
    </motion.div>
  );
};

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Micro-parallax
  const sectionY = useTransform(scrollYProgress, [0, 1], [4, -4]);

  return (
    <section id="process" className="bg-onyx section-padding-dark relative overflow-hidden">
      {/* Top divider */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-offwhite/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.div className="container-arch" ref={ref} style={{ y: sectionY }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >


          <motion.h2
            className="text-offwhite mb-6 font-bold"
            initial={{ opacity: 0, y: 20, letterSpacing: "0.08em" }}
            animate={isInView ? { opacity: 1, y: 0, letterSpacing: "0.04em" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A Disciplined Approach
          </motion.h2>

          <motion.p
            className="text-offwhite/60 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our systematic process ensures predictable outcomes, validated by
            our Timeline Certainty Index and Budget Confidence Metre.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={index}
              totalSteps={steps.length}
            />
          ))}
        </div>
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

export default Process;
