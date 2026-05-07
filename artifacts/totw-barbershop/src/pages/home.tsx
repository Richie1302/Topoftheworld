import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import {
  Star,
  MapPin,
  Clock,
  ChevronDown,
  CheckCircle2,
  Scissors,
  ChevronRight,
  Phone,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

import heroBg from "@/assets/hero-bg.png";
import toolsImg from "@/assets/tools.png";
import aboutImg from "@assets/38a7363251344bd8aa752afbf2fc0c-top-of-the-world-barbering-cut_1778127820915.jpeg";
import gallery1 from "@assets/165a6ab1b087419b9433e4b9326421-top-of-the-world-barbering-cut_1778127820653.jpeg";
import gallery2 from "@assets/e16d342999804650be4922651ecc1c-top-of-the-world-barbering-cut_1778127820747.jpeg";
import gallery3 from "@assets/e2de4f1138f1458ba03bdbbfeab884-top-of-the-world-barbering-cut_1778127820807.jpeg";
import gallery4 from "@assets/54170c0b502647bfadf6aeec2382d6-top-of-the-world-barbering-cut_1778127820864.jpeg";
import gallery5 from "@assets/87b09975c6c74671b295af4882e3d6-top-of-the-world-barbering-cut_1778127820965.jpeg";

/* ─── Animated Counter ────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return controls.stop;
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Section Reveal ──────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      scale: direction === "scale" ? 0.92 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section Label ───────────────────────────────────────── */
function Label({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-5">
      <span className="h-px w-10 bg-primary block" />
      <span className="text-primary text-xs font-bold uppercase tracking-[0.25em]">{text}</span>
      <span className="h-px w-10 bg-primary block" />
    </div>
  );
}

/* ─── FAQ Item ────────────────────────────────────────────── */
function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={i * 0.07}>
      <div className="border-b border-border">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 py-6 text-left"
          data-testid={`faq-item-${i}`}
        >
          <span className="font-serif text-xl font-semibold">{q}</span>
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 text-primary"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.span>
        </button>
        <AnimateHeight open={open}>
          <p className="text-muted-foreground pb-6 leading-relaxed pr-8">{a}</p>
        </AnimateHeight>
      </div>
    </Reveal>
  );
}

