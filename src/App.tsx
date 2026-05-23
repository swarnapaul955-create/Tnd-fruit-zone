import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Experience from './components/Experience';
import Reviews from './components/Reviews';
import { CartItem, Review } from './types';
import { INITIAL_REVIEWS } from './data';
import { Leaf, Coffee, Flame, Heart, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Scroll handler with offset adjusting for the sticky header
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAddCartItem = (itemToAdd: CartItem) => {
    setCart((prevCart) => {
      // Find matches in cart that share the SAME customizations and items
      const existingMatchIndex = prevCart.findIndex((item) => {
        if (item.menuItem.id !== itemToAdd.menuItem.id) return false;
        
        // Double check deep equivalence of customization options
        const c1 = item.customization || {};
        const c2 = itemToAdd.customization || {};
        
        return (
          c1.sweetness === c2.sweetness &&
          c1.temperature === c2.temperature &&
          c1.extraButter === c2.extraButter &&
          c1.extraNutsAndSeeds === c2.extraNutsAndSeeds &&
          c1.extraHoney === c2.extraHoney
        );
      });

      if (existingMatchIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingMatchIndex].quantity += itemToAdd.quantity;
        return updatedCart;
      } else {
        return [...prevCart, itemToAdd];
      }
    });

    // Automatically trigger cart opening feedback in navbar if wanted
    // We can simulate opening drawer via triggers or simply keep it local
  };

  const handleAddMultipleItemsToCart = (itemsToAdd: CartItem[]) => {
    itemsToAdd.forEach(item => {
      handleAddCartItem(item);
    });
  };

  const handleUpdateCartQty = (index: number, newQty: number) => {
    if (newQty <= 0) return;
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleCheckoutClear = () => {
    setCart([]);
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  return (
    <div className="bg-vanilla text-charcoal min-h-screen flex flex-col relative" id="tnd-master-app">
      
      {/* Scroll indicator or special warning about client-side persistence */}
      <div className="bg-clay text-white py-1.5 px-4 text-center text-[10px] sm:text-xs font-semibold tracking-wider uppercase font-sans flex items-center justify-center space-x-1 sm:space-x-2 z-50">
        <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
        <span>Try our new dynamic and interactive Vibe Matcher tool below!</span>
      </div>

      {/* Styled Navbar */}
      <Navbar 
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveCartItem={handleRemoveCartItem}
        onCheckout={handleCheckoutClear}
        onScrollToSection={handleScrollToSection}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* Menu Grid section with customization drawer */}
        <Menu onAddItemToCart={handleAddCartItem} />

        {/* Brand Experience Philosophy and interactive Vibe pairing quiz */}
        <Experience onAddMultipleItemsToCart={handleAddMultipleItemsToCart} />

        {/* Reviews Cards list with sliding tactile score rating selector */}
        <Reviews reviews={reviews} onAddReview={handleAddReview} />
      </main>

      {/* Aesthetic layout footer */}
      <footer className="bg-charcoal text-white/90 border-t border-clay/20 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          
          {/* Logo Brand Statement */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-[#2E7D32]" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white block">
                TND <span className="text-leaf text-[#2E7D32]">Fruit</span> Zone
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-sans font-light">
              We slice life-vitality fresh to your bowl while brewing heavy Masala teas over slow embers. We believe that physical health should feel cozy and comfort should feel healthy.
            </p>
            <div className="flex items-center space-x-1.5 text-[10px] text-[#2E7D32] uppercase font-bold tracking-widest bg-[#2E7D32]/10 py-1.5 px-3 rounded-lg border border-[#2E7D32]/20 w-max">
              <Flame className="w-3.5 h-3.5 fill-[#FF6D00] text-[#FF6D00]" />
              <span>Cultivated and Hand-made</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4 font-sans">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#FF6D00]">The Hub</h4>
            <div className="flex flex-col space-y-2 text-xs text-white/70">
              <button 
                onClick={() => handleScrollToSection('menu')} 
                className="hover:text-white text-left transition-colors cursor-pointer"
              >
                Custom Health Bowls
              </button>
              <button 
                onClick={() => handleScrollToSection('menu')} 
                className="hover:text-white text-left transition-colors cursor-pointer"
              >
                Brewed Kulhad Chai
              </button>
              <button 
                onClick={() => handleScrollToSection('experience')} 
                className="hover:text-white text-left transition-colors cursor-pointer"
              >
                Interactive Quiz Builder
              </button>
              <button 
                onClick={() => handleScrollToSection('reviews')} 
                className="hover:text-white text-left transition-colors cursor-pointer"
              >
                Guest Reviews Panel
              </button>
            </div>
          </div>

          {/* Sourcing guidelines */}
          <div className="space-y-4 font-sans text-xs">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#FF6D00]">Chef’s Pledge</h4>
            <ul className="space-y-2.5 text-white/70 font-light leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-[#2E7D32] font-bold">✔</span>
                <span>Zero pre-cut storage. Sliced after your checkout step.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#2E7D32] font-bold">✔</span>
                <span>Traditional Assam CTC tea leaves paired with whole cardamom pods.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#2E7D32] font-bold">✔</span>
                <span>Fresh organic milk and raw, unheated wild flora honey.</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 font-sans text-xs text-white/70 leading-relaxed font-light">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#FF6D00]">Location Details</h4>
            <p>
              📍 Counter Store: Orchid Boulevard, Near Lotus Pond Circle, Green Orchard City Area.
            </p>
            <p>
              ⏱ Monday-Friday: 7 AM - 10 PM <br />
              ⏱ Saturday-Sunday: 7:30 AM - 10:30 PM
            </p>
            <p className="text-[10px] text-white/40 pt-1 font-light block">
              Registered Food Prep License #FSSAI-2026-X839A2.
            </p>
          </div>

        </div>

        <hr className="border-white/10 my-10 max-w-7xl mx-auto" />

        {/* Footer Base block */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-white/50 text-[11px] font-sans font-light">
          <p>© 2026 TND Fruit Zone. Sliced and Slow-brewed for perfect days.</p>
          <div className="flex items-center space-x-1.5 mt-2 sm:mt-0 font-light">
            <span>Freshly Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
            <span>&</span>
            <span className="text-white/80 font-serif italic">Fresh & Cozy Minimalist Styling</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
