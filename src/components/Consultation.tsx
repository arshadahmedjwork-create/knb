import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionLabel from "./SectionLabel";
import emailjs from '@emailjs/browser';
import { toast } from "sonner"; // Assuming sonner is available based on package.json

const Consultation = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Micro-parallax
  const sectionY = useTransform(scrollYProgress, [0, 1], [4, -4]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formRef.current) return;

    try {
      // 1. Send Email via EmailJS
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 2. Submit to Google Sheets via Backend
      const formData = new FormData(formRef.current);
      const data = {
        firstName: formData.get('first_name'),
        lastName: formData.get('last_name'),
        email: formData.get('to_email'), // Changed from 'email' to 'to_email'
        projectType: formData.get('project_type'),
        projectBrief: formData.get('message'),
      };

      await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      toast.success("Request sent successfully! We'll be in touch properly.");
      formRef.current.reset();
    } catch (error) {
      console.error('FAILED...', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="bg-offwhite section-padding-light relative overflow-hidden">
      {/* Top divider */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-stone/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.div className="container-arch" ref={ref} style={{ y: sectionY }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel number="06" label="Visit Our Studio" variant="light" />

            <motion.h2
              className="text-onyx mb-6"
              initial={{ opacity: 0, y: 20, letterSpacing: "0.08em" }}
              animate={isInView ? { opacity: 1, y: 0, letterSpacing: "0.04em" } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Begin With a Conversation
            </motion.h2>

            <motion.div
              className="brass-line mb-8"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ originX: 0 }}
            />

            <motion.p
              className="text-graphite text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Every project begins with understanding. Schedule a consultation
              at our studio to discuss your vision, explore material samples,
              and discover how we can bring certainty to your interior project.
            </motion.p>

            {/* Studio Details with progressive disclosure */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                {
                  title: "Studio Address",
                  content: "112 Thyagaraya Road,18/19 Vairam Complex,\n Ground floor, Pondy Bazzar,\nT.Nagar, Chennai, Tamil Nadu, 600017"
                },
                {
                  title: "Opening Hours",
                  content: "Monday – Sunday: 10:00 – 19:00"
                },
                {
                  title: "Contact",
                  content: "studio@knbinnovations.com\n+91 9500107162"
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="group"
                >
                  <h4 className="caption text-onyx mb-2 group-hover:text-brass transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-graphite whitespace-pre-line">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-onyx p-8 md:p-12 relative overflow-hidden"
          >
            {/* Form header */}
            <motion.h3
              className="text-offwhite text-xl font-medium mb-8 tracking-label"
              initial={{ opacity: 0, letterSpacing: "0.06em" }}
              animate={isInView ? { opacity: 1, letterSpacing: "0.02em" } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Request Consultation
            </motion.h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="caption text-stone block mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none transition-colors duration-500"
                    placeholder="John"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="caption text-stone block mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    required
                    className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none transition-colors duration-500"
                    placeholder="Smith"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label className="caption text-stone block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="to_email"
                  required
                  className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none transition-colors duration-500"
                  placeholder="john@example.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label className="caption text-stone block mb-2">
                  Project Type
                </label>
                <select name="project_type" className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none transition-colors duration-500 appearance-none cursor-pointer">
                  <option value="" className="bg-onyx">Select project type</option>
                  <option value="residential" className="bg-onyx">Residential</option>
                  <option value="office" className="bg-onyx">Office</option>
                  <option value="hospitality" className="bg-onyx">Hospitality</option>
                  <option value="retail" className="bg-onyx">Retail</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <label className="caption text-stone block mb-2">
                  Project Brief
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none transition-colors duration-500 resize-none"
                  placeholder="Tell us about your project..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
                className="w-full border border-brass py-4 text-offwhite uppercase tracking-wide-editorial text-sm hover:bg-brass hover:text-onyx transition-all duration-500 mt-4 group flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Sending...' : 'Submit Request'}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </form>
          </motion.div>
        </div>
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

export default Consultation;
