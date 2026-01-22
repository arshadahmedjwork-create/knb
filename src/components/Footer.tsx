import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="bg-onyx border-t border-stone/10" ref={ref}>
      {/* Main Footer */}
      <div className="container-arch py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Logo className="h-12 w-auto" />
              <span className="text-offwhite font-body text-sm uppercase tracking-editorial">
                KNB Innovations
              </span>
            </div>
            <p className="text-offwhite/60 text-base max-w-md leading-relaxed mb-6">
              Premium interior architecture and construction for clients who
              prioritize certainty over spectacle. Material honesty. Process
              transparency. Architectural precision.
            </p>
            <motion.p
              className="font-display italic text-stone text-lg"
              initial={{ opacity: 0, letterSpacing: "0.06em" }}
              animate={isInView ? { opacity: 1, letterSpacing: "0.02em" } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Designed Quietly. Built Precisely.
            </motion.p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="caption text-offwhite mb-6">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {["Services", "Projects", "Process", "About", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="group text-offwhite/60 hover:text-offwhite text-sm transition-colors duration-300 inline-flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                >
                  <span>{item}</span>
                  <span className="w-0 group-hover:w-2 h-px bg-brass transition-all duration-300" />
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="caption text-offwhite mb-6">Contact</h4>
            <div className="space-y-4 text-offwhite/60 text-sm">
              <p>
                112 Thyagaraya Road,<br />
                18/19 Vairam Complex, Ground floor, Pondy Bazzar,<br />
                T.Nagar, Chennai, Tamil Nadu, 600017
              </p>
              <h4 className="font-display font-medium mb-2 text-offwhite mt-4">TIMINGS</h4>
              <p>Monday to Sunday | 10AM to 7PM</p>

              <h4 className="font-display font-medium mb-2 text-offwhite mt-4">CONTACT NUMBER</h4>
              <p>
                <a
                  href="tel:+919500107162"
                  className="hover:text-offwhite transition-colors duration-300"
                >
                  +91 9500107162
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Border Band - animated divider */}
      <motion.div
        className="h-px bg-stone/20 origin-left"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Bottom Bar */}
      <div className="container-arch py-6">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-offwhite/40 text-xs">
            © {currentYear} KNB Innovations. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="group text-offwhite/40 hover:text-offwhite text-xs transition-colors duration-300 relative"
            >
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-full h-px bg-brass/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
            <a
              href="#"
              className="group text-offwhite/40 hover:text-offwhite text-xs transition-colors duration-300 relative"
            >
              Terms of Service
              <span className="absolute bottom-0 left-0 w-full h-px bg-brass/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