function AnimateHeight({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Testimonial Marquee ─────────────────────────────────── */
const REVIEWS = [
  { quote: "Skip is the only one that can keep my hair cut right.", author: "Loyal Customer", src: "In-Shop" },
  { quote: "These guys treat you like family. Exceptional barbers, hilarious conversations.", author: "Verified Client", src: "Booksy" },
  { quote: "Solid place. Great cuts, good people, and never overpriced.", author: "Local Resident", src: "Google" },
  { quote: "They know what they're doing. Best fade in Sacramento.", author: "Verified Client", src: "Booksy" },
  { quote: "The vibe is low-key and welcoming. I bring my son here now too.", author: "Local Parent", src: "Google" },
  { quote: "Rosario absolutely nailed my lineup. Clean every single time.", author: "Regular Client", src: "Booksy" },
  { quote: "No rush, no shortcuts. They actually care about the cut.", author: "Satisfied Customer", src: "Google" },
];

function Marquee() {
  const doubled = [...REVIEWS, ...REVIEWS];
  return (
    <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((r, i) => (
          <div
            key={i}
            className="w-80 shrink-0 bg-card border border-border p-6 rounded-sm"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm italic leading-relaxed mb-4 text-foreground/90">"{r.quote}"</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{r.author}</span>
              <span className="text-xs text-muted-foreground">{r.src}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Drag Gallery ────────────────────────────────────────── */
const GALLERY = [
  { src: gallery1, label: "Fresh Cut" },
  { src: gallery2, label: "Clean Fade" },
  { src: gallery3, label: "360 Waves" },
  { src: gallery4, label: "Taper Fade" },
  { src: gallery5, label: "Kids Cut" },
];

function DragGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 40 });

  return (
    <div className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -((GALLERY.length - 1.5) * 320), right: 0 }}
        style={{ x: springX }}
        className="flex gap-5 px-6 md:px-12 w-max"
      >
        {GALLERY.map((item, i) => (
          <motion.div
            key={i}
            className="relative w-64 md:w-72 shrink-0 overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <motion.img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{item.label}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <p className="text-center text-xs text-muted-foreground tracking-widest uppercase mt-6">
        Drag to explore
      </p>
    </div>
  );
}

/* ─── Service Row ─────────────────────────────────────────── */
function ServiceRow({
  item,
  i,
}: {
  item: { name: string; duration: string; price: string };
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      className="flex items-center justify-between py-4 border-b border-border/40 last:border-0 group"
    >
      <div className="flex items-center gap-4">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300 shrink-0" />
        <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
          {item.name}
        </span>
      </div>
      <div className="flex items-center gap-6 shrink-0">
        <span className="text-xs text-muted-foreground tracking-wider hidden sm:block">{item.duration}</span>
        <span className="font-serif font-bold text-lg text-primary">{item.price}</span>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const ctaRef = useRef(null);
  const { scrollYProgress: ctaScroll } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const ctaY = useTransform(ctaScroll, [0, 1], ["0%", "20%"]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Nav />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <img
            src={heroBg}
            alt="Top Of The World Barbershop interior"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
        </motion.div>

        {/* Animated gold orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[30vw] h-[30vw] rounded-full bg-primary/8 blur-[120px] z-0"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[25vw] h-[25vw] rounded-full bg-primary/5 blur-[100px] z-0"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center"
          style={{ opacity: heroOpacity }}
        >
          {/* Stars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-2 mb-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              >
                <Star className="w-5 h-5 fill-primary text-primary" />
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-foreground/80 text-sm tracking-widest uppercase ml-3 font-medium"
            >
              4.9 on Booksy · 74+ Reviews
            </motion.span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-6xl md:text-8xl lg:text-[9rem] font-bold leading-none tracking-tight"
            >
              Where All Shades
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-6xl md:text-8xl lg:text-[9rem] font-bold leading-none tracking-tight text-primary italic"
            >
              Get Fades.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl font-light leading-relaxed"
          >
            Precision fades, real conversation, and a chair that feels like it was built for you.{" "}
            <span className="text-foreground/70">Midtown Sacramento.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-book-cta"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95"
            >
              Book Your Chair
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.span>
            </a>
            <a
              href="https://wa.me/19164752789?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20Top%20Of%20The%20World%20Barbershop"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-cta"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-green-400 transition-colors duration-300 text-sm tracking-wider group"
            >
              <FaWhatsapp className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              Text us on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="relative z-20 bg-card border-y border-border overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-primary/3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <div className="container mx-auto px-6 py-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-border">
            {[
              { value: 4.9, suffix: "★", label: "Booksy Rating", isDecimal: true },
              { value: 74, suffix: "+", label: "Five-Star Reviews" },
              { value: 42, suffix: "+", label: "Google Reviews" },
              { icon: <Clock className="w-7 h-7 text-primary" />, label: "Tue–Sat  9AM–6PM" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1} direction="scale">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  {"icon" in stat ? (
                    <>{stat.icon}</>
                  ) : (
                    <span className="text-3xl md:text-4xl font-serif font-bold text-primary mb-1">
                      {stat.isDecimal ? (
                        <span>{stat.value}{stat.suffix}</span>
                      ) : (
                        <Counter to={stat.value as number} suffix={stat.suffix} />
                      )}
                    </span>
                  )}
                  <span className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 md:py-36">
        <div className="container mx-auto px-6">
          <Reveal>
            <Label text="The Menu" />
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-center mb-4">Precision & Detail</h2>
            <p className="text-muted-foreground text-center text-lg max-w-lg mx-auto mb-20 leading-relaxed">
              Every service is executed with focus. No shortcuts, no rushed timers.
            </p>
          </Reveal>

          {/* Featured cards */}
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-20">
            {[
              {
                name: "The Cut",
                price: "from $20",
                icon: <Scissors className="w-6 h-6" />,
                desc: "Fades, tapers, textured crops, clean line-ups, and classic cuts — shaped to your head and your life. Kids cuts available too.",
                tag: "Most Popular",
              },
              {
                name: "Face & Beard",
                price: "from $15",
                icon: <Star className="w-6 h-6" />,
                desc: "Full beard trims, hot-towel shaves, razor lines, and facial treatments. Walk out looking like a new man.",
                tag: "Premium Experience",
              },
              {
                name: "Add-Ons",
                price: "from $10",
                icon: <CheckCircle2 className="w-6 h-6" />,
                desc: "Shampoo, steam towel, and custom enhancements. Stack them on any service to go from great to unforgettable.",
                tag: "Enhance Your Visit",
              },
            ].map((service, i) => (
              <Reveal key={i} delay={i * 0.12} direction="up">
                <motion.div
                  className="relative bg-card border border-border p-7 overflow-hidden group cursor-default h-full flex flex-col"
                  whileHover={{ y: -6, borderColor: "hsl(39 65% 48% / 0.6)" }}
                  transition={{ duration: 0.3 }}
                  data-testid={`service-card-${i}`}
                >
                  <motion.div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" style={{ pointerEvents: "none" }} />
                  <motion.div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 mb-5 w-fit">
                    {service.tag}
                  </span>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-primary">{service.icon}</span>
                    <span className="font-serif text-xl font-bold text-primary">{service.price}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-3">{service.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{service.desc}</p>
                  <div className="mt-6 pt-5 border-t border-border">
                    <a
                      href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 hover:gap-3 transition-all duration-300"
                    >
                      Book This <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Full price menu */}
          <Reveal>
            <div className="max-w-4xl mx-auto bg-card border border-border overflow-hidden">
              {/* Menu header */}
              <div className="bg-primary/10 border-b border-border px-8 py-5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Full Price List</span>
                <span className="text-xs text-muted-foreground tracking-wider">All prices from Booksy</span>
              </div>

              {/* Cut section */}
              <div className="px-8 pt-8 pb-4">
                <div className="flex items-center gap-3 mb-6">
                  <Scissors className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">The Cut</span>
                  <span className="flex-1 h-px bg-border" />
                </div>
                <div className="space-y-0">
                  {[
                    { name: "Haircut", duration: "1 hr", price: "$45" },
                    { name: "Line Up", duration: "30 min", price: "$20" },
                    { name: "Kids Cut", duration: "30 min", price: "$20" },
                  ].map((item, i) => (
                    <ServiceRow key={i} item={item} i={i} />
                  ))}
                </div>
              </div>

              <div className="mx-8 border-t border-border" />

              {/* Face & Beard section */}
              <div className="px-8 pt-8 pb-4">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Face & Beard</span>
                  <span className="flex-1 h-px bg-border" />
                </div>
                <div className="space-y-0">
                  {[
                    { name: "Beard Trim", duration: "30 min", price: "$25" },
                    { name: "Shave", duration: "20 min", price: "$25" },
                    { name: "Facial", duration: "30 min", price: "$25" },
                    { name: "Razor Line", duration: "30 min", price: "$15" },
                  ].map((item, i) => (
                    <ServiceRow key={i} item={item} i={i} />
                  ))}
                </div>
              </div>

              <div className="mx-8 border-t border-border" />

              {/* Add-ons section */}
              <div className="px-8 pt-8 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Add-Ons</span>
                  <span className="flex-1 h-px bg-border" />
                </div>
                <div className="space-y-0">
                  {[
                    { name: "Shampoo", duration: "15 min", price: "$10" },
                    { name: "Steam Towel", duration: "15 min", price: "$10" },
                    { name: "Enhancements", duration: "30 min", price: "$10" },
                  ].map((item, i) => (
                    <ServiceRow key={i} item={item} i={i} />
                  ))}
                </div>
              </div>

              {/* Menu footer CTA */}
              <div className="bg-primary/5 border-t border-border px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Ready to book? Select your service on Booksy.
                </p>
                <a
                  href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
                >
                  Book on Booksy <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-16 md:py-24 border-y border-border bg-card overflow-hidden">
        <Reveal className="container mx-auto px-6 mb-12">
          <Label text="The Work" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center">Fresh Out the Chair</h2>
        </Reveal>
        <DragGallery />
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 md:py-36 relative overflow-hidden">
        {/* Background tools image */}
        <div className="absolute inset-0 opacity-5 z-0">
          <img src={toolsImg} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Image with clip-path reveal */}
            <Reveal direction="left">
              <div className="relative group">
                <motion.div
                  className="relative overflow-hidden aspect-[4/5]"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                >
                  <img
                    src={aboutImg}
                    alt="Barber at work"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                </motion.div>
                {/* Gold frame accent */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/30 pointer-events-none z-10" />
                {/* Floating badge */}
                <motion.div
                  className="absolute -top-5 -right-5 bg-primary text-primary-foreground px-5 py-3 z-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <span className="text-xs font-bold uppercase tracking-widest block">Midtown's Own</span>
                  <span className="text-2xl font-serif font-bold">Since Day One</span>
                </motion.div>
              </div>
            </Reveal>

            {/* Text */}
            <Reveal direction="right" delay={0.2}>
              <Label text="Our Story" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3 leading-tight">
                Rooted in Midtown.
              </h2>
              <h3 className="text-xl text-primary font-serif italic mb-8">
                Not a franchise. Never will be.
              </h3>

              <div className="space-y-5 text-muted-foreground leading-relaxed text-[1.05rem]">
                <p>
                  Top Of The World is the neighborhood barbershop Midtown Sacramento didn't know it needed. 
                  Built on two things that never go out of style: precision fades and real conversation.
                </p>
                <p>
                  Skip and Rosario do what they love, the way they've always done it. No quota, no rush. 
                  You sit down, take a breath, and walk out with the kind of confidence that only comes 
                  from a cut that was actually built for you.
                </p>
                <p className="text-foreground font-semibold text-lg font-serif italic">
                  "Community-rooted, skill-driven, and open to every shade and every fade."
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                >
                  Book with Skip or Rosario <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-28 md:py-36 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <Reveal>
            <Label text="The Standard" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16">Why This Chair</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Precision Fades",
                desc: "Every line, every blend — executed with absolute focus. No rushed jobs, no second guesses.",
                num: "01",
              },
              {
                title: "Community First",
                desc: "When you sit in our chair, you're part of the Midtown family. Real people, real conversation.",
                num: "02",
              },
              {
                title: "Every Shade Welcome",
                desc: "True mastery means delivering perfection across every hair type and texture. That's the promise.",
                num: "03",
              },
              {
                title: "Book in 60 Seconds",
                desc: "Your time is as valuable as your look. Our Booksy integration makes securing your spot effortless.",
                num: "04",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="relative border border-border p-8 group overflow-hidden"
                  whileHover={{ borderColor: "hsl(39 65% 48% / 0.5)" }}
                  transition={{ duration: 0.3 }}
                  data-testid={`why-card-${i}`}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/0 group-hover:bg-primary/4 transition-colors duration-500"
                    style={{ pointerEvents: "none" }}
                  />
                  <span className="text-[5rem] font-serif font-bold text-primary/10 absolute -top-4 -right-2 leading-none select-none">
                    {item.num}
                  </span>
                  <h3 className="font-serif text-2xl font-bold mb-3 relative z-10">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS MARQUEE ── */}
      <section id="reviews" className="py-28 md:py-36 overflow-hidden">
        <div className="container mx-auto px-6 mb-14">
          <Reveal>
            <Label text="Real Voices" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center">Word on the Street</h2>
          </Reveal>
        </div>
        <Marquee />
        <div className="container mx-auto px-6 mt-10 text-center">
          <Reveal delay={0.2}>
            <a
              href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest"
            >
              Read all reviews on Booksy <ChevronRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 md:py-36 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <Reveal>
            <Label text="FAQ" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16">Good Questions</h2>
          </Reveal>
          <div className="max-w-2xl mx-auto">
            {[
              {
                q: "Do I need an appointment?",
                a: "We strongly recommend booking ahead through Booksy to guarantee your spot. Walk-ins depend on availability, and we'd hate for you to make the trip for nothing.",
              },
              {
                q: "What services do you offer?",
                a: "Precision haircuts, fades, tapers, textured crops, kids cuts, beard trims with hot towel service, and various add-on detailing options.",
              },
              {
                q: "How much does a cut cost?",
                a: "Standard haircuts are $45. Kids cuts are $20. Beard trims run $25. Add-ons are $10 each. Straightforward pricing, no surprises.",
              },
              {
                q: "Where exactly are you located?",
                a: "Right in the heart of Midtown Sacramento — 1910 28th St, Sacramento, CA 95816. Easy to find, easy to park.",
              },
              {
                q: "Do you cut kids' hair?",
                a: "Absolutely. Kids cuts are $20, and we keep a welcoming, patient environment for the younger clients. Bring the whole family.",
              },
            ].map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        ref={ctaRef}
        className="relative py-40 overflow-hidden flex items-center justify-center"
      >
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: ctaY }}
        >
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover scale-110 opacity-30"
          />
          <div className="absolute inset-0 bg-background/80" />
        </motion.div>

        {/* Glowing orb */}
        <motion.div
          className="absolute w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[150px] z-0"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal direction="scale">
            <Label text="Your Next Cut" />
            <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Ready for a real cut?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed">
              Secure your spot with Skip or Rosario. Don't settle for less than the best fade in Midtown.
            </p>
            <motion.a
              href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="cta-book-now"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-14 py-6 text-base font-bold uppercase tracking-widest shadow-2xl shadow-primary/30"
              whileHover={{ scale: 1.05, boxShadow: "0 30px 60px -10px hsl(39 65% 48% / 0.4)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Book Appointment Now
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.span>
            </motion.a>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/19164752789?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20Top%20Of%20The%20World%20Barbershop"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-whatsapp"
                className="inline-flex items-center gap-2.5 border border-green-500/40 text-green-400 hover:bg-green-500/10 hover:border-green-400 px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FaWhatsapp className="w-4 h-4" />
                Text Us on WhatsApp
              </a>
              <a
                href="tel:916-475-2789"
                className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                (916) 475-2789
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-card border-t border-border pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16 max-w-5xl mx-auto">
            <div>
              <h4 className="font-serif text-2xl font-bold mb-2 text-foreground">
                <span className="text-primary">✦</span> Top Of The World
              </h4>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-5">
                Where All Shades Get Fades
              </p>
              <p className="text-muted-foreground text-sm mb-6 max-w-xs leading-relaxed">
                Midtown's premier destination for precision cuts, real community, and the kind of confidence you carry all week.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/TopOfTheWorldBarberingStyles/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                >
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/explore/locations/745515716/top-of-the-world-barbering-styles/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/19164752789?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20Top%20Of%20The%20World%20Barbershop"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-green-400 hover:border-green-500 transition-colors duration-300"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-foreground flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary" /> Location
              </h4>
              <address className="not-italic text-muted-foreground text-sm space-y-1.5">
                <p>1910 28th St</p>
                <p>Sacramento, CA 95816</p>
                <p className="pt-2">Midtown Sacramento</p>
              </address>
              <a
                href="tel:916-475-2789"
                className="mt-4 inline-block text-primary font-serif text-xl hover:text-primary/80 transition-colors"
              >
                (916) 475-2789
              </a>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-foreground flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary" /> Hours
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {[
                  ["Tuesday – Saturday", "9:00 AM – 6:00 PM"],
                  ["Sunday", "Closed"],
                  ["Monday", "Closed"],
                ].map(([day, time]) => (
                  <div key={day} className="flex justify-between gap-4">
                    <span>{day}</span>
                    <span className={time === "Closed" ? "text-muted-foreground/50" : "text-foreground"}>{time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                >
                  Book Online via Booksy →
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>&copy; 2025 Top Of The World Barbershop. All rights reserved.</p>
            <p className="text-primary/60">1910 28th St, Sacramento, CA 95816</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
