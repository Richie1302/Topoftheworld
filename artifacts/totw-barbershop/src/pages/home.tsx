import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Nav } from "@/components/Nav";
import { Star, MapPin, Clock, Calendar, ChevronDown, CheckCircle2 } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg uppercase tracking-widest">{subtitle}</p>}
      <div className="w-24 h-1 bg-primary mx-auto mt-8 rounded-full" />
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Nav />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 z-10" />
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[100px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px]"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mb-6 text-primary"
          >
            <Star className="w-5 h-5 fill-primary" />
            <Star className="w-5 h-5 fill-primary" />
            <Star className="w-5 h-5 fill-primary" />
            <Star className="w-5 h-5 fill-primary" />
            <Star className="w-5 h-5 fill-primary" />
            <span className="text-foreground text-sm tracking-widest uppercase ml-2">4.9 on Booksy</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 max-w-4xl"
          >
            Where All Shades <span className="text-primary italic">Get Fades</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl font-light"
          >
            Precision fades, real conversation, and a chair that feels like it was built for you in Midtown Sacramento.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-5 rounded-sm text-lg font-bold uppercase tracking-widest hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
            >
              Book Your Chair
            </a>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-card border-y border-border py-8 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border">
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-serif font-bold text-primary mb-2">4.9</span>
              <span className="text-sm uppercase tracking-wider text-muted-foreground">Booksy Rating</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-serif font-bold text-primary mb-2">74+</span>
              <span className="text-sm uppercase tracking-wider text-muted-foreground">Five-Star Reviews</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <MapPin className="w-8 h-8 text-primary mb-3" />
              <span className="text-sm uppercase tracking-wider text-muted-foreground">Midtown Sac</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <Clock className="w-8 h-8 text-primary mb-3" />
              <span className="text-sm uppercase tracking-wider text-muted-foreground">Tue-Sat 9AM-6PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeader title="The Menu" subtitle="Precision & Detail" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Haircut", price: "$45", desc: "Classic cuts, fades, tapers, and modern styles tailored to your exact head shape and lifestyle." },
              { name: "Kids Cut", price: "$20", desc: "Patience and precision for the next generation. Sharp styles for every age." },
              { name: "Beard Trim", price: "$25", desc: "Sculpting, lining, and hot towel prep. Walk out looking like a new man." },
              { name: "Add-ons", price: "$10", desc: "Enhance your experience with custom detailing, enhancements, or deep conditioning." }
            ].map((service, i) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true });
              
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border p-8 rounded-sm hover:border-primary/50 transition-all duration-300 group hover:shadow-[0_0_30px_-5px_rgba(201,146,42,0.15)] flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-serif text-2xl font-bold">{service.name}</h3>
                    <span className="text-xl font-bold text-primary">{service.price}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-grow">{service.desc}</p>
                  <div className="mt-8 pt-6 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-primary text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
                      Book Service <ChevronDown className="w-4 h-4 -rotate-90" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 bg-card relative border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Rooted in Midtown.</h2>
              <h3 className="text-2xl text-primary font-serif italic mb-8">Not a franchise. Not a chain.</h3>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Top Of The World is the neighborhood barbershop Midtown Sacramento didn't know it needed. We built this place on two things: precision fades and real conversation.
                </p>
                <p>
                  Skip and Rosario do what they love, the way they've always done it. This isn't about rushing you out of the chair to hit a quota. It's about sitting down, taking a breath, and walking out with the confidence that only comes from a perfect cut.
                </p>
                <p className="text-foreground font-medium pt-4">
                  Community-rooted, skill-driven, and open to every shade and every fade.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" 
                alt="Barbershop interior" 
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 border-2 border-primary/30 m-4 rounded-sm z-20 pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <SectionHeader title="The Standard" subtitle="Why We Stand Out" />
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Precision Fades", desc: "No rushed jobs. Every line, every blend is executed with absolute focus." },
              { title: "Community First", desc: "When you sit in our chair, you're not just a client. You're part of the Midtown family." },
              { title: "Every Shade Welcome", desc: "We know every hair type and texture. True mastery means delivering perfection for everyone." },
              { title: "Seamless Booking", desc: "Your time is valuable. Book exactly when you want through our streamlined Booksy integration." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 p-6"
              >
                <div className="shrink-0 mt-1">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="py-24 md:py-32 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <SectionHeader title="Word on the Street" subtitle="Real Voices" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              { quote: "Skip is the only one that can keep my hair cut right.", author: "Loyal Customer", source: "In-Shop" },
              { quote: "These guys treat you like family. Exceptional barbers, hilarious conversations.", author: "Verified Client", source: "Booksy" },
              { quote: "Solid place. Great cuts, good people, and never overpriced.", author: "Local Resident", source: "Google" },
              { quote: "They know what they're doing. Best fade in Sacramento.", author: "Verified Client", source: "Booksy" },
              { quote: "The vibe is low-key and welcoming. I bring my son here now too.", author: "Local Parent", source: "Google" }
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 rounded-sm border border-border"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg italic mb-6 leading-relaxed">"{review.quote}"</p>
                <div>
                  <p className="font-bold uppercase tracking-widest text-sm text-primary">{review.author}</p>
                  <p className="text-sm text-muted-foreground">{review.source} Review</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <SectionHeader title="Details" subtitle="Frequently Asked" />
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "Do I need an appointment?", a: "While we sometimes can accommodate walk-ins, we highly recommend booking an appointment online to guarantee your spot in the chair." },
              { q: "What services do you offer?", a: "We specialize in precision haircuts, fades, tapers, kids cuts, and full beard trims with hot towel service." },
              { q: "How much does a cut cost?", a: "Our standard haircut is $45. Kids cuts are $20, and beard trims are $25." },
              { q: "Where are you located?", a: "We're right in the heart of Midtown Sacramento at 1910 28th St." },
              { q: "Do you do kids cuts?", a: "Absolutely. We offer kids cuts for $20 and maintain a welcoming, family-friendly environment." }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border-b border-border pb-6"
              >
                <h3 className="font-serif text-xl font-bold mb-3">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 z-0" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8">Ready for a real cut?</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Secure your spot with Skip or Rosario. Don't settle for less than the best in Midtown.
            </p>
            <a
              href="https://booksy.com/en-us/198620_top-of-the-world-barbering-cuts-and-styles_barber-shop_134653_sacramento"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-12 py-6 rounded-sm text-xl font-bold uppercase tracking-widest hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-2xl shadow-primary/20"
            >
              Book Appointment Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-card border-t border-border pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16 max-w-5xl mx-auto text-center md:text-left">
            <div>
              <h4 className="font-serif text-2xl font-bold mb-6 text-foreground">Top Of The World</h4>
              <p className="text-muted-foreground mb-6 max-w-xs mx-auto md:mx-0">
                Where All Shades Get Fades. Midtown's premier destination for precision cuts and real community.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-foreground">Location</h4>
              <p className="text-muted-foreground mb-2">1910 28th St</p>
              <p className="text-muted-foreground mb-4">Sacramento, CA 95816</p>
              <a href="tel:916-475-2789" className="text-primary font-serif text-xl hover:text-primary/80 transition-colors">
                (916) 475-2789
              </a>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-foreground">Hours</h4>
              <div className="space-y-2 text-muted-foreground text-sm w-full max-w-[200px]">
                <div className="flex justify-between">
                  <span>Tue - Sat</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
                <div className="flex justify-between">
                  <span>Monday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Top Of The World Barbershop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}