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
  Calendar,
  ArrowRight,
  Quote,
  Sparkles,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

import heroBg from "@/assets/hero-bg.png";
import toolsImg from "@/assets/tools.png";
import { LogoMark } from "@/components/Logo";
import aboutImg from "@assets/38a7363251344bd8aa752afbf2fc0c-top-of-the-world-barbering-cut_1778127820915.jpeg";
import gallery1 from "@assets/165a6ab1b087419b9433e4b9326421-top-of-the-world-barbering-cut_1778127820653.jpeg";
import gallery2 from "@assets/e16d342999804650be4922651ecc1c-top-of-the-world-barbering-cut_1778127820747.jpeg";
import gallery3 from "@assets/e2de4f1138f1458ba03bdbbfeab884-top-of-the-world-barbering-cut_1778127820807.jpeg";
import gallery4 from "@assets/54170c0b502647bfadf6aeec2382d6-top-of-the-world-barbering-cut_1778127820864.jpeg";
import gallery5 from "@assets/87b09975c6c74671b295af4882e3d6-top-of-the-world-barbering-cut_1778127820965.jpeg";

/* ─── Animated Counter ────────────────────────────────────── */
function Counter({ to, suffix = "", decimal = false }: { to: number; suffix?: string; decimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(decimal ? 4.0 : 0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current)
          ref.current.textContent = decimal
            ? `${v.toFixed(1)}${suffix}`
            : `${Math.round(v)}${suffix}`;
      },
    });
    return controls.stop;
  }, [inView, to, suffix, decimal]);
  return <span ref={ref}>{decimal ? `${to}${suffix}` : `0${suffix}`}</span>;
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
  const inView = useInView(ref, { once: true, margin: "-6%" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 36 : 0,
      x: direction === "left" ? -48 : direction === "right" ? 48 : 0,
      scale: direction === "scale" ? 0.94 : 1,
    },
    visible: {
      opacity: 1, y: 0, x: 0, scale: 1,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Section Label ───────────────────────────────────────── */
function Label({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-5">
      <span className="h-px w-8 bg-primary/60 block" />
      <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">{text}</span>
      <span className="h-px w-8 bg-primary/60 block" />
    </div>
  );
}

/* ─── FAQ Item ────────────────────────────────────────────── */
function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={i * 0.06}>
      <div className="border-b border-border/60">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 py-6 text-left group"
          data-testid={`faq-item-${i}`}
        >
          <span className="font-serif text-lg md:text-xl font-semibold group-hover:text-primary transition-colors duration-300">{q}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 w-6 h-6 border border-border/80 group-hover:border-primary/60 flex items-center justify-center text-primary transition-colors duration-300"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.span>
        </button>
        <AnimateHeight open={open}>
          <p className="text-muted-foreground pb-6 leading-relaxed pr-10 text-[0.95rem]">{a}</p>
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
      transition={{ duration: 0.32, ease: "easeInOut" }}
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
  { quote: "I drove from Elk Grove just for this. Worth every mile.", author: "Repeat Client", src: "Booksy" },
];

function Marquee() {
  const doubled = [...REVIEWS, ...REVIEWS];
  return (
    <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
      <motion.div
        className="flex gap-5 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((r, i) => (
          <div
            key={i}
            className="w-80 shrink-0 bg-card border border-border/70 p-7 gold-border-card"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-3 h-3 fill-primary text-primary" />
              ))}
              <span className="ml-auto text-[10px] text-muted-foreground tracking-wider uppercase">{r.src}</span>
            </div>
            <p className="text-sm italic leading-relaxed mb-5 text-foreground/85">"{r.quote}"</p>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">{r.author}</span>
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
        className="flex gap-4 px-6 md:px-12 w-max"
      >
        {GALLERY.map((item, i) => (
          <motion.div
            key={i}
            className="relative w-64 md:w-72 shrink-0 overflow-hidden group"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.09 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <motion.img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary block">{item.label}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <p className="text-center text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase mt-6">
        Drag to explore
      </p>
    </div>
  );
}

/* ─── Service Row ─────────────────────────────────────────── */
function ServiceRow({ item, i }: { item: { name: string; duration: string; price: string }; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: i * 0.05 }}
      className="flex items-center justify-between py-4 border-b border-border/30 last:border-0 group cursor-default"
    >
      <div className="flex items-center gap-4">
        <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300 shrink-0" />
        <span className="font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-300 text-[0.95rem]">
          {item.name}
        </span>
      </div>
      <div className="flex items-center gap-6 shrink-0">
        <span className="text-xs text-muted-foreground/70 tracking-wider hidden sm:block">{item.duration}</span>
        <span className="font-serif font-bold text-lg text-primary">{item.price}</span>
      </div>
    </motion.div>
  );
}

