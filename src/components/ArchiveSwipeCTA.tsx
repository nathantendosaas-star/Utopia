import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const archiveImages = [
  "/shirt-1.jpg",
  "/shirt-2.jpg",
  "/shirt-3.jpg",
  "/shirt-4.jpg",
];

export function ArchiveSwipeCTA({ onIndexChange }: { onIndexChange?: (index: number) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);
  const nextOpacity = useTransform(x, [-100, -20], [1, 0]);
  const prevOpacity = useTransform(x, [20, 100], [0, 1]);

  const nextIndex = (currentIndex + 1) % archiveImages.length;
  const nextNextIndex = (currentIndex + 2) % archiveImages.length;

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    let newIndex = currentIndex;
    if (info.offset.x < -swipeThreshold) {
      // Swipe Left -> Next
      setDirection(1);
      newIndex = (currentIndex + 1) % archiveImages.length;
    } else if (info.offset.x > swipeThreshold) {
      // Swipe Right -> Previous
      setDirection(-1);
      newIndex = (currentIndex - 1 + archiveImages.length) % archiveImages.length;
    }
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      onIndexChange?.(newIndex);
    }
    x.set(0);
  };

  // Auto-play logic
  React.useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      const newIndex = (currentIndex + 1) % archiveImages.length;
      setCurrentIndex(newIndex);
      onIndexChange?.(newIndex);
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, isHovered, onIndexChange]);

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-48 h-64 sm:w-56 sm:h-72 md:w-72 md:h-96 group"
    >
      {/* Background Stack Effect (Real Images) */}
      <div className="absolute inset-0 translate-x-4 translate-y-4 -z-20 group-hover:translate-x-8 group-hover:translate-y-8 group-hover:scale-110 transition-all duration-700 rounded-2xl overflow-hidden opacity-20 grayscale">
        <img src={archiveImages[nextNextIndex]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="absolute inset-0 translate-x-2 translate-y-2 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 group-hover:scale-105 transition-all duration-700 rounded-2xl overflow-hidden opacity-40 grayscale-[0.5]">
        <img src={archiveImages[nextIndex]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          style={{ x, rotate, scale }}
          variants={{
            enter: (direction: number) => ({
              x: direction > 0 ? 300 : -300,
              opacity: 0,
              rotate: direction > 0 ? 10 : -10,
              scale: 0.8
            }),
            center: {
              x: 0,
              opacity: 1,
              rotate: 0,
              scale: 1,
              zIndex: 1
            },
            exit: (direction: number) => ({
              x: direction < 0 ? 300 : -300,
              opacity: 0,
              rotate: direction < 0 ? 10 : -10,
              scale: 0.8,
              zIndex: 0
            })
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 group-hover:border-white/40 transition-colors duration-500">
            <img 
              src={archiveImages[currentIndex]} 
              alt="Archive Preview" 
              className="w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            {/* Swipe Stamps */}
            <motion.div 
              style={{ opacity: nextOpacity }}
              className="absolute top-10 left-6 border-2 border-white/40 px-4 py-1 rounded-lg rotate-[-20deg] pointer-events-none z-50"
            >
              <span className="text-2xl font-display font-black text-white uppercase text-outline opacity-80">NEXT</span>
            </motion.div>
            <motion.div 
              style={{ opacity: prevOpacity }}
              className="absolute top-10 right-6 border-2 border-white/40 px-4 py-1 rounded-lg rotate-[20deg] pointer-events-none z-50"
            >
              <span className="text-2xl font-display font-black text-white uppercase text-outline opacity-80">PREV</span>
            </motion.div>
            
            {/* Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6">
              <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-1">Archive Collection</p>
              <h3 className="text-lg md:text-xl font-display font-bold text-white uppercase leading-tight mb-2 md:mb-4">Explore the<br/>Heritage</h3>
              
              <Link 
                to="/archives" 
                className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white hover:gap-4 transition-all group/link"
              >
                View Archives <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Swipe Instructions */}
      <div className="absolute -bottom-10 left-0 w-full hidden sm:flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">← Swipe Left for Next</span>
        <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">Swipe Right for Prev →</span>
      </div>
    </motion.div>
  );
}
