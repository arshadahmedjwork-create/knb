import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  // Track scroll position for header state
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    setIsCollapsed(latest > window.innerHeight * 0.8);
  });

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#gallery" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${isCollapsed
        ? "bg-onyx py-3 shadow-lg shadow-onyx/20"
        : isScrolled
          ? "bg-onyx/95 backdrop-blur-sm py-4"
          : "bg-transparent py-6"
        }`}
    >
      <div className="container-arch flex items-center justify-between">
        {/* Logo with collapse animation */}
        <a href="#" className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: isCollapsed ? 0.85 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Logo className="h-10 w-auto" />
          </motion.div>
          <motion.span
            className="hidden md:block text-offwhite font-body text-sm uppercase tracking-editorial"
            animate={{
              opacity: isCollapsed ? 0 : 1,
              x: isCollapsed ? -10 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            KNB Innovations
          </motion.span>
        </a>

        {/* Desktop Navigation with engineered hover */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative text-offwhite/80 hover:text-offwhite text-sm uppercase tracking-wide-editorial transition-colors duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              {item.label}
              {/* Underline on hover */}
              <span className="absolute bottom-0 left-0 w-full h-px bg-brass transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.a>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          to="/book-consultation"
          className={`hidden md:flex items-center gap-2 border border-brass px-5 py-2.5 text-offwhite text-sm uppercase tracking-wide-editorial hover:bg-brass hover:text-onyx transition-all duration-500 group rounded-full ${isCollapsed ? 'scale-95' : 'scale-100'}`}
        >
          <span>Book Consultation</span>
          <motion.svg
            width="12"
            height="12"
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
          </motion.svg>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-px bg-offwhite"
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 6 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-px bg-offwhite"
            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-px bg-offwhite"
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -6 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="md:hidden overflow-hidden bg-onyx/95 backdrop-blur-sm"
      >
        <nav className="container-arch py-6 flex flex-col gap-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-offwhite/80 hover:text-offwhite text-sm uppercase tracking-wide-editorial py-2 border-b border-offwhite/5"
              initial={{ opacity: 0, x: -20 }}
              animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.05 * index }}
            >
              {item.label}
            </motion.a>
          ))}
          <Link
            to="/book-consultation"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block mt-4 border border-brass px-5 py-3 text-offwhite text-sm uppercase tracking-wide-editorial text-center hover:bg-brass hover:text-onyx transition-all duration-500 rounded-full"
          // @ts-ignore - motion props handling on custom component
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Book Consultation
            </motion.div>
          </Link>
        </nav>
      </motion.div>

      {/* Bottom border line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-offwhite/5"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </motion.header>
  );
};

export default Header;