/* ─── Floating WhatsApp ───────────────────────────────────── */
function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.a
      href="https://wa.me/19164752789?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20Top%20Of%20The%20World%20Barbershop"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-black/50"
    >
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <FaWhatsapp className="w-7 h-7 text-white relative z-10" />
    </motion.a>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  const ctaRef = useRef(null);
  const { scrollYProgress: ctaScroll } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const ctaY = useTransform(ctaScroll, [0, 1], ["0%", "20%"]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Nav />
      <WhatsAppFloat />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden grain"
      >
        {/* Parallax background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            src={heroBg}
            alt="Top Of The World Barbershop interior"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
        </motion.div>

        {/* Ambient orbs */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-[32vw] h-[32vw] rounded-full bg-primary/7 blur-[130px] z-0"
          animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[22vw] h-[22vw] rounded-full bg-primary/4 blur-[100px] z-0"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center"
          style={{ opacity: heroOpacity }}
        >
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.4 + i * 0.07 }}
                >
                  <Star className="w-4 h-4 fill-primary text-primary" />
                </motion.span>
              ))}
            </div>
            <span className="w-px h-4 bg-border/60" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="text-foreground/70 text-xs tracking-[0.22em] uppercase font-medium"
            >
              4.9 · 74+ Reviews on Booksy
            </motion.span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: 110, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.95, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold leading-[0.9] tracking-tight"
            >
              Where All Shades
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 110, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.95, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold leading-[0.9] tracking-tight text-primary italic"
            >
              Get Fades.
            </motion.h1>
          </div>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="gold-rule w-32 mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.85 }}
            className="text-base md:text-lg text-muted-foreground mb-10 max-w-md font-light leading-relaxed tracking-wide"
          >
            Precision fades and real conversation — the kind of cut that carries you all week.{" "}
            <span className="text-foreground/60">Midtown Sacramento.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-book-cta"
              className="btn-shimmer group inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all duration-300 shadow-2xl shadow-primary/25 hover:shadow-primary/45 hover:scale-[1.03] active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              Book My Appointment
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.span>
            </a>
            <a
              href="https://wa.me/19164752789?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20Top%20Of%20The%20World%20Barbershop"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-cta"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-green-400 transition-colors duration-300 text-xs tracking-[0.15em] uppercase font-medium group"
            >
              <FaWhatsapp className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              Text Us on WhatsApp
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5 text-[10px] text-muted-foreground/60 uppercase tracking-[0.22em]"
          >
            {["Midtown Sacramento", "Walk-ins Welcome", "Open Tue–Sat"].map((item, i) => (
              <span key={i} className="flex items-center gap-5">
                {i > 0 && <span className="w-px h-3 bg-border/50" />}
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-primary/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="relative z-20 bg-card border-y border-border overflow-hidden">
        <div className="gold-rule absolute top-0 left-0 right-0" />
        <div className="container mx-auto px-6 py-0">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
            {[
              { value: 4.9, suffix: "★", label: "Booksy Rating", decimal: true },
              { value: 74, suffix: "+", label: "Five-Star Reviews" },
              { value: 42, suffix: "+", label: "Google Reviews" },
              { icon: <Clock className="w-6 h-6 text-primary" />, label: "Tue–Sat · 9AM–6PM" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08} direction="scale">
                <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                  {"icon" in stat ? (
                    <>{stat.icon}</>
                  ) : (
                    <span className="text-3xl md:text-4xl font-serif font-bold text-primary mb-1 tabular-nums">
                      {stat.decimal ? (
                        <Counter to={stat.value as number} suffix={stat.suffix} decimal />
                      ) : (
                        <Counter to={stat.value as number} suffix={stat.suffix} />
                      )}
                    </span>
                  )}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 mt-2 leading-tight">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="gold-rule absolute bottom-0 left-0 right-0" />
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════ */}
      <section id="services" className="py-28 md:py-40">
        <div className="container mx-auto px-6">
          <Reveal>
            <Label text="The Menu" />
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-center mb-3 leading-tight">
              Every Cut. Every Time.
            </h2>
            <p className="text-muted-foreground text-center text-base max-w-md mx-auto mb-20 leading-relaxed">
              Executed with focus. No shortcuts, no rushed timers. Your head deserves full attention.
            </p>
          </Reveal>

          {/* Featured service cards */}
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-20">
            {[
              {
                name: "The Cut",
                price: "from $20",
                icon: <Scissors className="w-5 h-5" />,
                desc: "Fades, tapers, textured crops, clean line-ups, and classic cuts — shaped to your head and your life. Kids cuts available.",
                tag: "Most Popular",
              },
              {
                name: "Face & Beard",
                price: "from $15",
                icon: <Sparkles className="w-5 h-5" />,
                desc: "Full beard trims, hot-towel shaves, razor lines, and facial treatments. Walk out looking like a different person.",
                tag: "Premium Experience",
              },
              {
                name: "Add-Ons",
                price: "from $10",
                icon: <CheckCircle2 className="w-5 h-5" />,
                desc: "Shampoo, steam towel, and custom enhancements. Stack them on any service for a complete experience.",
                tag: "Enhance Your Visit",
              },
            ].map((service, i) => (
              <Reveal key={i} delay={i * 0.1} direction="up">
                <motion.div
                  className="relative bg-card border border-border/70 p-7 overflow-hidden group cursor-default h-full flex flex-col gold-border-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  data-testid={`service-card-${i}`}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/0 group-hover:bg-primary/4 transition-colors duration-500"
                    style={{ pointerEvents: "none" }}
                  />
                  <motion.div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-primary/6 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="inline-block text-[9px] font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 px-3 py-1 mb-5 w-fit">
                    {service.tag}
                  </span>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-primary/80">{service.icon}</span>
                    <span className="font-serif text-xl font-bold text-primary">{service.price}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-3">{service.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{service.desc}</p>
                  <div className="mt-6 pt-5 border-t border-border/50">
                    <a
                      href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-1.5 hover:gap-3 transition-all duration-300"
                    >
                      Book This <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Full price menu */}
          <Reveal>
            <div className="max-w-3xl mx-auto bg-card border border-border/70 overflow-hidden gold-border-card">
              <div className="px-8 py-5 border-b border-border/50 flex items-center justify-between bg-primary/5">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Full Price List</span>
                <span className="text-[10px] text-muted-foreground/70 tracking-wider">Prices via Booksy</span>
              </div>

              <div className="px-8 pt-7 pb-3">
                <div className="flex items-center gap-3 mb-5">
                  <Scissors className="w-3.5 h-3.5 text-primary/70" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/80">The Cut</span>
                  <span className="flex-1 h-px bg-border/40" />
                </div>
                {[
                  { name: "Haircut", duration: "1 hr", price: "$45" },
                  { name: "Line Up", duration: "30 min", price: "$20" },
                  { name: "Kids Cut", duration: "30 min", price: "$20" },
                ].map((item, i) => <ServiceRow key={i} item={item} i={i} />)}
              </div>

              <div className="mx-8 border-t border-border/30" />

              <div className="px-8 pt-7 pb-3">
                <div className="flex items-center gap-3 mb-5">
                  <Star className="w-3.5 h-3.5 text-primary/70" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/80">Face & Beard</span>
                  <span className="flex-1 h-px bg-border/40" />
                </div>
                {[
                  { name: "Beard Trim", duration: "30 min", price: "$25" },
                  { name: "Shave", duration: "20 min", price: "$25" },
                  { name: "Facial", duration: "30 min", price: "$25" },
                  { name: "Razor Line", duration: "30 min", price: "$15" },
                ].map((item, i) => <ServiceRow key={i} item={item} i={i} />)}
              </div>

              <div className="mx-8 border-t border-border/30" />

              <div className="px-8 pt-7 pb-7">
                <div className="flex items-center gap-3 mb-5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary/70" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/80">Add-Ons</span>
                  <span className="flex-1 h-px bg-border/40" />
                </div>
                {[
                  { name: "Shampoo", duration: "15 min", price: "$10" },
                  { name: "Steam Towel", duration: "15 min", price: "$10" },
                  { name: "Enhancements", duration: "30 min", price: "$10" },
                ].map((item, i) => <ServiceRow key={i} item={item} i={i} />)}
              </div>

              <div className="bg-primary/5 border-t border-border/40 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">No hidden fees. What you see is what you pay.</p>
                <a
                  href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
                >
                  Book on Booksy <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════════════════ */}
      <section id="gallery" className="py-16 md:py-24 border-y border-border/50 bg-card overflow-hidden">
        <Reveal className="container mx-auto px-6 mb-12">
          <Label text="The Work" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-2">Fresh Out the Chair</h2>
          <p className="text-muted-foreground text-center text-sm max-w-xs mx-auto">Real cuts. Real clients. Real results.</p>
        </Reveal>
        <DragGallery />
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════ */}
      <section id="about" className="py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] z-0">
          <img src={toolsImg} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
            {/* Image */}
            <Reveal direction="left">
              <div className="relative group">
                <motion.div
                  className="relative overflow-hidden aspect-[4/5]"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
                >
                  <img
                    src={aboutImg}
                    alt="Barber at work"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </motion.div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/20 pointer-events-none z-10" />
                <motion.div
                  className="absolute -top-5 -right-5 bg-primary text-primary-foreground px-5 py-3 z-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.45 }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] block mb-0.5">Midtown's Own</span>
                  <span className="text-xl font-serif font-bold">Since Day One</span>
                </motion.div>
              </div>
            </Reveal>

            {/* Text */}
            <Reveal direction="right" delay={0.15}>
              <Label text="Our Story" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3 leading-tight">
                Rooted in Midtown.
              </h2>
              <h3 className="text-lg text-primary font-serif italic mb-8">
                Not a franchise. Never will be.
              </h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-[0.97rem] mb-8">
                <p>
                  Top Of The World is the neighborhood barbershop Midtown Sacramento didn't know it needed —
                  built on two things that never go out of style: precision fades and real conversation.
                </p>
                <p>
                  Skip and Rosario do what they love, the way they've always done it. No quota, no rush.
                  You sit down, take a breath, and walk out with the kind of confidence that only comes
                  from a cut that was actually built for you.
                </p>
              </div>

              {/* Pull quote */}
              <div className="border-l-2 border-primary/50 pl-6 mb-10">
                <Quote className="w-5 h-5 text-primary/40 mb-2" />
                <p className="font-serif italic text-xl text-foreground/90 leading-snug">
                  "Community-rooted, skill-driven, and open to every shade and every fade."
                </p>
              </div>

              {/* Barbers */}
              <div className="flex gap-6 mb-10">
                {["Skip", "Rosario"].map((name) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm font-bold uppercase tracking-[0.15em] text-foreground/80">{name}</span>
                  </div>
                ))}
                <span className="text-xs text-muted-foreground self-center">Your Barbers</span>
              </div>

              <a
                href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 hover:scale-105 transition-all duration-300"
              >
                Book with Skip or Rosario <ChevronRight className="w-4 h-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROCESS — HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-card border-y border-border/50 overflow-hidden">
        <div className="container mx-auto px-6">
          <Reveal>
            <Label text="The Process" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-3">Three Steps to Fresh</h2>
            <p className="text-muted-foreground text-center text-sm max-w-sm mx-auto mb-20">
              Simple, fast, and done right.
            </p>
          </Reveal>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-px bg-border/40">
              {[
                {
                  num: "01",
                  title: "Book Online",
                  desc: "Pick your barber, select your service, and lock in your time — all in under 60 seconds on Booksy.",
                  icon: <Calendar className="w-6 h-6" />,
                },
                {
                  num: "02",
                  title: "Walk In Ready",
                  desc: "Show up at 1910 28th St, Midtown. No waiting room anxiety — your chair is reserved for you.",
                  icon: <MapPin className="w-6 h-6" />,
                },
                {
                  num: "03",
                  title: "Walk Out Fresh",
                  desc: "Leave with a cut built for your face, your hair, and your confidence. See you in three weeks.",
                  icon: <Sparkles className="w-6 h-6" />,
                },
              ].map((step, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <motion.div
                    className="bg-card p-10 group h-full flex flex-col"
                    whileHover={{ backgroundColor: "hsl(0 0% 9%)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-8">
                      <span className="text-[4.5rem] font-serif font-bold text-primary/8 leading-none select-none">
                        {step.num}
                      </span>
                      <span className="text-primary/60 group-hover:text-primary transition-colors duration-400 mt-1">
                        {step.icon}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                    {i === 0 && (
                      <a
                        href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:gap-3 transition-all duration-300"
                      >
                        Book Now <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              {/* Left: sticky heading */}
              <div className="lg:col-span-2 lg:sticky lg:top-28">
                <Reveal direction="left">
                  <Label text="The Standard" />
                  <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
                    Why This<br /><span className="text-primary italic">Chair</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-[0.95rem] mb-8">
                    Plenty of places will cut your hair. Very few will build it.
                    Here's the difference you'll feel the moment you sit down.
                  </p>
                  <a
                    href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                  >
                    Reserve Your Spot
                  </a>
                </Reveal>
              </div>

              {/* Right: differentiator list */}
              <div className="lg:col-span-3 space-y-0">
                {[
                  {
                    title: "Precision Every Time",
                    desc: "Every line, every blend — executed with absolute focus. No rushed jobs, no second guesses. Your cut is the only one that matters in that moment.",
                  },
                  {
                    title: "Every Hair Type. Every Shade.",
                    desc: "True mastery means delivering perfection across every texture and type. Coily, wavy, straight, or anything between — we've got you.",
                  },
                  {
                    title: "Community, Not a Conveyor Belt",
                    desc: "When you sit in this chair, you're not just a ticket number. Real conversation, real recognition — you'll feel it in the first ten seconds.",
                  },
                  {
                    title: "Family-Friendly from Day One",
                    desc: "Dads, moms, and kids — all welcome. We've been cutting kids' hair with patience and care since the beginning.",
                  },
                  {
                    title: "Seamless Online Booking",
                    desc: "Your time is valuable. Book your chair in under 60 seconds on Booksy, any time of day or night.",
                  },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <motion.div
                      className="group flex gap-6 py-7 border-b border-border/40 last:border-0"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.25 }}
                      data-testid={`why-card-${i}`}
                    >
                      <span className="shrink-0 w-8 h-8 border border-border/60 group-hover:border-primary/50 flex items-center justify-center text-[11px] font-bold text-primary/60 group-hover:text-primary transition-colors duration-300 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-[0.93rem] leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section id="reviews" className="py-28 md:py-40 bg-card border-y border-border/50 overflow-hidden">
        <div className="container mx-auto px-6 mb-16">
          <Reveal>
            <Label text="Real Voices" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-3">
              Word on the Street
            </h2>
            <p className="text-muted-foreground text-center text-sm max-w-xs mx-auto">
              4.9 stars across 74+ reviews. Read what Midtown is saying.
            </p>
          </Reveal>

          {/* Featured testimonials */}
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mt-14">
            {[
              {
                quote: "Skip is the only one that can keep my hair cut right. I've been coming here for years and I won't go anywhere else.",
                author: "Loyal Customer",
                src: "In-Shop · 5 Stars",
              },
              {
                quote: "These guys treat you like family. Exceptional barbers, great conversations, and I always leave feeling like a million bucks.",
                author: "Verified Client",
                src: "Booksy · 5 Stars",
              },
            ].map((r, i) => (
              <Reveal key={i} delay={i * 0.1} direction="up">
                <div className="bg-background border border-border/70 p-8 gold-border-card h-full flex flex-col">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="font-serif italic text-lg text-foreground/90 leading-relaxed flex-grow mb-6">
                    "{r.quote}"
                  </p>
                  <div className="flex items-center justify-between border-t border-border/40 pt-5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{r.author}</span>
                    <span className="text-[10px] text-muted-foreground/60">{r.src}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <Marquee />

        <div className="container mx-auto px-6 mt-12 text-center">
          <Reveal delay={0.15}>
            <a
              href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-bold text-primary hover:text-primary/70 transition-colors uppercase tracking-[0.25em]"
            >
              See All Reviews on Booksy <ChevronRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-40">
        <div className="container mx-auto px-6">
          <Reveal>
            <Label text="FAQ" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16">Good Questions</h2>
          </Reveal>

          <div className="max-w-2xl mx-auto">
            {[
              {
                q: "Do I need an appointment?",
                a: "We strongly recommend booking ahead through Booksy to guarantee your spot. Walk-ins depend on availability — book ahead and skip the wait.",
              },
              {
                q: "What services do you offer?",
                a: "Precision haircuts, fades, tapers, textured crops, kids cuts, beard trims with hot-towel service, straight razor shaves, facials, and add-on detailing.",
              },
              {
                q: "How much does a cut cost?",
                a: "Standard haircuts are $45. Kids cuts are $20. Beard trims run $25. Add-ons start at $10. Straightforward pricing — no surprises at the register.",
              },
              {
                q: "Where exactly are you located?",
                a: "Right in the heart of Midtown Sacramento — 1910 28th St, Sacramento, CA 95816. Easy to find, easy to park.",
              },
              {
                q: "Do you cut kids' hair?",
                a: "Absolutely. Kids cuts are $20, and we run a patient, welcoming environment for younger clients. Bring the whole family.",
              },
              {
                q: "Can I choose my barber?",
                a: "Yes — when you book on Booksy you can select Skip or Rosario directly. Both deliver the same precision and care, just with their own signature style.",
              },
            ].map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} i={i} />
            ))}
          </div>

          {/* FAQ footer CTA */}
          <Reveal delay={0.2}>
            <div className="max-w-2xl mx-auto mt-12 pt-10 border-t border-border/40 text-center">
              <p className="text-muted-foreground text-sm mb-4">Still have a question? We're easy to reach.</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="tel:916-475-2789"
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary hover:text-primary/70 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> (916) 475-2789
                </a>
                <span className="w-px h-4 bg-border/50" />
                <a
                  href="https://wa.me/19164752789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-green-400 hover:text-green-300 transition-colors"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="relative py-44 overflow-hidden flex items-center justify-center"
      >
        <motion.div className="absolute inset-0 z-0" style={{ y: ctaY }}>
          <img src={heroBg} alt="" className="w-full h-full object-cover scale-110 opacity-25" />
          <div className="absolute inset-0 bg-background/85" />
        </motion.div>

        <motion.div
          className="absolute w-[55vw] h-[55vw] rounded-full bg-primary/8 blur-[160px] z-0"
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal direction="scale">
            <Label text="Your Next Cut Awaits" />
            <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Stop settling for average.<br />
              <span className="text-primary italic">Your best cut is one click away.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-sm mx-auto leading-relaxed">
              Skip and Rosario are ready for you. Secure your chair before someone else does.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-book-now"
                className="btn-shimmer inline-flex items-center gap-3 bg-primary text-primary-foreground px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] shadow-2xl shadow-primary/30"
                whileHover={{ scale: 1.04, boxShadow: "0 30px 60px -10px hsl(38 72% 50% / 0.4)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Calendar className="w-4 h-4" />
                Book Appointment Now
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.span>
              </motion.a>

              <a
                href="https://wa.me/19164752789?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20Top%20Of%20The%20World%20Barbershop"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-whatsapp"
                className="inline-flex items-center gap-2.5 border border-green-500/35 text-green-400 hover:bg-green-500/10 hover:border-green-400/60 px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FaWhatsapp className="w-4 h-4" />
                Text Us on WhatsApp
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground/50">
              <Phone className="w-3 h-3" />
              <a href="tel:916-475-2789" className="hover:text-primary transition-colors">
                (916) 475-2789
              </a>
              <span className="mx-2">·</span>
              <MapPin className="w-3 h-3" />
              <span>1910 28th St, Midtown Sacramento</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer className="bg-card border-t border-border/50 pt-20 pb-10">
        <div className="gold-rule mb-0" />
        <div className="container mx-auto px-6 pt-0">
          <div className="grid md:grid-cols-3 gap-12 mb-16 max-w-5xl mx-auto">
            {/* Brand */}
            <div>
              <LogoMark className="h-28 w-auto mb-4 -ml-1" />
              <p className="text-primary text-[10px] font-bold uppercase tracking-[0.28em] mb-4">
                Where All Shades Get Fades
              </p>
              <p className="text-muted-foreground text-sm mb-7 max-w-xs leading-relaxed">
                Midtown's premier destination for precision cuts, real community, and the confidence you carry all week.
              </p>
              <div className="flex gap-3">
                {[
                  { href: "https://www.facebook.com/TopOfTheWorldBarberingStyles/", icon: <FaFacebook className="w-4 h-4" />, label: "Facebook", hover: "hover:text-primary hover:border-primary" },
                  { href: "https://www.instagram.com/explore/locations/745515716/top-of-the-world-barbering-styles/", icon: <FaInstagram className="w-4 h-4" />, label: "Instagram", hover: "hover:text-primary hover:border-primary" },
                  { href: "https://wa.me/19164752789", icon: <FaWhatsapp className="w-4 h-4" />, label: "WhatsApp", hover: "hover:text-green-400 hover:border-green-500" },
                ].map(({ href, icon, label, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-9 h-9 border border-border/60 flex items-center justify-center text-muted-foreground transition-colors duration-300 ${hover}`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-bold uppercase tracking-[0.22em] text-[10px] mb-6 text-foreground/80 flex items-center gap-2">
                <MapPin className="w-3 h-3 text-primary" /> Location
              </h4>
              <address className="not-italic text-muted-foreground text-sm space-y-1.5 mb-4">
                <p>1910 28th St</p>
                <p>Sacramento, CA 95816</p>
                <p className="pt-1 text-foreground/60 text-xs">Midtown Sacramento</p>
              </address>
              <a href="tel:916-475-2789" className="inline-block text-primary font-serif text-xl hover:text-primary/70 transition-colors">
                (916) 475-2789
              </a>
              <div className="mt-4">
                <a
                  href="https://maps.google.com/?q=1910+28th+St+Sacramento+CA+95816"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/60 hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  Get Directions <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-bold uppercase tracking-[0.22em] text-[10px] mb-6 text-foreground/80 flex items-center gap-2">
                <Clock className="w-3 h-3 text-primary" /> Hours
              </h4>
              <div className="space-y-2.5 text-sm text-muted-foreground mb-6">
                {[
                  ["Tuesday – Saturday", "9:00 AM – 6:00 PM", false],
                  ["Sunday", "Closed", true],
                  ["Monday", "Closed", true],
                ].map(([day, time, closed]) => (
                  <div key={day as string} className="flex justify-between gap-4">
                    <span className="text-[0.85rem]">{day}</span>
                    <span className={closed ? "text-muted-foreground/35" : "text-foreground/80"}>{time}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary hover:text-primary/70 transition-colors"
              >
                Book Online via Booksy →
              </a>
            </div>
          </div>

          <div className="gold-rule mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground/50">
            <p>&copy; 2025 Top Of The World Barbershop. All rights reserved.</p>
            <p>1910 28th St · Sacramento, CA 95816</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
