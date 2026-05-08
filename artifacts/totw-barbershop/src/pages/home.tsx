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

const BOOKSY =
  "https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento";
const WHATSAPP =
  "https://wa.me/19164752789?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment%20at%20Top%20Of%20The%20World%20Barbershop";

/* ─── Animated Counter ────────────────────────────────────── */
function Counter({
  to,
  suffix = "",
  decimal = false,
}: {
  to: number;
  suffix?: string;
  decimal?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(decimal ? 4.0 : 0, to, {
      duration: 2.2,
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
  return (
    <span ref={ref}>
      {decimal ? `${to}${suffix}` : `0${suffix}`}
    </span>
  );
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
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 32 : 0,
      x: direction === "left" ? -44 : direction === "right" ? 44 : 0,
      scale: direction === "scale" ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
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
    <div className="flex items-center gap-3 justify-center mb-4">
      <span className="h-px w-7 bg-primary/50 block" />
      <span className="text-primary text-[10px] font-bold uppercase tracking-[0.28em]">
        {text}
      </span>
      <span className="h-px w-7 bg-primary/50 block" />
    </div>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────── */
function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={i * 0.05}>
      <div className="border-b border-border/50">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-6 py-5 text-left group"
          data-testid={`faq-item-${i}`}
        >
          <span className="font-serif text-lg font-semibold text-foreground/90 group-hover:text-foreground transition-colors duration-300 leading-snug">
            {q}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.22 }}
            className="shrink-0 w-5 h-5 border border-border/70 group-hover:border-primary/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors duration-300"
          >
            <ChevronRight className="w-3 h-3" />
          </motion.span>
        </button>
        <AnimateHeight open={open}>
          <p className="text-muted-foreground pb-5 leading-relaxed pr-10 text-[0.9rem]">
            {a}
          </p>
        </AnimateHeight>
      </div>
    </Reveal>
  );
}

