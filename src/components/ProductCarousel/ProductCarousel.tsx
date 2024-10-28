import { Product } from '../../shared/productsInterface';
import React, { useRef } from 'react';

interface ProductCarouselProps {
  products: Product[];
  handleProductClick: (product: Product) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, handleProductClick }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -scrollRef.current.clientWidth : scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center">
      <button onClick={() => scroll('left')} className="p-2 bg-gray-300 rounded-l-md hover:bg-gray-400">
        &#10094; {/* Left Arrow */}
      </button>

      <div className="overflow-x-auto whitespace-nowrap" ref={scrollRef} style={{ scrollBehavior: 'smooth', width: '80%' }}>
        {products.map((product) => (
          <div
            key={product.item_id}
            className="inline-block border rounded-lg overflow-hidden shadow-lg mx-2"
            onClick={() => handleProductClick(product)}
          >
            <img src={product.image_Items} alt={product.item_name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{product.item_name}</h3>
              <p className="text-gray-600">{product.user_name}</p>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-gray-500 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
                </svg>
                {product.address}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => scroll('right')} className="p-2 bg-gray-300 rounded-r-md hover:bg-gray-400">
        &#10095; {/* Right Arrow */}
      </button>
    </div>
  );
};

export default ProductCarousel;
