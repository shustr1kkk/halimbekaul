import { Product } from '../data';
import { ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  key?: string;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-3xl p-6 border border-gray-100 hover:border-red-600/20 hover:shadow-2xl hover:shadow-red-500/5 transition-all cursor-pointer flex flex-col md:flex-row gap-6"
    >
      <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden bg-gray-50 shrink-0 relative">
        <img 
          src={product.image || `https://picsum.photos/seed/${product.id}/600/600`} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('picsum.photos')) {
              target.src = `https://picsum.photos/seed/${product.id}/600/600`;
            }
          }}
        />
      </div>
      <div className="flex flex-col flex-grow">
        <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
          {Array.isArray(product.category) ? product.category.join(', ') : product.category}
        </p>
        <h3 className="text-xl font-bold leading-tight mb-4 group-hover:text-red-600 transition-colors">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{product.ingredients}</p>
        <div className="flex items-end justify-between mt-auto pt-4">
          <div className="flex flex-col gap-1">
            {product.weight && <span className="text-sm text-gray-400 font-medium">{product.weight}</span>}
            {product.quantityInBox && <span className="text-sm text-gray-400 font-medium">{product.quantityInBox}</span>}
            {product.quantityOnPallet && <span className="text-sm text-gray-400 font-medium">На поддоне: {product.quantityOnPallet}</span>}
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
