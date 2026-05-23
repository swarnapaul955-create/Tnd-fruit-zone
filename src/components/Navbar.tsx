import { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Check, Leaf, Coffee, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onUpdateCartQty: (index: number, newQty: number) => void;
  onRemoveCartItem: (index: number) => void;
  onCheckout: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({
  cart,
  onUpdateCartQty,
  onRemoveCartItem,
  onCheckout,
  onScrollToSection
}: NavbarProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'confirming' | 'success'>('cart');

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.menuItem.price * item.quantity), 0);

  const handleCheckoutClick = () => {
    setCheckoutStep('confirming');
    setTimeout(() => {
      setCheckoutStep('success');
      setTimeout(() => {
        onCheckout();
        setIsCartOpen(false);
        setCheckoutStep('cart');
      }, 2500);
    }, 1500);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-vanilla/90 backdrop-blur-md border-b border-[#8D6E63]/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onScrollToSection('hero')}
            id="nav-logo"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-clay/15 group-hover:bg-[#8D6E63]/35 transition-all duration-300 shadow-sm">
              <Leaf className="w-5 h-5 text-leaf absolute -top-1 -right-1 rotate-12 drop-shadow-[0_2px_4px_rgba(46,125,50,0.3)]" />
              <Coffee className="w-5.5 h-5.5 text-clay" />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-charcoal block leading-none relative">
                <span className="bg-gradient-to-r from-clay via-leaf to-[#FF6D00] bg-clip-text text-transparent filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">TND Fruit Zone</span>
                <span className="absolute bottom-[-3px] left-0 w-full h-[3px] bg-gradient-to-r from-leaf to-[#FF6D00] rounded-full scale-x-100 group-hover:scale-x-110 transition-transform duration-300 origin-left" />
              </span>
              <span className="text-[10px] sm:text-xs tracking-widest uppercase font-sans text-clay mt-1.5 block font-bold">
                ✨ Pure Vitality & Cozy Solace
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onScrollToSection('menu')}
              className="text-sm font-medium text-charcoal hover:text-clay transition-colors cursor-pointer"
              id="link-menu"
            >
              Our Menu
            </button>
            <button 
              onClick={() => onScrollToSection('experience')}
              className="text-sm font-medium text-charcoal hover:text-clay transition-colors cursor-pointer"
              id="link-experience"
            >
              The Experience
            </button>
            <button 
              onClick={() => onScrollToSection('reviews')}
              className="text-sm font-medium text-charcoal hover:text-clay transition-colors cursor-pointer"
              id="link-reviews"
            >
              Reviews
            </button>
            <button 
              onClick={() => onScrollToSection('location')}
              className="text-sm font-medium text-charcoal hover:text-clay transition-colors cursor-pointer"
              id="link-location"
            >
              Find Us
            </button>
          </nav>

          {/* Action Hub (Cart & Order Button) */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-clay/10 text-charcoal transition-all duration-300 group"
              aria-label="Toggle shopping bag"
              id="cart-trigger-btn"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6D00] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Sticky Order Button */}
            <button
              onClick={() => onScrollToSection('menu')}
              className="bg-[#FF6D00] text-white text-xs sm:text-sm font-semibold tracking-wide py-2.5 px-5 rounded-full shadow-md hover:bg-[#FF6D00]/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              id="nav-order-now-btn"
            >
              Order Now
            </button>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-charcoal focus:outline-none"
              id="mobile-menu-hamburger"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-vanilla border-t border-[#8D6E63]/10 px-4 py-4 space-y-3 shadow-inner">
            <button
              onClick={() => {
                onScrollToSection('menu');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-charcoal hover:bg-clay/5 rounded-md"
            >
              Our Menu
            </button>
            <button
              onClick={() => {
                onScrollToSection('experience');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-charcoal hover:bg-clay/5 rounded-md"
            >
              The Experience
            </button>
            <button
              onClick={() => {
                onScrollToSection('reviews');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-charcoal hover:bg-clay/5 rounded-md"
            >
              Reviews
            </button>
            <button
              onClick={() => {
                onScrollToSection('location');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 text-sm font-medium text-charcoal hover:bg-clay/5 rounded-md"
            >
              Find Us
            </button>
          </div>
        )}
      </header>

      {/* Cart Slide-out Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" id="cart-drawer-overlay">
          {/* Backdrop */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-md h-full bg-vanilla shadow-2xl flex flex-col z-10 border-l border-[#8D6E63]/10">
            {/* Header */}
            <div className="p-6 border-b border-[#8D6E63]/10 flex items-center justify-between bg-vanilla">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-clay" />
                <h3 className="font-serif text-lg font-bold text-charcoal">Your Order Summary</h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 rounded-full hover:bg-clay/10 text-charcoal transition-colors cursor-pointer"
                id="cart-drawer-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-clay/5 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-clay/40" />
                  </div>
                  <div>
                    <h4 className="font-serif text-charcoal font-semibold text-lg">Your tray is empty</h4>
                    <p className="text-xs text-clay max-w-xs mt-1">
                      Choose some fresh fruit bowls, energy juices, or a cozy chai with maska bun to get started!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onScrollToSection('menu');
                    }}
                    className="mt-2 bg-[#FF6D00] text-white text-xs font-semibold py-2 px-5 rounded-full shadow-sm hover:bg-[#FF6D00]/90 transition-all duration-300"
                  >
                    Browse Local Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div 
                      key={`${item.menuItem.id}-${idx}`}
                      className="flex items-start space-x-4 p-3 rounded-xl bg-white border border-[#8D6E63]/5 shadow-xs"
                    >
                      <img 
                        src={item.menuItem.image} 
                        alt={item.menuItem.name} 
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-semibold text-charcoal truncate pr-2">
                            {item.menuItem.name}
                          </h4>
                          <span className="text-sm font-semibold text-charcoal">
                            ${(item.menuItem.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        {/* Customization Details */}
                        {item.customization && (
                          <div className="text-[11px] text-clay/80 mt-1 space-y-0.5 font-sans">
                            {item.customization.sweetness && (
                              <p>• Sweetness: {item.customization.sweetness}</p>
                            )}
                            {item.customization.temperature && (
                              <p>• Brew: {item.customization.temperature}</p>
                            )}
                            {item.customization.extraButter && <p>• Whipped Bun Maska Butter (+ $0.75)</p>}
                            {item.customization.extraNutsAndSeeds && <p>• Superfood Seed Mix (+ $1.00)</p>}
                            {item.customization.extraHoney && <p>• Pure Wild Honey (+ $0.50)</p>}
                          </div>
                        )}
                        {/* Quantity Counter */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2 border border-clay/20 rounded-lg p-0.5 bg-vanilla/50">
                            <button 
                              onClick={() => onUpdateCartQty(idx, item.quantity - 1)}
                              className="p-1 rounded-md hover:bg-clay/10 text-charcoal disabled:opacity-50"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-charcoal min-w-[14px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => onUpdateCartQty(idx, item.quantity + 1)}
                              className="p-1 rounded-md hover:bg-clay/10 text-charcoal"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button 
                            onClick={() => onRemoveCartItem(idx)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#8D6E63]/10 bg-white space-y-4">
                <div className="space-y-1.5 font-sans">
                  <div className="flex justify-between text-xs text-clay">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-clay">
                    <span>Fresh Prep Tax (5%)</span>
                    <span>${(subtotal * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-leaf font-semibold">
                    <span>Cozy Discount</span>
                    <span>-$1.50</span>
                  </div>
                  <hr className="border-dashed border-clay/10 my-2" />
                  <div className="flex justify-between text-base font-bold text-charcoal">
                    <span>Est. Total</span>
                    <span>${Math.max(0, subtotal + (subtotal * 0.05) - 1.50).toFixed(2)}</span>
                  </div>
                </div>

                {checkoutStep === 'cart' && (
                  <button 
                    onClick={handleCheckoutClick}
                    className="w-full bg-[#FF6D00] text-white py-3.5 px-6 rounded-full font-bold text-sm tracking-wide shadow-md hover:bg-[#FF6D00]/90 transition-all duration-300"
                  >
                    Proceed to Table Ordering
                  </button>
                )}

                {checkoutStep === 'confirming' && (
                  <button 
                    disabled 
                    className="w-full bg-[#FF6D00]/70 text-white py-3.5 px-6 rounded-full font-bold text-sm flex items-center justify-center space-x-2"
                  >
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending Order to Kitchen...</span>
                  </button>
                )}

                {checkoutStep === 'success' && (
                  <div className="bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20 rounded-xl p-3 flex items-center justify-center space-x-2 text-sm font-bold">
                    <Check className="w-5 h-5 text-[#2E7D32]" />
                    <span>Order Received! Grab Table No. 7</span>
                  </div>
                )}
                
                <p className="text-[10px] text-center text-clay/60">
                  ⚡ Hand-made immediately. Ready at counter in 5-10 mins.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
