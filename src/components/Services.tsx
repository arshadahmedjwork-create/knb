import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TiltCard } from "./ui/tilt-card";

const services = [
  {
    icon: "kitchen",
    title: "Modular Kitchen",
    description: "Custom-built modular kitchens",
  },
  {
    icon: "wardrobe",
    title: "Wardrobes",
    description: "Space-saving wardrobes",
  },
  {
    icon: "tv",
    title: "TV Units",
    description: "Entertainment centers",
  },
  {
    icon: "study",
    title: "Study Tables",
    description: "Ergonomic workspaces",
  },
  {
    icon: "ceiling",
    title: "False Ceiling",
    description: "Decorative ceilings",
  },
  {
    icon: "paint",
    title: "Wall Paint",
    description: "Premium finishes",
  },
  {
    icon: "bathroom",
    title: "Bathroom",
    description: "Modern bath spaces",
  },
  {
    icon: "furniture",
    title: "Furniture",
    description: "Custom furniture",
  },
];

const iconMap: Record<string, JSX.Element> = {
  kitchen: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M8 6L6 12H10L8 6Z" strokeLinejoin="round" />
      <path d="M16 6L14 12H18L16 6Z" strokeLinejoin="round" />
      <path d="M8 12V26" />
      <path d="M16 12V26" />
      <path d="M24 6V14M21 14H27M24 14V26" strokeLinejoin="round" />
    </svg>
  ),
  wardrobe: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <rect x="6" y="4" width="20" height="24" rx="1" />
      <path d="M16 4V28" />
      <path d="M13 14V18" />
      <path d="M19 14V18" />
    </svg>
  ),
  tv: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <rect x="4" y="8" width="24" height="14" rx="1" />
      <path d="M10 26H22" />
      <path d="M16 22V26" />
    </svg>
  ),
  study: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <rect x="6" y="6" width="20" height="14" rx="1" />
      <path d="M4 20H28" />
      <path d="M8 20V26" />
      <path d="M24 20V26" />
    </svg>
  ),
  ceiling: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M4 8H28" />
      <path d="M6 12H26" />
      <path d="M8 16H24" />
      <path d="M10 20H22" />
    </svg>
  ),
  paint: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M8 4L24 8L20 12L8 4Z" strokeLinejoin="round" />
      <path d="M20 12L16 28L12 12L20 12Z" strokeLinejoin="round" />
    </svg>
  ),
  bathroom: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M6 16H26" />
      <path d="M8 16V8C8 6.89543 8.89543 6 10 6H12" />
      <path d="M6 16V22C6 24.2091 7.79086 26 10 26H22C24.2091 26 26 24.2091 26 22V16" />
      <circle cx="8" cy="22" r="1" />
      <circle cx="24" cy="22" r="1" />
    </svg>
  ),
  furniture: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M6 18H26V22H6V18Z" strokeLinejoin="round" />
      <path d="M8 22V26" />
      <path d="M24 22V26" />
      <path d="M4 14C4 12.8954 4.89543 12 6 12H10V18H4V14Z" strokeLinejoin="round" />
      <path d="M28 14C28 12.8954 27.1046 12 26 12H22V18H28V14Z" strokeLinejoin="round" />
    </svg>
  ),
};

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1 * (index + 1),
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <TiltCard className="group p-6 md:p-8 border border-stone/15 hover:border-stone/30 transition-colors duration-500 bg-offwhite relative overflow-hidden">
        {/* Silver shimmer gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-stone/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(192, 192, 192, 0.1) 50%, transparent 100%)'
          }}
        />

        {/* Subtle hover background */}
        <motion.div
          className="absolute inset-0 bg-stone/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div className="relative z-10">
          <motion.div
            className="text-graphite mb-6 group-hover:text-brass transition-colors duration-500"
          >
            {iconMap[service.icon]}
          </motion.div>

          <h3 className="text-onyx text-lg font-semibold mb-3 tracking-label group-hover:text-onyx transition-colors duration-300">
            {service.title}
          </h3>

          <p className="text-graphite text-sm leading-relaxed">
            {service.description}
          </p>

          {/* Brass underline on hover */}
          <motion.div
            className="h-px bg-brass mt-6 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </TiltCard>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Micro-parallax for section (2-6px)
  const sectionY = useTransform(scrollYProgress, [0, 1], [6, -6]);

  return (
    <section id="services" className="bg-offwhite section-padding-light relative overflow-hidden">
      {/* Top divider line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-stone/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.div
        className="container-arch relative z-10"
        ref={sectionRef}
        style={{ y: sectionY }}
      >
        {/* Section Header with number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >


          <motion.h2
            className="text-onyx mb-6 font-bold"
            initial={{ opacity: 0, y: 20, letterSpacing: "0.08em" }}
            animate={isInView ? { opacity: 1, y: 0, letterSpacing: "0.04em" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Spaces Designed for Certainty
          </motion.h2>

          <motion.div
            className="brass-line"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Bottom divider with chevron */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-stone/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </section>
  );
};

export default Services;