function AnimateHeight({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Reviews ─────────────────────────────────────────────── */
const REVIEWS = [
  {
    quote: "Skip is the only one that can keep my hair cut right.",
    author: "Loyal Customer",
    src: "In-Shop",
  },
  {
    quote:
      "These guys treat you like family. Exceptional barbers, hilarious conversations.",
    author: "Verified Client",
    src: "Booksy",
  },
  {
    quote: "Solid place. Great cuts, good people, and never overpriced.",
    author: "Local Resident",
    src: "Google",
  },
  {
    quote: "They know what they're doing. Best fade in Sacramento.",
    author: "Verified Client",
    src: "Booksy",
  },
  {
    quote: "The vibe is low-key and welcoming. I bring my son here now too.",
    author: "Local Parent",
    src: "Google",
  },
  {
    quote: "Rosario absolutely nailed my lineup. Clean every single time.",
    author: "Regular Client",
    src: "Booksy",
  },
  {
    quote: "No rush, no shortcuts. They actually care about the cut.",
    author: "Satisfied Customer",
    src: "Google",
  },
  {
    quote: "I drove from Elk Grove just for this. Worth every mile.",
    author: "Repeat Client",
    src: "Booksy",
  },
];

function FiveStars({ size = "sm" }: { size?: "sm" | "md" }) {
  const cls = size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${cls} fill-primary text-primary`} />
      ))}
    </div>
  );
}

function Marquee() {
  const doubled = [...REVIEWS, ...REVIEWS];
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
      }}
    >
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((r, i) => (
          <div
            key={i}
            className="w-76 shrink-0 bg-background border border-border/60 px-7 py-6 gold-border-card"
          >
            <div className="flex items-center justify-between mb-4">
              <FiveStars />
              <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60">
                {r.src}
              </span>
            </div>
            <p className="text-[0.85rem] italic leading-relaxed text-foreground/80 mb-4">
              "{r.quote}"
            </p>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/70">
              {r.author}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Gallery ─────────────────────────────────────────────── */
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
  const springX = useSpring(x, { stiffness: 280, damping: 38 });
  return (
    <div className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -((GALLERY.length - 1.5) * 310), right: 0 }}
        style={{ x: springX }}
        className="flex gap-3 px-6 md:px-12 w-max"
      >
        {GALLERY.map((item, i) => (
          <motion.div
            key={i}
            className="relative w-60 md:w-68 shrink-0 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden group">
              <motion.img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-primary">
                  {item.label}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <p className="text-center text-[9px] text-muted-foreground/40 tracking-[0.35em] uppercase mt-5">
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
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.32, delay: i * 0.04 }}
      className="flex items-center justify-between py-3.5 border-b border-border/25 last:border-0 group cursor-default"
    >
      <div className="flex items-center gap-3.5">
        <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300 shrink-0" />
        <span className="text-[0.9rem] font-medium text-foreground/85 group-hover:text-foreground transition-colors duration-300">
          {item.name}
        </span>
      </div>
      <div className="flex items-center gap-6 shrink-0">
        <span className="text-[11px] text-muted-foreground/50 tracking-wider hidden sm:block">
          {item.duration}
        </span>
        <span className="font-serif font-bold text-[1.1rem] text-primary">
          {item.price}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Floating WhatsApp ───────────────────────────────────── */
function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2800);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-6 z-50 w-13 h-13 bg-[#25D366] rounded-full flex items-center justify-center"
      style={{ width: 52, height: 52, boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)" }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />
      <FaWhatsapp className="w-6 h-6 text-white relative z-10" />
    </motion.a>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "26%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const ctaRef = useRef(null);
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaY = useTransform(ctaScroll, [0, 1], ["0%", "18%"]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Nav />
      <WhatsAppFloat />

      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden grain"
      >
        {/* Parallax bg */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            src={heroBg}
            alt="Top Of The World Barbershop interior"
            className="w-full h-full object-cover scale-110"
          />
          {/* Multi-layer overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background/98" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-transparent to-background/55" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
        </motion.div>

        {/* Ambient glows */}
        <motion.div
          className="absolute top-1/3 left-[30%] w-[35vw] h-[35vw] rounded-full bg-primary/6 blur-[140px] z-0"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[25%] w-[20vw] h-[20vw] rounded-full bg-primary/4 blur-[100px] z-0"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center"
          style={{ opacity: heroOpacity }}
        >
          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-10 px-5 py-2.5 border border-primary/20 bg-primary/5 backdrop-blur-sm"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.35 + i * 0.06 }}
                >
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                </motion.span>
              ))}
            </div>
            <span className="w-px h-3.5 bg-border/70" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="text-[10px] font-semibold tracking-[0.22em] uppercase text-foreground/65"
            >
              4.9 · 74+ Reviews on Booksy
            </motion.span>
          </motion.div>

          {/* Headline — editorial scale */}
          <div className="overflow-hidden mb-0.5">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-serif text-[clamp(3rem,10.5vw,7.5rem)] font-bold leading-[0.88] tracking-tight"
            >
              Where All Shades
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-7">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-serif text-[clamp(3rem,10.5vw,7.5rem)] font-bold leading-[0.88] tracking-tight text-primary italic"
            >
              Get Fades.
            </motion.h1>
          </div>

          {/* Elegant gold rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="gold-rule w-24 mb-7"
          />

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-base md:text-lg text-muted-foreground mb-9 max-w-[380px] font-light leading-relaxed"
          >
            Precision fades and real conversation — the cut that carries your confidence all week.{" "}
            <span className="text-foreground/50">Midtown Sacramento.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            <a
              href={BOOKSY}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-book-cta"
              className="btn-shimmer group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground px-9 py-4 text-[11px] font-bold uppercase tracking-[0.16em] shadow-2xl shadow-primary/20 hover:bg-primary/92 hover:shadow-primary/35 hover:scale-[1.025] active:scale-95 transition-all duration-300"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              Book My Appointment
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              </motion.span>
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-foreground/55 hover:text-green-400 transition-colors duration-300 text-[11px] tracking-[0.14em] uppercase font-medium group border border-border/40 hover:border-green-500/40 px-6 py-4"
            >
              <FaWhatsapp className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              Text Us on WhatsApp
            </a>
          </motion.div>

          {/* Trust micro-bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.9 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-0 text-[9px] text-muted-foreground/45 uppercase tracking-[0.24em]"
          >
            {[
              "Midtown Sacramento",
              "Walk-ins Welcome",
              "Open Tue–Sat",
              "Kids Welcome",
            ].map((item, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && (
                  <span className="mx-3 w-px h-2.5 bg-border/40 inline-block" />
                )}
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-primary/35" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══ STATS STRIP ════════════════════════════════════════ */}
      <section className="relative z-20 overflow-hidden section-glow">
        <div className="absolute inset-0 bg-card" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/40">
            {[
              { value: 4.9, suffix: "★", label: "Booksy Rating", decimal: true },
              { value: 74, suffix: "+", label: "Five-Star Reviews" },
              { value: 42, suffix: "+", label: "Google Reviews" },
              {
                icon: (
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                    <span className="text-foreground/85 text-sm font-semibold block">Tue – Sat</span>
                    <span className="text-muted-foreground text-[11px]">9 AM – 6 PM</span>
                  </div>
                ),
              },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.07} direction="scale">
                <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                  {"icon" in stat ? (
                    stat.icon
                  ) : (
                    <>
                      <span className="text-4xl md:text-5xl font-serif font-bold text-primary mb-1.5 tabular-nums leading-none">
                        {stat.decimal ? (
                          <Counter to={stat.value as number} suffix={stat.suffix} decimal />
                        ) : (
                          <Counter to={stat.value as number} suffix={stat.suffix} />
                        )}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60">
                        {stat.label}
                      </span>
                    </>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="gold-rule absolute bottom-0 left-0 right-0" />
      </section>

      {/* ══ SERVICES ═══════════════════════════════════════════ */}
      <section id="services" className="py-28 md:py-40">
        <div className="container mx-auto px-6">
          <Reveal>
            <Label text="The Menu" />
            <h2 className="font-serif text-4xl md:text-[3.5rem] font-bold text-center mb-3 leading-[1.1]">
              Every Cut. Every Time.
            </h2>
            <p className="text-muted-foreground text-center text-[0.93rem] max-w-sm mx-auto mb-20 leading-relaxed">
              Executed with focus. No shortcuts, no rushed timers — your head deserves full attention.
            </p>
          </Reveal>

          {/* Featured cards */}
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-20">
            {[
              {
                name: "The Cut",
                price: "from $20",
                icon: <Scissors className="w-5 h-5" />,
                desc: "Fades, tapers, textured crops, clean line-ups, classic cuts — shaped to your head and your life. Kids cuts available.",
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
                desc: "Shampoo, steam towel, and custom enhancements. Stack them on any service for a complete, elevated experience.",
                tag: "Enhance Your Visit",
              },
            ].map((service, i) => (
              <Reveal key={i} delay={i * 0.1} direction="up">
                <motion.div
                  className="relative bg-card border border-border/60 p-7 overflow-hidden group cursor-default h-full flex flex-col gold-border-card card-depth"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  data-testid={`service-card-${i}`}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/0 group-hover:bg-primary/3 transition-colors duration-500"
                    style={{ pointerEvents: "none" }}
                  />
                  <span className="inline-block text-[9px] font-bold uppercase tracking-[0.22em] text-primary bg-primary/10 px-3 py-1 mb-5 w-fit">
                    {service.tag}
                  </span>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-primary/70">{service.icon}</span>
                    <span className="font-serif text-xl font-bold text-primary">
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-3">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                    {service.desc}
                  </p>
                  <div className="mt-6 pt-5 border-t border-border/40">
                    <a
                      href={BOOKSY}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary flex items-center gap-1.5 hover:gap-3 transition-all duration-300"
                    >
                      Book This Service <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Full price menu */}
          <Reveal>
            <div className="max-w-3xl mx-auto bg-card border border-border/60 overflow-hidden gold-border-card card-depth">
              <div className="px-8 py-4 border-b border-border/40 flex items-center justify-between bg-primary/4">
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-primary">
                  Full Price List
                </span>
                <span className="text-[9px] text-muted-foreground/50 tracking-wider">
                  All prices via Booksy
                </span>
              </div>

              {[
                {
                  icon: <Scissors className="w-3 h-3 text-primary/60" />,
                  label: "The Cut",
                  items: [
                    { name: "Haircut", duration: "1 hr", price: "$45" },
                    { name: "Line Up", duration: "30 min", price: "$20" },
                    { name: "Kids Cut", duration: "30 min", price: "$20" },
                  ],
                },
                {
                  icon: <Star className="w-3 h-3 text-primary/60" />,
                  label: "Face & Beard",
                  items: [
                    { name: "Beard Trim", duration: "30 min", price: "$25" },
                    { name: "Shave", duration: "20 min", price: "$25" },
                    { name: "Facial", duration: "30 min", price: "$25" },
                    { name: "Razor Line", duration: "30 min", price: "$15" },
                  ],
                },
                {
                  icon: <CheckCircle2 className="w-3 h-3 text-primary/60" />,
                  label: "Add-Ons",
                  items: [
                    { name: "Shampoo", duration: "15 min", price: "$10" },
                    { name: "Steam Towel", duration: "15 min", price: "$10" },
                    { name: "Enhancements", duration: "30 min", price: "$10" },
                  ],
                },
              ].map((section, si) => (
                <div key={si}>
                  {si > 0 && <div className="mx-8 border-t border-border/20" />}
                  <div className="px-8 pt-6 pb-2">
                    <div className="flex items-center gap-2.5 mb-4">
                      {section.icon}
                      <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-primary/75">
                        {section.label}
                      </span>
                      <span className="flex-1 h-px bg-border/25" />
                    </div>
                    {section.items.map((item, i) => (
                      <ServiceRow key={i} item={item} i={i} />
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-primary/4 border-t border-border/30 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[0.85rem] text-muted-foreground">
                  No hidden fees. Straightforward pricing, always.
                </p>
                <a
                  href={BOOKSY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Book on Booksy <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ GALLERY ════════════════════════════════════════════ */}
      <section
        id="gallery"
        className="py-16 md:py-24 border-y border-border/50 bg-card overflow-hidden section-glow"
      >
        <Reveal className="container mx-auto px-6 mb-12">
          <Label text="The Work" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-2">
            Fresh Out the Chair
          </h2>
          <p className="text-muted-foreground text-center text-[0.85rem] max-w-[220px] mx-auto">
            Real cuts. Real clients. Real results.
          </p>
        </Reveal>
        <DragGallery />
      </section>

      {/* ══ ABOUT ══════════════════════════════════════════════ */}
      <section id="about" className="py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] z-0 pointer-events-none">
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
                  transition={{
                    duration: 1.1,
                    delay: 0.1,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <img
                    src={aboutImg}
                    alt="Barber at work — Top Of The World Barbershop"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-800 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                </motion.div>
                {/* Gold offset frame */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/18 pointer-events-none z-10" />
                {/* Floating badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-5 py-3 z-20 shadow-xl shadow-primary/20"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65, duration: 0.4 }}
                >
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] block mb-0.5">
                    Midtown's Own
                  </span>
                  <span className="text-xl font-serif font-bold leading-none">
                    Since Day One
                  </span>
                </motion.div>
              </div>
            </Reveal>

            {/* Text */}
            <Reveal direction="right" delay={0.1}>
              <Label text="Our Story" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3 leading-tight">
                Rooted in Midtown.
              </h2>
              <h3 className="text-base text-primary font-serif italic mb-8 font-semibold">
                Not a franchise. Never will be.
              </h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed text-[0.93rem] mb-8">
                <p>
                  Top Of The World is the neighborhood barbershop Midtown
                  Sacramento didn't know it needed — built on two things that
                  never go out of style: precision fades and real conversation.
                </p>
                <p>
                  Skip and Rosario do what they love, the way they've always
                  done it. No quota, no rush. You sit down, take a breath, and
                  walk out with the kind of confidence that only comes from a
                  cut actually built for you.
                </p>
              </div>

              {/* Pull quote */}
              <div className="relative pl-6 mb-10">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 to-transparent" />
                <Quote className="w-4 h-4 text-primary/35 mb-2" />
                <p className="font-serif italic text-[1.2rem] text-foreground/88 leading-snug">
                  "Community-rooted, skill-driven, and open to every shade and
                  every fade."
                </p>
              </div>

              {/* Barber tags */}
              <div className="flex items-center gap-5 mb-9">
                {["Skip", "Rosario"].map((name) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/75">
                      {name}
                    </span>
                  </div>
                ))}
                <span className="text-[10px] text-muted-foreground/50 italic">
                  Your Barbers
                </span>
              </div>

              <a
                href={BOOKSY}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-[11px] font-bold uppercase tracking-[0.16em] hover:bg-primary/90 hover:scale-[1.025] transition-all duration-300"
              >
                Book with Skip or Rosario{" "}
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-card border-y border-border/50 overflow-hidden section-glow">
        <div className="container mx-auto px-6">
          <Reveal>
            <Label text="How It Works" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-2">
              Three Steps to Fresh
            </h2>
            <p className="text-muted-foreground text-center text-[0.85rem] max-w-[260px] mx-auto mb-20">
              Simple. Fast. Done right.
            </p>
          </Reveal>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-px bg-border/30">
            {[
              {
                num: "01",
                title: "Book Online",
                desc: "Pick your barber and service on Booksy. Your chair is locked in under 60 seconds — any time of day.",
                icon: <Calendar className="w-5 h-5" />,
                cta: true,
              },
              {
                num: "02",
                title: "Walk In Ready",
                desc: "Show up at 1910 28th St, Midtown. No waiting room anxiety — your appointment is reserved.",
                icon: <MapPin className="w-5 h-5" />,
                cta: false,
              },
              {
                num: "03",
                title: "Walk Out Fresh",
                desc: "Leave with a precision cut built for your face, your texture, and your confidence. See you in three weeks.",
                icon: <Sparkles className="w-5 h-5" />,
                cta: false,
              },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="bg-card px-9 py-10 group h-full flex flex-col"
                  whileHover={{ backgroundColor: "hsl(24 6% 9%)" }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="flex items-start justify-between mb-7">
                    <span className="text-[5rem] font-serif font-bold text-primary/7 leading-none select-none">
                      {step.num}
                    </span>
                    <span className="text-muted-foreground/40 group-hover:text-primary transition-colors duration-400 mt-2">
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-[0.87rem] leading-relaxed flex-grow">
                    {step.desc}
                  </p>
                  {step.cta && (
                    <a
                      href={BOOKSY}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-primary hover:gap-3 transition-all duration-300"
                    >
                      Book Now <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══════════════════════════════════════ */}
      <section className="py-28 md:py-40">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              {/* Sticky heading */}
              <div className="lg:col-span-2 lg:sticky lg:top-24">
                <Reveal direction="left">
                  <Label text="The Standard" />
                  <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5">
                    Why This
                    <br />
                    <span className="text-primary italic">Chair.</span>
                  </h2>
                  <p className="text-muted-foreground text-[0.9rem] leading-relaxed mb-8">
                    Plenty of places cut hair. Few actually build it. Here's the
                    difference you'll feel from the moment you sit down.
                  </p>
                  <a
                    href={BOOKSY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.16em] hover:bg-primary/90 hover:scale-[1.025] transition-all duration-300"
                  >
                    Reserve Your Spot
                  </a>
                </Reveal>
              </div>

              {/* Differentiator list */}
              <div className="lg:col-span-3">
                {[
                  {
                    title: "Precision Every Single Time",
                    desc: "Every line, every blend — absolute focus. No rushed jobs, no second guesses. Your cut is the only one that matters in that chair.",
                  },
                  {
                    title: "Every Hair Type. Every Shade.",
                    desc: "True mastery means delivering perfection across every texture and type. Coily, wavy, straight, or anything between — we've got you.",
                  },
                  {
                    title: "Community, Not a Conveyor Belt",
                    desc: "You're not a ticket number here. Real conversation, real recognition — you'll feel it in the first ten seconds.",
                  },
                  {
                    title: "Family-Friendly from Day One",
                    desc: "Dads, kids, first-timers — all welcome. We've been cutting kids' hair with patience since the very beginning.",
                  },
                  {
                    title: "60-Second Booking, Zero Friction",
                    desc: "Your time is valuable. Lock in your spot with Skip or Rosario on Booksy any time — day or night.",
                  },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <motion.div
                      className="group flex gap-5 py-6 border-b border-border/35 last:border-0"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.22 }}
                      data-testid={`why-card-${i}`}
                    >
                      <span className="shrink-0 w-7 h-7 border border-border/50 group-hover:border-primary/40 flex items-center justify-center text-[10px] font-bold text-muted-foreground/50 group-hover:text-primary transition-colors duration-300 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-[0.88rem] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═══════════════════════════════════════ */}
      <section
        id="reviews"
        className="py-28 md:py-40 bg-card border-y border-border/50 overflow-hidden section-glow"
      >
        <div className="container mx-auto px-6 mb-16">
          <Reveal>
            <Label text="Real Voices" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-2">
              Word on the Street
            </h2>
            <p className="text-muted-foreground text-center text-[0.85rem]">
              4.9 stars · 74+ reviews · Sacramento's most trusted
            </p>
          </Reveal>

          {/* Featured quotes */}
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-14">
            {[
              {
                quote:
                  "Skip is the only barber that can keep my hair cut right. I've been coming here for years and I won't go anywhere else.",
                author: "Loyal Customer",
                detail: "In-Shop · 5 Stars",
              },
              {
                quote:
                  "These guys treat you like family. Exceptional skill, great conversations, and I always leave feeling like a million bucks.",
                author: "Verified Client",
                detail: "Booksy · 5 Stars",
              },
            ].map((r, i) => (
              <Reveal key={i} delay={i * 0.09} direction="up">
                <div className="relative bg-background border border-border/55 p-8 gold-border-card card-depth h-full flex flex-col overflow-hidden">
                  {/* Decorative large quote */}
                  <span className="absolute -top-3 -left-1 font-serif text-[9rem] leading-none text-primary/5 select-none pointer-events-none">
                    "
                  </span>
                  <FiveStars size="md" />
                  <p className="font-serif italic text-[1.12rem] text-foreground/88 leading-relaxed flex-grow mt-5 mb-6 relative z-10">
                    "{r.quote}"
                  </p>
                  <div className="flex items-center justify-between border-t border-border/35 pt-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                      {r.author}
                    </span>
                    <span className="text-[9px] text-muted-foreground/50">
                      {r.detail}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <Marquee />

        <div className="container mx-auto px-6 mt-12 text-center">
          <Reveal delay={0.12}>
            <a
              href={BOOKSY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-bold text-primary hover:text-primary/65 transition-colors uppercase tracking-[0.24em]"
            >
              Read All Reviews on Booksy{" "}
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ══ FAQ ════════════════════════════════════════════════ */}
      <section className="py-28 md:py-40">
        <div className="container mx-auto px-6">
          <Reveal>
            <Label text="FAQ" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16">
              Good Questions
            </h2>
          </Reveal>

          <div className="max-w-2xl mx-auto">
            {[
              {
                q: "Do I need an appointment?",
                a: "We strongly recommend booking through Booksy to guarantee your spot. Walk-ins depend on availability — book ahead and skip the wait.",
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
                a: "Absolutely. Kids cuts are $20, and we keep a patient, welcoming environment for our younger clients. Bring the whole family.",
              },
              {
                q: "Can I choose my barber?",
                a: "Yes — when you book on Booksy you can select Skip or Rosario directly. Both deliver the same precision with their own signature style.",
              },
            ].map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} i={i} />
            ))}

            {/* FAQ CTA */}
            <Reveal delay={0.2}>
              <div className="mt-12 pt-8 border-t border-border/35 text-center">
                <p className="text-muted-foreground text-[0.88rem] mb-5">
                  Still have a question? We're easy to reach.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <a
                    href="tel:916-475-2789"
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary hover:text-primary/70 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> (916) 475-2789
                  </a>
                  <span className="w-px h-4 bg-border/50" />
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-green-400 hover:text-green-300 transition-colors"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="relative py-44 md:py-56 overflow-hidden flex items-center justify-center"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: ctaY }}
        >
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover scale-110 opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/95" />
        </motion.div>

        {/* Gold glow */}
        <motion.div
          className="absolute w-[55vw] h-[55vw] rounded-full bg-primary/8 blur-[180px] z-0"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 9, repeat: Infinity }}
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal direction="scale">
            <Label text="Your Next Cut Awaits" />
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05]">
              Sacramento's finest barbers
              <br />
              <span className="text-primary italic">are ready for you.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-[340px] mx-auto leading-relaxed">
              Book your spot with Skip or Rosario today — precision, community,
              and the best fade in Midtown.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.a
                href={BOOKSY}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-book-now"
                className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground px-12 py-5 text-[11px] font-bold uppercase tracking-[0.16em] shadow-2xl shadow-primary/25"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 24px 56px -8px hsl(38 74% 52% / 0.42)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Calendar className="w-4 h-4 shrink-0" />
                Book Appointment Now
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </motion.span>
              </motion.a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cta-whatsapp"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-green-500/30 text-green-400 hover:bg-green-500/8 hover:border-green-400/55 px-8 py-5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:scale-[1.025] active:scale-95"
              >
                <FaWhatsapp className="w-4 h-4" />
                Text Us on WhatsApp
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]">
              <a
                href="tel:916-475-2789"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Phone className="w-3 h-3" /> (916) 475-2789
              </a>
              <span className="w-px h-3 bg-border/40" />
              <a
                href="https://maps.google.com/?q=1910+28th+St+Sacramento+CA+95816"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <MapPin className="w-3 h-3" /> 1910 28th St, Midtown Sacramento
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════════ */}
      <footer className="bg-card border-t border-border/50 pt-20 pb-10">
        <div className="gold-rule mb-0 opacity-60" />
        <div className="container mx-auto px-6 pt-0">
          <div className="grid md:grid-cols-3 gap-12 mb-16 max-w-5xl mx-auto">
            {/* Brand */}
            <div>
              <LogoMark className="h-24 w-auto mb-4 -ml-1" />
              <p className="text-primary text-[9px] font-bold uppercase tracking-[0.28em] mb-4">
                Where All Shades Get Fades
              </p>
              <p className="text-muted-foreground text-[0.85rem] mb-7 max-w-xs leading-relaxed">
                Midtown's premier destination for precision cuts, real
                community, and the confidence you carry all week.
              </p>
              <div className="flex gap-2.5">
                {[
                  {
                    href: "https://www.facebook.com/TopOfTheWorldBarberingStyles/",
                    icon: <FaFacebook className="w-3.5 h-3.5" />,
                    label: "Facebook",
                    hover: "hover:text-primary hover:border-primary/50",
                  },
                  {
                    href: "https://www.instagram.com/explore/locations/745515716/top-of-the-world-barbering-styles/",
                    icon: <FaInstagram className="w-3.5 h-3.5" />,
                    label: "Instagram",
                    hover: "hover:text-primary hover:border-primary/50",
                  },
                  {
                    href: WHATSAPP,
                    icon: <FaWhatsapp className="w-3.5 h-3.5" />,
                    label: "WhatsApp",
                    hover: "hover:text-green-400 hover:border-green-500/50",
                  },
                ].map(({ href, icon, label, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-8 h-8 border border-border/50 flex items-center justify-center text-muted-foreground/60 transition-all duration-300 ${hover}`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-bold uppercase tracking-[0.22em] text-[9px] mb-5 text-foreground/60 flex items-center gap-2">
                <MapPin className="w-3 h-3 text-primary" /> Location
              </h4>
              <address className="not-italic text-muted-foreground text-[0.88rem] space-y-1.5 mb-4 leading-relaxed">
                <p>1910 28th St</p>
                <p>Sacramento, CA 95816</p>
                <p className="text-foreground/40 text-xs pt-0.5">
                  Midtown Sacramento
                </p>
              </address>
              <a
                href="tel:916-475-2789"
                className="inline-block text-primary font-serif text-xl hover:text-primary/70 transition-colors mb-3"
              >
                (916) 475-2789
              </a>
              <div>
                <a
                  href="https://maps.google.com/?q=1910+28th+St+Sacramento+CA+95816"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground/45 hover:text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  Get Directions <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-bold uppercase tracking-[0.22em] text-[9px] mb-5 text-foreground/60 flex items-center gap-2">
                <Clock className="w-3 h-3 text-primary" /> Hours
              </h4>
              <div className="space-y-2.5 text-[0.88rem] text-muted-foreground mb-6">
                {[
                  ["Tuesday – Saturday", "9:00 AM – 6:00 PM", false],
                  ["Sunday", "Closed", true],
                  ["Monday", "Closed", true],
                ].map(([day, time, closed]) => (
                  <div key={day as string} className="flex justify-between gap-4">
                    <span className="text-foreground/60">{day}</span>
                    <span
                      className={
                        closed
                          ? "text-muted-foreground/30"
                          : "text-foreground/80 font-medium"
                      }
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href={BOOKSY}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary hover:text-primary/65 transition-colors"
              >
                Book Online via Booksy →
              </a>
            </div>
          </div>

          <div className="gold-rule opacity-40 mb-7" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-muted-foreground/35 tracking-wider">
            <p>&copy; 2025 Top Of The World Barbershop. All rights reserved.</p>
            <p>1910 28th St · Sacramento, CA 95816</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
