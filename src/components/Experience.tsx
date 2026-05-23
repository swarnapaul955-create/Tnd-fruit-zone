import { useState } from 'react';
import { Clock, MapPin, Sparkles, Coffee, Leaf, Check, Heart, HelpCircle, Utensils } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data';

interface ExperienceProps {
  onAddMultipleItemsToCart: (items: CartItem[]) => void;
}

interface Combo {
  moodName: string;
  emoji: string;
  headline: string;
  description: string;
  items: string[]; // array of product ids
  benefit: string;
}

export default function Experience({ onAddMultipleItemsToCart }: ExperienceProps) {
  const [selectedMood, setSelectedMood] = useState<string>('Clean Detox');
  const [comboAddedSuccess, setComboAddedSuccess] = useState(false);

  const COMBOS: Combo[] = [
    {
      moodName: 'Clean Detox',
      emoji: '🍃',
      headline: 'The Pure Vitamin Boost',
      description: 'Ideal when you want clean cell oxidation and a natural skin glow without dairy or added processed sugars.',
      items: ['bowl-1', 'juice-1'],
      benefit: 'Packed with 400% daily Vitamin C, iron, raw fiber, and cellular defense enzymics.'
    },
    {
      moodName: 'Rainy Day Solace',
      emoji: '☕',
      headline: 'The Ultimate Hearth Comfort',
      description: 'Settle in when you want warm cardamom spice oils, slow caramelized teas, and freshly griddled fluffy buns.',
      items: ['cozy-3'],
      benefit: 'A nostalgic spice release that calms nerves and offers cozy, sweet warmth.'
    },
    {
      moodName: 'Post Workout Power',
      emoji: '💪',
      headline: 'Antioxidants & Nitrates',
      description: 'The ultimate athletic repair routine. Earthy beet nitric oxides for blood circulation paired with Greek yogurt proteins.',
      items: ['bowl-3', 'juice-3'],
      benefit: 'Speeds up muscle regeneration and fuels clean energy without a blood sugar crash.'
    },
    {
      moodName: 'Busy Day Sluggishness',
      emoji: '✨',
      headline: 'The Golden Clarity Boost',
      description: 'Whip away brain fog. Squeezed orange turmeric juice paired next to our light Nutty Almond-Cardamom Chai.',
      items: ['juice-2', 'cozy-4'],
      benefit: 'Anti-inflammatory gingerol plus high-concentration L-theanine energy focus.'
    }
  ];

  const currentCombo = COMBOS.find(c => c.moodName === selectedMood) || COMBOS[0];

  // Resolve MenuItem references
  const comboMenuItems = currentCombo.items.map(id => MENU_ITEMS.find(m => m.id === id)).filter(Boolean) as MenuItem[];
  const comboTotalPrice = comboMenuItems.reduce((acc, m) => acc + m.price, 0);

  const handleAddComboToCart = () => {
    const itemsToAdd: CartItem[] = comboMenuItems.map(item => ({
      menuItem: item,
      quantity: 1,
      customization: {
        sweetness: 'Normal',
        temperature: 'Hot'
      }
    }));

    onAddMultipleItemsToCart(itemsToAdd);
    setComboAddedSuccess(true);
    setTimeout(() => {
      setComboAddedSuccess(false);
    }, 2000);
  };

  return (
    <section id="experience" className="py-20 bg-vanilla px-4 sm:px-6 lg:px-8 border-b border-clay/10">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* Asymmetric Core Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Visual Brand Highlights */}
          <div className="lg:col-span-5 text-left space-y-6 lg:border-r lg:border-clay/15 lg:pr-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#2E7D32] flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-leaf saturate-150" />
              <span>Living the Dual Concept</span>
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-charcoal leading-tight">
              Where life-vitality <br />
              <span className="text-clay italic font-normal">meets cozy</span> sanctuary.
            </h2>
            <p className="text-sm sm:text-base text-clay leading-relaxed font-sans mt-4">
              <span className="font-bold text-charcoal">TND Fruit Zone</span> was born from an honest kitchen realization: why should healthy eaters have to sacrifice traditional street comfort snacks, and why should tea lovers miss out on fresh organic superfoods?
            </p>
            <p className="text-xs sm:text-sm text-clay leading-relaxed font-sans">
              We operate two parallel counters in our brick-and-mortar space. On the left, cold steel blades swiftly cut seasonal fruits immediately upon order. On the right, hot charcoal stoves bubble steel tea kettles of whole cardamom pods with slow-melt butter. No compromises.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-[#2E7D32]/10 space-y-2">
                <Leaf className="w-5 h-5 text-leaf" />
                <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">0% Stale Storage</h4>
                <p className="text-[10px] text-clay/80">Every lime is squeezed live, every apple carved to order. No stale pre-cut trays.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-clay/10 space-y-2">
                <Coffee className="w-5 h-5 text-clay" />
                <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">Clay-Soil Pots</h4>
                <p className="text-[10px] text-clay/80">Chai is poured into rustic unglazed Kulhads that bind tea minerals to earthy elements.</p>
              </div>
            </div>
          </div>

          {/* Right Block: Dynamic Interactive Mood & Vibe Matcher */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-clay/10 shadow-lg text-left space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-clay block">Interactive Feature</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                Interactive Food & Vibe Matcher
              </h3>
              <p className="text-xs text-clay leading-relaxed">
                Choose your current mind-vibe state below, and let our kitchen formulate the perfect nutritional pairing!
              </p>
            </div>

            {/* Quick-choice Mood Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COMBOS.map((c) => (
                <button
                  key={c.moodName}
                  onClick={() => setSelectedMood(c.moodName)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide border flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                    selectedMood === c.moodName
                      ? 'bg-[#2E7D32]/10 border-[#2E7D32] text-[#2E7D32] scale-103 font-bold'
                      : 'bg-vanilla/50 border-[#8D6E63]/15 text-clay hover:bg-clay/5'
                  }`}
                >
                  <span className="text-lg leading-none">{c.emoji}</span>
                  <span className="text-[10px] whitespace-nowrap">{c.moodName}</span>
                </button>
              ))}
            </div>

            {/* Curated Combo Result Panel */}
            <div className="p-5 rounded-2xl bg-vanilla border border-clay/15 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <span className="bg-clay text-white text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-md">
                    Recommended TND Combo
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-charcoal mt-1">
                    {currentCombo.headline}
                  </h4>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-clay font-medium block">Combo Price</span>
                  <span className="text-lg font-serif font-bold text-charcoal">${comboTotalPrice.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-xs text-clay font-sans leading-relaxed">
                {currentCombo.description}
              </p>

              {/* Individual Item Cards in Combo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {comboMenuItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-[#8D6E63]/5 hover:shadow-xs transition-shadow"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left min-w-0">
                      <p className="text-xs font-semibold text-charcoal truncate">{item.name}</p>
                      <span className="text-[10px] text-clay/80 block">{item.category} • ${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nutritional Highlight */}
              <div className="flex items-start space-x-2 bg-white/70 p-3 rounded-lg border border-[#8D6E63]/10 text-xs">
                <Heart className="w-4 h-4 text-red-500 fill-current mt-0.5 flex-shrink-0" />
                <p className="text-clay font-sans">
                  <strong className="text-charcoal">Vitality Benefit:</strong> {currentCombo.benefit}
                </p>
              </div>

              {/* Add entire combo button */}
              {comboAddedSuccess ? (
                <div className="w-full bg-[#2E7D32] text-white py-3 px-6 rounded-full font-bold text-xs sm:text-sm text-center flex items-center justify-center space-x-2">
                  <Check className="w-4 h-4 text-white" />
                  <span>Combo Added to OrderTray!</span>
                </div>
              ) : (
                <button
                  onClick={handleAddComboToCart}
                  className="w-full bg-[#FF6D00] text-white py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#FF6D00]/90 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Lock in & Add Combo ({currentCombo.items.length} Items)</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Location Section Bento Area */}
        <div id="location" className="space-y-8 pt-12">
          <div className="text-center space-y-3">
            <span className="text-[11px] uppercase tracking-widest font-bold text-clay block">Find a Table</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
              Visit The Cozy Bench & Juice Counter
            </h3>
            <p className="text-xs sm:text-sm text-clay max-w-md mx-auto leading-relaxed">
              We are nestled right next to the local park walkway on Orchid Boulevard. Come for the high-fiber breakfast, stay for the five o'clock spiced tea.
            </p>
          </div>

          {/* Bento layout for Location detail */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Hour detail */}
            <div className="bg-white p-6 rounded-2xl border border-clay/10 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-clay/10 flex items-center justify-center text-clay">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-charcoal">Operating Hours</h4>
                  <p className="text-xs text-clay/80 mt-1 leading-normal">
                    Opening early to slice and brewing late into cozy twilight:
                  </p>
                </div>
              </div>
              <div className="text-xs font-semibold text-charcoal pt-4 space-y-1 bg-vanilla/10 p-3 rounded-lg border border-[#8D6E63]/10 mt-4">
                <div className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span className="text-leaf">7:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-leaf">7:30 AM - 10:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-charcoal/70">8:00 AM - 9:30 PM</span>
                </div>
              </div>
            </div>

            {/* Address detail */}
            <div className="bg-white p-6 rounded-2xl border border-clay/10 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#2E7D32]/10 flex items-center justify-center text-leaf">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-charcoal">Boutique Store Address</h4>
                  <p className="text-xs text-clay/80 mt-1 font-sans">
                    Store 74, Orchid Boulevard, Near Lotus Pond Circle, Green Orchard City Area.
                  </p>
                </div>
              </div>
              
              <div className="text-xs font-sans text-clay pt-4 space-y-1 mt-4">
                <p>📍 <strong className="text-charcoal text-xs">Drive-Thru / Pickup:</strong> Available behind parking block B.</p>
                <p>📞 <strong className="text-charcoal text-xs">Counter Line:</strong> +1 (650) 449-3022</p>
              </div>
            </div>

            {/* Mock Vector Map design that looks incredibly sleek */}
            <div className="bg-white p-4 rounded-2xl border border-clay/10 shadow-xs relative overflow-hidden min-h-[200px]">
              {/* Styled mock map map with grid lines and custom green paths */}
              <div className="absolute inset-4 bg-vanilla rounded-xl border border-[#8D6E63]/10 overflow-hidden flex items-center justify-center text-center">
                {/* Visual grid blocks using tailwind lines */}
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-[0.14] pointer-events-none">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="border border-clay" />
                  ))}
                </div>

                {/* Road overlays */}
                <div className="absolute w-[2px] h-full bg-clay/20 left-[48%] rotate-12" />
                <div className="absolute h-[2px] w-full bg-clay/20 top-[60%] -rotate-6" />
                
                {/* Park green circle */}
                <div className="absolute w-24 h-24 rounded-full bg-leaf/10 border-dashed border-leaf/30 top-4 left-4 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-leaf/80 tracking-widest font-sans uppercase">Orchid Park</span>
                </div>

                {/* Lake circular backdrop */}
                <div className="absolute w-14 h-14 rounded-full bg-blue-400/10 border border-blue-400/20 bottom-2 right-4 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-blue-500/60 font-sans">Lotus Pond</span>
                </div>

                {/* Pinpoint Indicator */}
                <div className="z-10 bg-white border-2 border-clay rounded-2xl px-3 py-1.5 shadow-md flex items-center space-x-1.5 animate-bounce">
                  <MapPin className="w-4 h-4 text-red-500 fill-red-500" />
                  <span className="text-[10px] font-bold text-charcoal font-sans">TND Fruit Zone</span>
                </div>

                <div className="absolute bottom-2 left-2 text-[9px] font-bold text-clay tracking-wider font-sans uppercase">
                  Map Guide
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
