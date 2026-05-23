import { motion } from 'motion/react';
import { ArrowRight, Leaf, Coffee, Flame, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-80px)] bg-vanilla flex items-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-clay/15"
    >
      {/* Visual background decorations */}
      <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-leaf/5 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-clay/5 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Side Content */}
        <div className="lg:col-span-5 space-y-8 text-left">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-[#2E7D32]/10 border border-[#2E7D32]/20 px-3.5 py-1.5 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-leaf animate-spin" />
            <span className="text-xs font-semibold text-leaf tracking-wide uppercase font-sans">
              Fresh & Cozy Minimalist Concept
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-[86px] font-black text-charcoal leading-[1.02] tracking-tight">
              Freshness <br />
              <span className="text-clay italic font-normal">meets</span> <br />
              comfort.
            </h1>
            <p className="font-sans text-base sm:text-xl text-charcoal/85 max-w-md font-normal leading-relaxed">
              Welcome to <span className="font-bold relative inline-block text-charcoal group">
                TND Fruit Zone
                <span className="absolute bottom-0.5 left-0 w-full h-[5px] bg-gradient-to-r from-leaf to-[#FF6D00] opacity-35" />
              </span>. Settle down with a traditional hand-brewed masala tea or design your healthy organic fruit bowls with 100% freshness guaranteed.
            </p>
          </motion.div>

          {/* Call-to-actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* Tangelo CTA */}
            <button
              onClick={() => onScrollToSection('menu')}
              className="bg-[#FF6D00] text-white font-bold text-sm tracking-wide px-7 py-3.5 rounded-full shadow-lg hover:bg-[#FF6D00]/90 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center space-x-2 group"
              id="hero-menu-cta"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Clay Outline CTA */}
            <button
              onClick={() => onScrollToSection('experience')}
              className="bg-transparent text-clay border-2 border-clay/30 font-bold text-sm tracking-wide px-7 py-3 rounded-full hover:bg-clay/5 hover:border-clay/50 transition-all duration-300"
              id="hero-philosophy-cta"
            >
              Our Philosophy
            </button>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 pt-6 border-t border-clay/10 max-w-lg"
          >
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-serif font-bold text-leaf block">100%</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-clay block font-sans">
                Freshly Hand-Cut
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-serif font-bold text-clay block">Slow</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-clay block font-sans">
                Brewed Kulhad Chai
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-serif font-bold text-charcoal block">Zero</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-clay block font-sans">
                Preservatives Always
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Side Visual Collage (Asymmetric overlappings with motion) */}
        <div className="lg:col-span-7 relative h-[450px] sm:h-[550px] w-full flex items-center justify-center pt-8 lg:pt-0">
          {/* Aesthetic Circular backdrop ring */}
          <div className="absolute w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-full border border-clay/10 bg-gradient-to-tr from-clay/5 via-[#2E7D32]/5 to-transparent -z-10" />

          {/* Layer A: High-res Healthy Fruit Salad Bowl Frame */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 1, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-4 left-6 sm:left-12 w-[240px] sm:w-[320px] rounded-2xl bg-white/95 backdrop-blur-sm border border-[#8D6E63]/25 p-3 sm:p-4 shadow-xl z-20 group fruit-blink-card"
          >
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-clay/5">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" 
                alt="Highly aesthetic TND signature bowl" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-[#2E7D32] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                <Leaf className="w-3 h-3 rotate-12" />
                <span>Superfood Base</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center px-1">
              <div>
                <h4 className="font-serif text-sm sm:text-base font-bold text-charcoal">Fruit Power Bowl</h4>
                <p className="text-[10px] font-medium text-clay">Antioxidants & raw multi-vitamins</p>
              </div>
              <span className="bg-[#2E7D32]/10 text-leaf text-xs font-bold rounded-full px-2.5 py-1">
                $8.50
              </span>
            </div>
          </motion.div>

          {/* Layer B: Steaming Traditional Masala Chai Frame */}
          <motion.div
            animate={{ 
              y: [12, -3, 12],
              rotate: [0, -1, 0]
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-6 right-6 sm:right-12 w-[210px] sm:w-[280px] rounded-2xl bg-white/95 backdrop-blur-sm border border-[#8D6E63]/10 p-3 sm:p-4 shadow-2xl z-25 group"
          >
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-clay/5">
              <img 
                src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80" 
                alt="Traditional steaming Masala Chai next to soft bread" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Steaming Overlay Elements */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-8 h-8 rounded-full bg-white/10 border border-white/20 animate-ping opacity-60" />
              </div>
              <div className="absolute top-2 left-2 bg-clay text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                <Coffee className="w-3 h-3" />
                <span className="flex items-center space-x-1">
                  <span>Slow-Stewed</span>
                  <Flame className="w-2.5 h-2.5 text-[#FF6D00] animate-pulse" />
                </span>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center px-1">
              <div>
                <h4 className="font-serif text-sm sm:text-base font-bold text-charcoal">Masala Kulhad Chai</h4>
                <p className="text-[10px] font-medium text-clay">Slow-cooked cardamom infusion</p>
              </div>
              <span className="bg-clay/10 text-clay text-xs font-bold rounded-full px-2.5 py-1">
                $3.50
              </span>
            </div>
          </motion.div>

          {/* Floating Aesthetic Deco Badge */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-2/5 right-[40%] bg-white border border-clay/15 rounded-full p-4 shadow-lg z-30 hidden sm:flex items-center justify-center w-14 h-14"
          >
            <Leaf className="w-6 h-6 text-leaf transform -rotate-45" />
          </motion.div>

          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[35%] left-1/4 bg-white border border-clay/15 rounded-full p-3 shadow-md z-30 hidden sm:flex items-center justify-center w-11 h-11"
          >
            <Coffee className="w-4 h-4 text-clay" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
