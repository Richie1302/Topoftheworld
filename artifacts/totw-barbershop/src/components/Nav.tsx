import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Link } from "wouter";

export function Nav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-tight text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          Top Of The World
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          <button
            onClick={() => scrollToSection("services")}
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("reviews")}
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Reviews
          </button>
          <a
            href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm hover:bg-primary/90 hover:scale-105 transition-all duration-300 font-semibold"
          >
            Book Now
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
