import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SectionLabel from "./SectionLabel";
import ImageReveal from "./ImageReveal";

import projectOffice from "@/assets/project-office.jpg";
import projectResidential from "@/assets/project-residential.jpg";
import projectHospitality from "@/assets/project-hospitality.jpg";
import projectRetail from "@/assets/project-retail.jpg";

const categories = ["All", "Residential", "Office", "Hospitality", "Retail"];

const projects = [
  {
    id: 1,
    title: "The Kensington Residence",
    category: "Residential",
    image: projectResidential,
    location: "London",
  },
  {
    id: 2,
    title: "Meridian Executive Suite",
    category: "Office",
    image: projectOffice,
    location: "Dubai",
  },
  {
    id: 3,
    title: "The Carlisle Hotel",
    category: "Hospitality",
    image: projectHospitality,
    location: "Singapore",
  },
  {
    id: 4,
    title: "Atelier Maison",
    category: "Retail",
    image: projectRetail,
    location: "Paris",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Micro-parallax on image (2-6px range)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="group cursor-pointer"
    >
      {/* Image with reveal mask */}
      <ImageReveal className="aspect-[4/3] mb-5" delay={index * 0.1}>
        <motion.div
          className="w-full h-full"
          style={{ y: imageY }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-onyx/0 group-hover:bg-onyx/20 transition-colors duration-500"
        />

        {/* Hover content */}
        <motion.div
          className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <span className="caption text-offwhite bg-onyx/80 px-3 py-1.5 backdrop-blur-sm">
            View Project
          </span>
        </motion.div>

        {/* Border on hover */}
        <div className="absolute inset-0 border border-transparent group-hover:border-brass/20 transition-colors duration-500 pointer-events-none" />
      </ImageReveal>

      {/* Content */}
      <motion.div
        className="flex items-start justify-between gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
      >
        <div>
          <h3 className="text-onyx text-lg md:text-xl font-semibold mb-1 tracking-label group-hover:text-brass transition-colors duration-500">
            {project.title}
          </h3>
          <p className="text-graphite text-sm">{project.location}</p>
        </div>

        {/* Chevron indicator */}
        <motion.div
          className="mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-brass"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Micro-parallax for section
  const sectionY = useTransform(scrollYProgress, [0, 1], [4, -4]);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="gallery" className="bg-offwhite section-padding-light relative overflow-hidden" ref={sectionRef}>
      {/* Top divider */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-stone/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.div className="container-arch" style={{ y: sectionY }}>
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16"
        >
          <div>


            <motion.h2
              className="text-onyx font-bold"
              initial={{ opacity: 0, y: 20, letterSpacing: "0.08em" }}
              animate={isHeaderInView ? { opacity: 1, y: 0, letterSpacing: "0.04em" } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Project Portfolio
            </motion.h2>
          </div>

          {/* Filter Pills */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0 }}
                animate={isHeaderInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className={`px-5 py-3 text-sm uppercase tracking-wide-editorial transition-all duration-500 ${activeCategory === category
                  ? "bg-onyx text-offwhite"
                  : "bg-transparent text-graphite border border-stone/30 hover:border-onyx/50"
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* View All Link with chevron */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 text-center"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-3 text-onyx uppercase tracking-wide-editorial text-sm"
          >
            <span className="relative">
              View All Projects
              <span className="absolute bottom-0 left-0 w-full h-px bg-brass transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-brass transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom divider */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-stone/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </section>
  );
};

export default Gallery;
