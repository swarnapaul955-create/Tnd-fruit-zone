import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Check, Sparkles, Smile, ArrowRight, User } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS, DYNAMIC_REVIEW_TAGS } from '../data';

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export default function Reviews({ reviews, onAddReview }: ReviewsProps) {
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);
  
  // Submit Form States
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5.0);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  
  // Drag / Slide Star selector logic helper
  const starSliderRef = useRef<HTMLDivElement>(null);

  const handleStarSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReviewRating(parseFloat(e.target.value));
  };

  const handleChipToggle = (chip: string) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter(c => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    setIsSubmitting(true);
    
    // Simulate real database delays
    setTimeout(() => {
      const reviewItem: Review = {
        id: `rev-custom-${Date.now()}`,
        userName: newReviewAuthor,
        rating: newReviewRating,
        date: 'Today',
        comment: newReviewComment,
        tags: selectedChips.length > 0 ? selectedChips : ['Perfect Chai'],
        avatarColor: getCoolAvatarColor()
      };

      onAddReview(reviewItem);
      setIsSubmitting(false);
      setFormSuccess(true);
      
      // Reset form
      setNewReviewAuthor('');
      setNewReviewComment('');
      setNewReviewRating(5.0);
      setSelectedChips([]);
      
      setTimeout(() => {
        setFormSuccess(false);
      }, 3000);
    }, 1000);
  };

  const getCoolAvatarColor = () => {
    const arr = ['bg-[#2E7D32]', 'bg-[#8D6E63]', 'bg-[#FF6D00]', 'bg-amber-600', 'bg-blue-600'];
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const filteredReviews = selectedTagFilter 
    ? reviews.filter(r => r.tags.includes(selectedTagFilter))
    : reviews;

  // Calculate stats
  const totalRatingSum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = (totalRatingSum / reviews.length).toFixed(1);
  const percentFiveStar = Math.round((reviews.filter(r => r.rating >= 4.8).length / reviews.length) * 100);

  return (
    <section id="reviews" className="py-20 bg-vanilla px-4 sm:px-6 lg:px-8 border-b border-clay/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Loved By Local Foodies
          </h2>
          <p className="text-sm sm:text-base text-clay max-w-lg mx-auto leading-relaxed">
            What our cozy community has to say about our healthy customizable fruit salad bowls and Indian street solace combos.
          </p>
        </div>

        {/* Aggregate Ratings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Scorecard & List */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Aggregate Score Panel */}
            <div className="p-6 rounded-2xl bg-white border border-[#8D6E63]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-5xl font-serif font-bold text-charcoal block">
                  {averageRating}
                </span>
                <div className="flex items-center justify-center sm:justify-start space-x-1 text-[#2E7D32]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 fill-current ${
                        star <= Math.round(Number(averageRating)) ? 'text-[#2E7D32]' : 'text-gray-200'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-clay block pt-1 uppercase tracking-wider font-sans">
                  Based on {reviews.length} authentic guest reviews
                </span>
              </div>

              {/* Quick Progress Bars */}
              <div className="flex-1 w-full max-w-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-clay">
                  <span>Five Star Foodies</span>
                  <span>{percentFiveStar}%</span>
                </div>
                <div className="w-full h-2 bg-clay/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#2E7D32] rounded-full transition-all duration-1000" 
                    style={{ width: `${percentFiveStar}%` }}
                  />
                </div>
                <p className="text-[10px] text-clay/80 text-center sm:text-left">
                  🌟 Most of our community guests order the <span className="text-leaf">Signature Fruit Bowl</span> paired with <span className="text-clay">Masala Chai</span>.
                </p>
              </div>
            </div>

            {/* Quick-Click Filtering Feedback Tags */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-charcoal tracking-wider text-left">
                Filter by Experience Tags
              </h4>
              <div className="flex flex-wrap justify-start gap-2">
                <button
                  onClick={() => setSelectedTagFilter(null)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                    selectedTagFilter === null 
                      ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm' 
                      : 'bg-white text-clay border-[#8D6E63]/20 hover:bg-clay/5'
                  }`}
                >
                  All Reviews ({reviews.length})
                </button>
                {DYNAMIC_REVIEW_TAGS.map((tag) => {
                  const tagCount = reviews.filter(r => r.tags.includes(tag)).length;
                  if (tagCount === 0) return null;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTagFilter(tag)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                        selectedTagFilter === tag 
                          ? 'bg-clay text-white border-clay shadow-sm' 
                          : 'bg-white text-clay border-[#8D6E63]/20 hover:bg-clay/5'
                      }`}
                    >
                      {tag} ({tagCount})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rendered Reviews Stack */}
            <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 scrollbar-thin">
              <AnimatePresence mode="popLayout">
                {filteredReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="p-5 rounded-2xl bg-white border border-clay/15 text-left space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      {/* Guest Info */}
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full ${review.avatarColor} text-white font-bold text-sm flex items-center justify-center shadow-inner`}>
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-charcoal">{review.userName}</h4>
                          <span className="text-[10px] text-clay font-medium">{review.date}</span>
                        </div>
                      </div>

                      {/* Stars badge */}
                      <div className="flex items-center space-x-1.5 bg-[#2E7D32]/5 border border-[#2E7D32]/10 rounded-full px-2.5 py-1">
                        <Star className="w-3.5 h-3.5 fill-current text-[#2E7D32]" />
                        <span className="text-xs font-bold text-[#2E7D32]">{review.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed font-sans">
                      "{review.comment}"
                    </p>

                    {/* Review tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {review.tags.map((t) => (
                        <span 
                          key={t}
                          className="bg-clay/5 border border-clay/10 text-clay text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Write a Review Form */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-clay/10 shadow-md text-left space-y-6">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-clay uppercase tracking-wider font-sans flex items-center space-x-1.5">
                  <Smile className="w-4 h-4 text-clay" />
                  <span>Leave Your Mark</span>
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  Write a Guest Review
                </h3>
                <p className="text-xs text-clay leading-relaxed">
                  Your raw honest feedback inspires our kitchen crew of fruit cutters and tea master-brewers!
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Author Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanjali S."
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    className="w-full px-4 py-3 bg-vanilla border border-[#8D6E63]/20 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-clay/35 transition-all font-sans"
                  />
                </div>

                {/* Tactile Star drag/slide selector container */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                      Slide / Click to Rate Score
                    </label>
                    <span className="text-sm font-serif font-bold text-[#2E7D32] bg-[#2E7D32]/10 border border-[#2E7D32]/20 px-2.5 py-0.5 rounded-md">
                      ★ {newReviewRating.toFixed(1)} / 5.0
                    </span>
                  </div>

                  {/* Stars interaction and native slider range overlay */}
                  <div 
                    ref={starSliderRef}
                    className="relative bg-vanilla p-3.5 rounded-xl border border-clay/15 flex flex-col items-center justify-center space-y-2 group"
                  >
                    {/* Glowing background hint */}
                    <div className="absolute inset-0 bg-gradient-to-r from-leaf/3 to-[#FF6D00]/3 opacity-50 rounded-xl" />

                    {/* SVG Gold/Green stars row that highlights dynamically */}
                    <div className="flex items-center space-x-2 z-10 pointer-events-none">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isGold = star <= Math.ceil(newReviewRating);
                        const scale = star <= Math.ceil(newReviewRating) ? 1.05 : 0.95;
                        return (
                          <motion.div 
                            key={star}
                            animate={{ scale }}
                            className="p-0.5"
                          >
                            <Star 
                              className={`w-8 h-8 ${
                                isGold 
                                  ? 'text-[#2E7D32] fill-current animate-pulse' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Visual drag hint text */}
                    <p className="text-[10px] text-clay/75 z-10 font-sans tracking-wide">
                      ← Drag or Click bar below to change stars →
                    </p>

                    {/* Clean translucent native range slider overlay */}
                    <input
                      type="range"
                      min="1.0"
                      max="5.0"
                      step="0.1"
                      value={newReviewRating}
                      onChange={handleStarSliderChange}
                      className="w-full h-8 cursor-pointer opacity-70 border-none outline-none accent-clay mt-1 z-10"
                      id="review-drag-stars"
                    />
                  </div>
                </div>

                {/* Checklist Tags to attach */}
                <div className="space-y-2 text-left">
                  <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block">
                    Tag Your Experiences
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {DYNAMIC_REVIEW_TAGS.map((chip) => {
                      const isSelected = selectedChips.includes(chip);
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleChipToggle(chip)}
                          className={`px-2.5 py-1.5 rounded-md text-[10px] uppercase tracking-wider font-bold border transition-colors ${
                            isSelected
                              ? 'bg-clay text-white border-clay shadow-xs'
                              : 'bg-vanilla text-clay border-[#8D6E63]/25 hover:bg-clay/5'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '} {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Comment Box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                    Your Guest Experience
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Which item did you customize? How soft was the maska bun? Tell our local community..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full px-4 py-3 bg-vanilla border border-[#8D6E63]/20 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-clay/35 transition-all font-sans leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                {formSuccess ? (
                  <div className="w-full bg-[#2E7D32]/10 text-leaf border border-[#2E7D32]/20 rounded-full py-3.5 px-6 font-bold text-xs sm:text-sm text-center flex items-center justify-center space-x-2">
                    <Check className="w-5 h-5 text-leaf" />
                    <span>Review Saved! Added to Local Board</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF6D00] text-white py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-md hover:bg-[#FF6D00]/90 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                    id="review-submit-btn"
                  >
                    <span>{isSubmitting ? 'Posting Review...' : 'Publish Authentic Review'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
