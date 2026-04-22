import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown } from 'lucide-react';
import { useStore, Filters } from '../context/StoreContext';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterDrawer({ isOpen, onClose }: FilterDrawerProps) {
  const { filters, setFilters, products } = useStore();

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const allColors = ['BLACK', 'VINTAGE WHITE', 'MIDNIGHT BLACK', 'CHARCOAL', 'GREY', 'NAVY'];

  const toggleFilter = (type: keyof Filters, value: string) => {
    const current = filters[type] as string[];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    
    setFilters({ ...filters, [type]: updated });
  };

  const clearAll = () => {
    setFilters({
      categories: [],
      sizes: [],
      colors: [],
      minPrice: 0,
      maxPrice: 1000000
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[1001] flex flex-col shadow-2xl"
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 className="text-heading text-2xl">REFINE</h2>
              <button onClick={onClose} className="p-2 hover:opacity-50 transition-opacity">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-12 scrollbar-hide">
              {/* Size Filter */}
              <div className="space-y-6">
                <p className="text-technical text-[10px] font-black tracking-widest">SELECT SIZE</p>
                <div className="grid grid-cols-3 gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleFilter('sizes', size)}
                      className={`py-4 text-technical text-[10px] border transition-all font-black
                        ${filters.sizes.includes(size)
                          ? 'border-black bg-black text-white'
                          : 'border-gray-100 text-gray-400 hover:border-black hover:text-black'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="space-y-6">
                <p className="text-technical text-[10px] font-black tracking-widest">SELECT COLOUR</p>
                <div className="flex flex-col gap-2">
                  {allColors.map(color => (
                    <button
                      key={color}
                      onClick={() => toggleFilter('colors', color)}
                      className="flex items-center justify-between py-2 group"
                    >
                      <span className={`text-technical text-[10px] font-bold transition-colors ${filters.colors.includes(color) ? 'text-black' : 'text-gray-400 group-hover:text-black'}`}>
                        {color}
                      </span>
                      {filters.colors.includes(color) && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter (Simple range) */}
              <div className="space-y-6">
                 <p className="text-technical text-[10px] font-black tracking-widest">PRICE RANGE</p>
                 <div className="flex flex-col gap-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="200000" 
                      step="10000"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                      className="w-full accent-black cursor-pointer"
                    />
                    <div className="flex justify-between text-technical text-[10px] font-bold">
                       <span>0 UGX</span>
                       <span>{filters.maxPrice.toLocaleString()} UGX</span>
                    </div>
                 </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-100 bg-white grid grid-cols-2 gap-4">
              <button 
                onClick={clearAll}
                className="text-technical text-[10px] font-black border border-black py-4 hover:bg-black hover:text-white transition-all"
              >
                RESET
              </button>
              <button 
                onClick={onClose}
                className="btn-primary py-4 text-[10px]"
              >
                APPLY
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
