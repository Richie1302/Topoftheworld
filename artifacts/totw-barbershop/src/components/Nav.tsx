import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/Logo";

export function Nav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Gallery", id: "gallery" },
    { label: "About", id: "about" },
    { label: "Reviews", id: "reviews" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-background/96 backdrop-blur-2xl border-b border-border/60 py-2.5"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="cursor-pointer flex items-center" data-testid="nav-logo">
            <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 }}>
              <LogoMark className="h-12 w-auto drop-shadow-lg" />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="relative text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground/60 hover:text-foreground transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-350" />
              </button>
            ))}
            <a
              href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-book-now"
              className="btn-shimmer inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Book Now
            </a>
          </div>

          <button
            className="md:hidden text-foreground/70 hover:text-foreground transition-colors p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/99 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <LogoMark className="h-24 w-auto" />
            </motion.div>

            <nav className="flex flex-col items-center gap-8 mb-12">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollToSection(link.id)}
                  className="font-serif text-5xl font-bold text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 + navLinks.length * 0.07 }}
              href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="btn-shimmer bg-primary text-primary-foreground px-14 py-4 text-xs font-bold uppercase tracking-[0.2em]"
            >
              Book Now
            </motion.a>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-foreground/50 hover:text-foreground transition-colors p-2"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
