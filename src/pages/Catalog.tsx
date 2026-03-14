import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, Product } from '../data';
import ProductCard from '../components/ProductCard';
import { X } from 'lucide-react';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['Все', 'Новинки', 'Даканца', 'Крузя', 'Хабиби', 'Это любовь', 'Фруктовый лёд', 'Отважный джигит', 'Десерт', 'Другое'];

  const filteredProducts = selectedCategory === 'Все' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => 
        Array.isArray(p.category) 
          ? p.category.includes(selectedCategory) 
          : p.category === selectedCategory
      );

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase">ЛИНЕЙКА МОРОЖЕНОГО</h1>
          <p className="text-gray-500 max-w-lg">Откройте для себя разнообразие вкусов: от классического пломбира до уникальных десертов с урбечем.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full border text-sm font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-red-600 border-red-600 text-white' 
                  : 'bg-white border-gray-200 hover:border-red-600 hover:text-red-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => setSelectedProduct(product)} 
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 bg-white/80 backdrop-blur-md hover:bg-white rounded-full transition-colors shadow-lg"
              >
                <X size={24} />
              </button>
              
              <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center shrink-0">
                <img 
                  src={selectedProduct.image || `https://picsum.photos/seed/${selectedProduct.id}/600/600`} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-contain max-h-[40vh] md:max-h-none"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('picsum.photos')) {
                      target.src = `https://picsum.photos/seed/${selectedProduct.id}/600/600`;
                    }
                  }}
                />
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col flex-1 overflow-y-auto">
                <p className="text-sm font-bold text-red-600 uppercase tracking-widest mb-4">
                  {Array.isArray(selectedProduct.category) ? selectedProduct.category.join(', ') : selectedProduct.category}
                </p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-8 pr-8">{selectedProduct.name}</h2>
                
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Состав</h4>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    {selectedProduct.ingredients}
                  </p>
                </div>

                <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-2">
                  {selectedProduct.weight && <span className="text-2xl font-bold">{selectedProduct.weight}</span>}
                  {selectedProduct.quantityInBox && <span className="text-xl font-bold">{selectedProduct.quantityInBox}</span>}
                  {selectedProduct.quantityOnPallet && <span className="text-lg text-gray-600 font-medium">На поддоне: {selectedProduct.quantityOnPallet}</span>}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
