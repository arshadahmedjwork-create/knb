import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Micro-parallax
  const contentY = useTransform(scrollYProgress, [0, 1], [4, -4]);

  return (
    <section id="contact" className="bg-onyx section-padding-cta relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 pattern-lattice opacity-20" />

      {/* Top divider */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-offwhite/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.div
        className="container-arch relative z-10"
        ref={ref}
        style={{ y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.span
            className="inline-block caption text-brass border border-brass/30 px-4 py-2 mb-8 rounded-full"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ready to Begin?
          </motion.span>

          {/* Headline with letter-spacing animation */}
          <motion.h2
            className="text-offwhite mb-6"
            initial={{ opacity: 0, y: 20, letterSpacing: "0.08em" }}
            animate={isInView ? { opacity: 1, y: 0, letterSpacing: "0.04em" } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Let's Create Spaces<br />
            <span className="text-stone">That Perform</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-offwhite/60 text-lg mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Transform your vision into reality with our process-led approach.
            Schedule a consultation to discuss your project.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="/book-consultation"
              className="group inline-flex items-center justify-center gap-3 border border-brass px-10 py-4 text-offwhite uppercase tracking-wide-editorial text-sm hover:bg-brass hover:text-onyx transition-all duration-500 rounded-full"
            >
              <span>Book Consultation</span>
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
            </a>
            <a
              href="tel:+442071234567"
              className="group inline-flex items-center justify-center gap-3 border border-stone/30 px-10 py-4 text-offwhite/70 uppercase tracking-wide-editorial text-sm hover:border-offwhite/50 hover:text-offwhite transition-all duration-500 rounded-full"
            >
              Call Studio
            </a>
          </motion.div>
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

export default CTA;
