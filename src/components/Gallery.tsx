import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import SectionLabel from "./SectionLabel";
import ImageReveal from "./ImageReveal";
import { X } from "lucide-react";

import projectRes1 from "@/assets/project-res-1.jpg";
import projectRes2 from "@/assets/project-res-2.jpg";
import projectRes3 from "@/assets/project-res-3.jpg";
import projectRes4 from "@/assets/project-res-4.jpg";

const categories = ["All", "Residential"];

const projects = [
  {
    id: 1,
    title: "Residential Project",
    category: "Residential",
    image: projectRes1,
    location: "India",
  },
  {
    id: 2,
    title: "Residential Project",
    category: "Residential",
    image: projectRes2,
    location: "India",
  },
  {
    id: 3,
    title: "Residential Project",
    category: "Residential",
    image: projectRes3,
    location: "India",
  },
  {
    id: 4,
    title: "Residential Project",
    category: "Residential",
    image: projectRes4,
    location: "India",
  },
  {
    id: 5,
    title: "Residential Project",
    category: "Residential",
    image: projectRes1,
    location: "India",
  },
  {
    id: 6,
    title: "Residential Project",
    category: "Residential",
    image: projectRes2,
    location: "India",
  },
  {
    id: 7,
    title: "Residential Project",
    category: "Residential",
    image: projectRes3,
    location: "India",
  },
  {
    id: 8,
    title: "Residential Project",
    category: "Residential",
    image: projectRes4,
    location: "India",
  },
];

const ProjectCard = ({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) => {
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
      onClick={onClick}
      layoutId={`project-card-${project.id}-${index}`} // Unique layoutId for list items
    >
      {/* Image with reveal mask */}
      <ImageReveal className="aspect-[4/3]" delay={index * 0.1}>
        <motion.div
          className="w-full h-full"
          style={{ y: imageY }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            layoutId={`project-image-${project.id}-${index}`} // Unique layoutId for images
          />
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-onyx/0 group-hover:bg-onyx/20 transition-colors duration-500"
        />

        {/* Hover content */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <span className="caption text-offwhite bg-onyx/80 px-4 py-2 backdrop-blur-sm tracking-widest text-xs">
            VIEW
          </span>
        </motion.div>

        {/* Border on hover */}
        <div className="absolute inset-0 border border-transparent group-hover:border-brass/20 transition-colors duration-500 pointer-events-none" />
      </ImageReveal>
    </motion.article>
  );
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedProject, setSelectedProject] = useState<{ project: typeof projects[0], layoutId: string } | null>(null);
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

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

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
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${visibleCount}-${index}`}
              project={project}
              index={index}
              onClick={() => setSelectedProject({ project, layoutId: `project-image-${project.id}-${index}` })}
            />
          ))}
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 md:mt-16 text-center"
          >
            <button
              onClick={handleLoadMore}
              className="group inline-flex items-center gap-3 text-onyx uppercase tracking-wide-editorial text-sm"
            >
              <span className="relative">
                View Projects
                <span className="absolute bottom-0 left-0 w-full h-px bg-brass transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-brass transition-transform duration-300 group-hover:translate-y-1"
              >
                <path
                  d="M8 6L12 10L8 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="rotate(90 10 10)"
                />
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom divider */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-stone/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Image Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-onyx/95 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setSelectedProject(null)}
          >
            <button
              className="absolute top-4 right-4 text-offwhite/50 hover:text-offwhite transition-colors bg-white/10 p-2 rounded-full"
              onClick={() => setSelectedProject(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              layoutId={selectedProject.layoutId}
            >
              <img
                src={selectedProject.project.image}
                alt={selectedProject.project.title}
                className="w-full h-full object-contain rounded-sm shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
