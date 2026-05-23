import { useState, useRef, useEffect } from 'react';
import { Search, Star, Clock, Plus, Minus, X, Leaf, Coffee, Check, MessageSquare, Info, Sparkles, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data';
import { MenuItem, FoodCategory, CartItem } from '../types';

interface MenuProps {
  onAddItemToCart: (item: CartItem) => void;
}

export default function Menu({ onAddItemToCart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'bestsellers' | 'healthy' | 'cozy'>('all');
  const [autoPlay, setAutoPlay] = useState(true);

  // Seasonal Highlights List & State
  const seasonalSpecials = [
    {
      tag: "SUMMER JUBILEE",
      title: "Alphonso Mango Saffron Glaze Bowl",
      desc: "Delicate cuts of premium Alphonso mango cheeks pooled in rich saffron-spiced cold organic cream, laced with fresh garden mint leaves and raw walnut crumbs.",
      badge: "Pure Vitality",
      accent: "from-amber-50 to-orange-50 border-orange-200 text-orange-900 bg-orange-100/10",
      menuItemId: "bowl-1",
      label: "View Power Bowl",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
    },
    {
      tag: "WESTERN GHATS PEARL",
      title: "Wild Jamun Zesty Cold-Press Juice",
      desc: "Cold extraction of indigenous astringent wild purple Jamun fruits, balanced with sweet dark-grape extract, pure pink Himalayan rock salt, and cooling lime juice.",
      badge: "Antioxidant Rich",
      accent: "from-purple-50 to-fuchsia-50 border-purple-200 text-purple-900 bg-purple-100/10",
      menuItemId: "juice-3",
      label: "View Power Juice",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
    },
    {
      tag: "HIMALAYAN WILD",
      title: "Alpine Forest Blackberry Greek Bowl",
      desc: "A bed of set Greek yogurt layered with handpicked tart blueberries and forest blackberries, drizzled with rare raw wildflower honeycomb, sunflower seeds, and crushed pecans.",
      badge: "High-Protein Superfood",
      accent: "from-rose-50 to-red-50 border-rose-200 text-rose-900 bg-rose-100/10",
      menuItemId: "bowl-3",
      label: "View Berry Bowl",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
    },
    {
      tag: "MONSOON REFRESHER",
      title: "Cardamom Charcoal Malai Kulhad Chai",
      desc: "Authentic double-distilled Assam tea leaves simmered slowly over wood charcoal, infused with fresh crushed elachi pods and finished with a rich overlay of heavy clotted malai.",
      badge: "Hearth Cozy Comfort",
      accent: "from-amber-50 to-yellow-50 border-yellow-200 text-amber-950 bg-amber-100/10",
      menuItemId: "cozy-1",
      label: "View Masala Chai",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const [currentSeasonalIdx, setCurrentSeasonalIdx] = useState(0);
  const [seasonalAutoPlay, setSeasonalAutoPlay] = useState(true);

  // Auto-slide Seasonal Highlights
  useEffect(() => {
    if (!seasonalAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentSeasonalIdx((prev) => (prev + 1) % seasonalSpecials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [seasonalAutoPlay]);
  
  // Customization Modal State
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [sweetness, setSweetness] = useState<'Normal' | 'Less' | 'None'>('Normal');
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>('Hot');
  const [extraButter, setExtraButter] = useState(false);
  const [extraNutsAndSeeds, setExtraNutsAndSeeds] = useState(false);
  const [extraHoney, setExtraHoney] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Sticky Category Tabs state on scroll
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Auto-advancing category interval to auto-change menu selection when viewed
  useEffect(() => {
    if (!autoPlay || searchQuery) return;
    const cats: FoodCategory[] = ['All', 'Bowls & Salads', 'Fresh Juices', 'Chai & Maska Bun'];
    const timer = setInterval(() => {
      setSelectedCategory((current) => {
        const nextIdx = (cats.indexOf(current) + 1) % cats.length;
        return cats[nextIdx];
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay, searchQuery]);

  const handleSelectCategory = (cat: FoodCategory) => {
    setSelectedCategory(cat);
    // Pause autoplay once user shows deliberate manual interest
    setAutoPlay(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!tabsRef.current) return;
      const tabsTop = tabsRef.current.getBoundingClientRect().top;
      // When tabs meet top of screen (or 80px navbar)
      setIsTabsSticky(tabsTop <= 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter & Search calculation
  const filteredItems = MENU_ITEMS.filter(item => {
    const categoryMatches = selectedCategory === 'All' || item.category === selectedCategory;
    const nameMatches = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
                        
    let tagMatches = true;
    if (activeFilter === 'bestsellers') tagMatches = !!item.isBestSeller;
    if (activeFilter === 'healthy') tagMatches = !!item.isHealthy;
    if (activeFilter === 'cozy') tagMatches = !!item.isCozy;

    return categoryMatches && nameMatches && tagMatches;
  });

  const handleOpenCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
    setItemQuantity(1);
    setSweetness('Normal');
    setTemperature('Hot');
    setExtraButter(false);
    setExtraNutsAndSeeds(false);
    setExtraHoney(false);
    setAddedSuccess(false);
  };

  const calculateCustomizedPrice = () => {
    if (!customizingItem) return 0;
    let base = customizingItem.price;
    if (extraButter) base += 0.75;
    if (extraNutsAndSeeds) base += 1.00;
    if (extraHoney) base += 0.50;
    return base * itemQuantity;
  };

  const handleConfirmOrder = () => {
    if (!customizingItem) return;

    const cartItem: CartItem = {
      menuItem: customizingItem,
      quantity: itemQuantity,
      customization: {
        sweetness: customizingItem.category.includes('Chai') || customizingItem.category.includes('Juice') ? sweetness : undefined,
        temperature: customizingItem.category.includes('Chai') ? temperature : undefined,
        extraButter: customizingItem.id.includes('cozy-2') || customizingItem.id.includes('cozy-3') ? extraButter : undefined,
        extraNutsAndSeeds: customizingItem.category.includes('Bowl') ? extraNutsAndSeeds : undefined,
        extraHoney: customizingItem.category.includes('Bowl') || customizingItem.category.includes('Juice') ? extraHoney : undefined,
      }
    };

    onAddItemToCart(cartItem);
    setAddedSuccess(true);
    setTimeout(() => {
      setCustomizingItem(null);
    }, 1200);
  };

  const categories: FoodCategory[] = ['All', 'Bowls & Salads', 'Fresh Juices', 'Chai & Maska Bun'];

  return (
    <section id="menu" className="py-20 bg-vanilla px-4 sm:px-6 lg:px-8 border-b border-clay/10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Subtle Seasonal Highlight Banner with Dynamic Fade-In Cycling */}
        <div id="seasonal-highlight-banner" className="relative overflow-hidden rounded-3xl border border-clay/15 shadow-xs bg-white p-1">
          <div className={`p-4 sm:p-6 md:p-8 rounded-[22px] bg-gradient-to-r ${seasonalSpecials[currentSeasonalIdx].accent} transition-colors duration-700 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8`}>
            
            {/* Slide Content with AnimatePresence for smooth fade-in */}
            <div className="flex-1 space-y-4 text-left w-full min-h-[160px] md:min-h-0 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSeasonalIdx}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="space-y-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white/80 border border-clay/15 shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-clay flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#FF6D00] animate-pulse" />
                      <span>{seasonalSpecials[currentSeasonalIdx].tag}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-leaf/10 border border-leaf/15 text-leaf">
                      {seasonalSpecials[currentSeasonalIdx].badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-charcoal tracking-tight leading-tight">
                    {seasonalSpecials[currentSeasonalIdx].title}
                  </h3>

                  <p className="text-xs sm:text-sm text-clay/90 leading-relaxed max-w-2xl font-sans">
                    {seasonalSpecials[currentSeasonalIdx].desc}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3 items-center">
                    {(() => {
                      const matchedItem = MENU_ITEMS.find(item => item.id === seasonalSpecials[currentSeasonalIdx].menuItemId);
                      return matchedItem ? (
                        <button
                          onClick={() => handleOpenCustomizer(matchedItem)}
                          className="bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-white text-xs font-bold py-2.5 px-5 rounded-full shadow-xs transition-all flex items-center space-x-2 cursor-pointer transform active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{seasonalSpecials[currentSeasonalIdx].label} (${matchedItem.price.toFixed(2)})</span>
                        </button>
                      ) : null;
                    })()}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail Image on the Right */}
            <div className="w-full md:w-64 max-w-sm shrink-0 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs border border-clay/10 bg-clay/5 self-stretch">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSeasonalIdx}
                  src={seasonalSpecials[currentSeasonalIdx].image}
                  alt={seasonalSpecials[currentSeasonalIdx].title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45 }}
                  className="w-full h-full object-cover animate-fade-in"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>

          </div>

          {/* Controls Bar */}
          <div className="absolute bottom-5 sm:bottom-6 right-5 sm:right-8 flex items-center space-x-3 bg-white/90 backdrop-blur-xs p-1.5 rounded-full border border-clay/15 shadow-sm z-10 animate-fade-in">
            {/* AutoPlay Toggle */}
            <button
              onClick={() => setSeasonalAutoPlay(!seasonalAutoPlay)}
              className="p-1.5 rounded-full text-clay hover:bg-clay/10 transition-colors cursor-pointer"
              title={seasonalAutoPlay ? "Pause Auto-Slide" : "Play Auto-Slide"}
            >
              {seasonalAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Nav Arrows */}
            <div className="h-4 w-[1px] bg-clay/20" />
            
            <button
              onClick={() => {
                setSeasonalAutoPlay(false);
                setCurrentSeasonalIdx((prev) => (prev - 1 + seasonalSpecials.length) % seasonalSpecials.length);
              }}
              className="p-1 rounded-full text-clay hover:bg-clay/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center space-x-1 px-1">
              {seasonalSpecials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSeasonalAutoPlay(false);
                    setCurrentSeasonalIdx(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSeasonalIdx === idx ? 'w-5 bg-clay' : 'w-2.5 bg-clay/25 hover:bg-clay/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setSeasonalAutoPlay(false);
                setCurrentSeasonalIdx((prev) => (prev + 1) % seasonalSpecials.length);
              }}
              className="p-1 rounded-full text-clay hover:bg-clay/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Header and Search */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-charcoal tracking-tight leading-none">
            Our Fresh & Cozy Menu
          </h2>
          <p className="text-sm sm:text-lg text-clay max-w-2xl mx-auto leading-relaxed">
            At <span className="px-2 py-0.5 rounded bg-gradient-to-r from-leaf/10 to-[#FF6D00]/10 border border-leaf/25 font-semibold text-charcoal shadow-2xs">TND Fruit Zone</span>, customize your ultimate superfood fruit bowls filled with premium toppings, or cuddle up with slow-brewed hot Masala Chai alongside dynamic butter-griddled gold buns.
          </p>

          {/* Search Inputs */}
          <div className="pt-4 max-w-md mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-clay/60 group-hover:text-clay transition-colors" />
            <input 
              type="text" 
              placeholder="Search for bowls, chai spices, juices..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#8D6E63]/20 rounded-full text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-clay/30 focus:border-clay/60 transition-all font-sans"
              id="menu-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-clay hover:text-charcoal cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Quick-chips Toggle */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-lg mx-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
              activeFilter === 'all'
                ? 'bg-clay text-white border-clay'
                : 'bg-white text-clay border-clay/20 hover:bg-clay/5'
            }`}
          >
            All Recipes
          </button>
          <button
            onClick={() => setActiveFilter('bestsellers')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border flex items-center space-x-1 ${
              activeFilter === 'bestsellers'
                ? 'bg-clay text-white border-clay'
                : 'bg-white text-clay border-clay/20 hover:bg-clay/5'
            }`}
          >
            <Star className="w-3 h-3 fill-current text-[#FF6D00]" />
            <span>Popular Sellers</span>
          </button>
          <button
            onClick={() => setActiveFilter('healthy')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border flex items-center space-x-1 ${
              activeFilter === 'healthy'
                ? 'bg-[#2E7D32]/10 text-leaf border-[#2E7D32]/20'
                : 'bg-white text-clay border-clay/20 hover:bg-clay/5'
            }`}
          >
            <Leaf className="w-3 h-3" />
            <span>Pure Vitality Bowls</span>
          </button>
          <button
            onClick={() => setActiveFilter('cozy')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border flex items-center space-x-1 ${
              activeFilter === 'cozy'
                ? 'bg-clay/10 text-charcoal border-clay/20'
                : 'bg-white text-clay border-clay/20 hover:bg-clay/5'
            }`}
          >
            <Coffee className="w-3 h-3" />
            <span>Hearth Comfort Drinks</span>
          </button>
        </div>

        {/* Sticky Filter Bar */}
        <div 
          ref={tabsRef} 
          className={`sticky top-[80px] z-35 py-3 -mx-4 px-4 bg-vanilla/95 backdrop-blur-xs transition-shadow duration-300 ${
            isTabsSticky ? 'shadow-md border-b border-clay/10' : ''
          }`}
          id="menu-tabs-wrapper"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center max-w-5xl mx-auto">
            {/* Tabs List */}
            <div className="flex justify-start sm:justify-center items-center overflow-x-auto gap-2 no-scrollbar w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`py-2 px-6 rounded-full font-serif text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-clay text-white shadow-md scale-103'
                      : 'bg-white text-clay border border-clay/10 hover:bg-clay/5'
                  }`}
                  id={`tab-btn-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live Autoplay controls badge */}
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`py-1.5 px-3.5 rounded-full text-xs font-bold font-sans tracking-wider whitespace-nowrap transition-all duration-300 flex items-center space-x-2 border cursor-pointer hover:shadow-xs ${
                autoPlay 
                  ? 'bg-leaf/10 text-leaf border-leaf/35 animate-pulse' 
                  : 'bg-clay/15 text-clay border-clay/20'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${autoPlay ? 'bg-leaf' : 'bg-clay'}`} />
              <span className="uppercase text-[9px] tracking-widest">{autoPlay ? 'Live Auto-Cycling' : 'Cycles Paused'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic product Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-12 h-12 rounded-full bg-clay/5 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6 text-clay/50" />
            </div>
            <p className="text-clay text-sm font-medium">No recipes match your current food choices.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="mt-2 text-xs text-[#FF6D00] font-bold underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => {
              const isJuice = item.category === 'Fresh Juices';
              const isBowl = item.category === 'Bowls & Salads';
              return (
                <div 
                  key={item.id}
                  className={`group bg-white rounded-2xl border border-clay/15 p-4 hover:-translate-y-2 hover:shadow-xl hover:border-clay/35 transition-all duration-300 flex flex-col justify-between ${
                    isBowl ? 'fruit-blink-card' : ''
                  } ${
                    isJuice ? 'juice-card-anim' : ''
                  }`}
                  style={isJuice ? { animationDelay: `${idx * 0.15}s` } : undefined}
                  id={`menu-card-${item.id}`}
                >
                  <div className="space-y-4">
                    {/* Card Thumbnail */}
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-clay/5">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Corner Tag */}
                      {(item.isBestSeller) && (
                        <div className="absolute top-2.5 left-2.5 bg-[#FF6D00] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md flex items-center space-x-1">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>Best Seller</span>
                        </div>
                      )}

                      <div className="absolute top-2.5 right-2.5 flex space-x-1">
                        {item.isHealthy && (
                          <span className="bg-[#2E7D32] text-white p-1 rounded-full shadow-md" title="Pure Vitality Bowl">
                            <Leaf className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {item.isCozy && (
                          <span className="bg-clay text-white p-1 rounded-full shadow-md" title="Hearth Cozy Comfort">
                            <Coffee className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      {item.calories && (
                        <div className="absolute bottom-2.5 left-2.5 bg-black/50 text-white text-[10px] font-medium px-2 py-0.5 rounded-md backdrop-blur-xs">
                          {item.calories}
                        </div>
                      )}
                    </div>

                    {/* Descriptions */}
                    <div className="space-y-2 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-semibold tracking-widest text-[#2E7D32]">
                          {item.category}
                        </span>
                        <div className="flex items-center space-x-1 text-xs">
                          <Star className="w-3 h-3 text-[#2E7D32] fill-[#2E7D32]" />
                          <span className="font-bold text-charcoal">{item.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-serif text-xl sm:text-2xl font-black text-charcoal leading-snug group-hover:text-leaf transition-colors">
                        {item.name}
                      </h3>
                      
                      <p className="text-xs text-clay/85 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Foot Card Pricing Actions */}
                  <div className="pt-4 mt-4 border-t border-clay/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-clay block leading-[10px] uppercase tracking-wider">Price</span>
                      <span className="text-xl sm:text-2xl font-serif font-black text-[#2E7D32] mt-0.5 block">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <button 
                      onClick={() => handleOpenCustomizer(item)}
                      className="bg-[#FF6D00] text-white text-xs font-bold py-2.5 px-4.5 rounded-full shadow-sm hover:bg-[#FF6D00]/90 transition-all duration-300 flex items-center space-x-1 cursor-pointer transform active:scale-95"
                    >
                      <span>Add to Order</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dynamic Order Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="customizer-modal-overlay">
          {/* Backdrop */}
          <div 
            onClick={() => setCustomizingItem(null)}
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Card */}
          <div className="relative bg-vanilla w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-clay/10 flex flex-col max-h-[90vh]">
            {/* Smooth header picture overlay */}
            <div className="relative h-44 w-full flex-shrink-0">
              <img 
                src={customizingItem.image} 
                alt={customizingItem.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vanilla via-transparent to-black/20" />
              <button 
                onClick={() => setCustomizingItem(null)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-xs text-charcoal p-2 rounded-full hover:bg-white transition-colors cursor-pointer"
                aria-label="Close customizer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customizer form content */}
            <div className="p-6 overflow-y-auto space-y-6 text-left">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#2E7D32]">
                  Customize Food Detail
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal mt-1">
                  {customizingItem.name}
                </h3>
                <p className="text-xs text-clay mt-1.5 font-sans leading-relaxed">
                  {customizingItem.description}
                </p>
              </div>

              {/* Dynamic Choices depending on category */}
              
              {/* Sweetness Selector for liquids */}
              {(customizingItem.category.includes('Chai') || customizingItem.category.includes('Juices')) && (
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal">
                    Sugar/Sweetness Level
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(['None', 'Less', 'Normal'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setSweetness(level)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          sweetness === level
                            ? 'bg-[#2E7D32]/10 border-[#2E7D32] text-[#2E7D32] font-bold'
                            : 'bg-white border-clay/10 text-charcoal hover:bg-clay/5'
                        }`}
                      >
                        {level === 'None' ? 'Zero Sugars' : level === 'Less' ? 'Less Sweet' : 'Traditional'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Brew Temperature Selector */}
              {customizingItem.category.includes('Chai') && (
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal">
                    Serving Option
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Hot', 'Iced'] as const).map((temp) => (
                      <button
                        key={temp}
                        onClick={() => setTemperature(temp)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          temperature === temp
                            ? 'bg-clay/10 border-clay text-clay font-bold'
                            : 'bg-white border-clay/10 text-charcoal hover:bg-clay/5'
                        }`}
                      >
                        {temp === 'Hot' ? '🔥 Steaming Cozy Hot' : '🧊 Refreshing Iced'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom upgrades */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-charcoal">
                  Aesthetic upgrades (Add-ons)
                </h4>
                <div className="space-y-2">
                  {/* Upgrade for Buns */}
                  {(customizingItem.id.includes('cozy-2') || customizingItem.id.includes('cozy-3')) && (
                    <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-clay/15 hover:bg-clay/5 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          checked={extraButter} 
                          onChange={(e) => setExtraButter(e.target.checked)}
                          className="w-4 h-4 text-[#FF6D00] focus:ring-0 rounded-sm"
                        />
                        <div className="text-xs">
                          <p className="font-semibold text-charcoal">Double Whipped Salted Butter</p>
                          <p className="text-clay/85 text-[10px]">Rich, creamy, melted over griddle</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-charcoal">+$0.75</span>
                    </label>
                  )}

                  {/* Seeds upgrade for Bowls */}
                  {customizingItem.category.includes('Bowls') && (
                    <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-clay/15 hover:bg-clay/5 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          checked={extraNutsAndSeeds} 
                          onChange={(e) => setExtraNutsAndSeeds(e.target.checked)}
                          className="w-4 h-4 text-leaf focus:ring-0 rounded-sm"
                        />
                        <div className="text-xs">
                          <p className="font-semibold text-charcoal">Superfood Chia & Pumpkin Seed Mix</p>
                          <p className="text-clay/85 text-[10px]">Omega-3 acids, extra nuttiness & fiber</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-charcoal">+$1.00</span>
                    </label>
                  )}

                  {/* Raw Honey for healthy Bowls / Juices */}
                  {(customizingItem.category.includes('Bowls') || customizingItem.category.includes('Juices')) && (
                    <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-clay/15 hover:bg-clay/5 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          checked={extraHoney} 
                          onChange={(e) => setExtraHoney(e.target.checked)}
                          className="w-4 h-4 text-leaf focus:ring-0 rounded-sm"
                        />
                        <div className="text-xs">
                          <p className="font-semibold text-charcoal">Spoonful of Organic Wild Honey</p>
                          <p className="text-clay/85 text-[10px]">Raw antibacterial sweet nectar</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-charcoal">+$0.50</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Quantity Slider / Counter */}
              <div className="flex items-center justify-between pt-4 border-t border-clay/10">
                <span className="text-xs uppercase font-bold tracking-wider text-charcoal">Quantity</span>
                <div className="flex items-center space-x-3 border border-clay/20 rounded-xl p-1 bg-white">
                  <button 
                    onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                    className="p-1 px-2.5 rounded-lg hover:bg-clay/10 text-charcoal font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-charcoal min-w-[20px] text-center">
                    {itemQuantity}
                  </span>
                  <button 
                    onClick={() => setItemQuantity(itemQuantity + 1)}
                    className="p-1 px-2.5 rounded-lg hover:bg-clay/10 text-charcoal font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Modal actions */}
            <div className="p-6 border-t border-clay/10 bg-white flex items-center justify-between bg-white flex-shrink-0">
              <div>
                <span className="text-[10px] text-clay font-medium block uppercase tracking-wider">Total Price</span>
                <span className="text-xl font-serif font-bold text-charcoal block leading-none">
                  ${calculateCustomizedPrice().toFixed(2)}
                </span>
              </div>

              {addedSuccess ? (
                <button 
                  disabled
                  className="bg-[#2E7D32] text-white py-3 px-6 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-md flex items-center space-x-2"
                >
                  <Check className="w-4 h-4 text-white" />
                  <span>Added to Tray Successfully</span>
                </button>
              ) : (
                <button 
                  onClick={handleConfirmOrder}
                  className="bg-[#FF6D00] text-white py-3 px-6 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#FF6D00]/90 transition-all duration-300"
                >
                  Confirm Choice
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
