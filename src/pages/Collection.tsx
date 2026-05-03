import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { useStore, SortOption } from '../context/StoreContext';
import { Product, products as allProducts } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FilterDrawer } from '../components/FilterDrawer';
import { fetchProducts } from '../lib/api';

export function Collection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allFetchedProducts, setAllFetchedProducts] = useState<Product[]>([]);
  const { isLoading, setLoading, filters, setFilters, sort, setSort } = useStore();

  useEffect(() => {
    setLoading(true);
    // Fetch all products once to get categories
    fetchProducts().then(allData => {
      setAllFetchedProducts(allData);
      // Then fetch filtered products
      fetchProducts(filters, sort).then(filteredData => {
        setProducts(filteredData);
        setLoading(false);
      });
    });
  }, [filters, sort, setLoading]);

  const categories = useMemo(() => {
    const cats = allFetchedProducts.reduce((acc, p) => {
      if (p.category && !acc.includes(p.category)) acc.push(p.category);
      return acc;
    }, [] as string[]);
    return ['ALL', ...cats];
  }, [allFetchedProducts]);

  const selectedCategory = filters.categories.length === 0 ? 'ALL' : filters.categories[0];

  const handleCategoryChange = (cat: string) => {
    if (cat === 'ALL') {
      setFilters({ ...filters, categories: [] });
    } else {
      setFilters({ ...filters, categories: [cat] });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-primary)] pb-32 pt-[clamp(8rem,14vw,12rem)]">
      
      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

      {/* Category Header */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 mb-12">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12">
          <div className="flex flex-col gap-2">
            <span className="text-technical text-[10px] text-white/40 font-[900] tracking-[0.3em] uppercase">COLLECTIONS</span>
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-[900] text-white tracking-[-0.04em] leading-[0.85] uppercase">
               {selectedCategory === 'ALL' ? 'SHOP ALL' : selectedCategory}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-technical text-[11px] font-[800] tracking-[0.2em] transition-all relative pb-1
                    ${selectedCategory === cat ? 'text-white' : 'text-white/40 hover:text-white'}
                  `}
                >
                  {cat}
                  {selectedCategory === cat && (
                    <motion.div 
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-white"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Item Count & Sort/Refine */}
            <div className="flex items-center gap-8">
                <div className="hidden lg:block text-technical text-[10px] text-white/40 font-bold tracking-[0.1em] mr-4">
                  SHOWING {products.length} {products.length === 1 ? 'PIECE' : 'PIECES'}
                </div>
                
                <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center gap-3 text-technical text-[11px] font-[900] tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all"
                >
                    <Filter size={14} /> [ REFINE ]
                </button>
                
                <div className="relative group hidden sm:block">
                    <select 
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                        className="appearance-none bg-transparent text-technical text-[11px] font-[900] tracking-widest border border-white/20 px-6 py-3 pr-10 cursor-pointer focus:outline-none text-white"
                    >
                        <option value="latest" className="bg-black">LATEST</option>
                        <option value="price-low" className="bg-black">PRICE: LOW-HIGH</option>
                        <option value="price-high" className="bg-black">PRICE: HIGH-LOW</option>
                        <option value="popular" className="bg-black">POPULAR</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" />
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
             {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col gap-5">
                    <div className="aspect-portrait bg-white/5 animate-pulse border border-white/5" />
                    <div className="h-4 w-2/3 bg-white/5 animate-pulse" />
                    <div className="h-4 w-1/3 bg-white/5 animate-pulse" />
                </div>
             ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24"
          >
            <AnimatePresence mode="popLayout">
              {products.map((item, index) => (
                <ProductCard key={item.id} product={item} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && products.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center border border-dashed border-white/10">
            <p className="text-technical text-[12px] text-white/40 tracking-[0.2em]">[ NO_PIECES_FOUND_IN_THIS_DEPARTMENT ]</p>
            <button 
              onClick={() => handleCategoryChange('ALL')}
              className="mt-6 text-technical text-[10px] font-bold border-b border-white pb-1 text-white hover:text-white/60 transition-colors"
            >
              // RESET_FILTERS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
