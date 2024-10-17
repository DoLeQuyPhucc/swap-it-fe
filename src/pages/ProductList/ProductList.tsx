import React from 'react';

const products = [
  { id: 1, name: 'Product 1', author: 'Author 1', location: 'Location 1', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', author: 'Author 2', location: 'Location 2', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', author: 'Author 3', location: 'Location 3', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Product 4', author: 'Author 4', location: 'Location 4', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Product 5', author: 'Author 5', location: 'Location 5', image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Product 6', author: 'Author 6', location: 'Location 6', image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Product 7', author: 'Author 7', location: 'Location 7', image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'Product 8', author: 'Author 8', location: 'Location 8', image: 'https://via.placeholder.com/150' },
  { id: 9, name: 'Product 9', author: 'Author 9', location: 'Location 9', image: 'https://via.placeholder.com/150' },
  { id: 10, name: 'Product 10', author: 'Author 10', location: 'Location 10', image: 'https://via.placeholder.com/150' },
  { id: 11, name: 'Product 11', author: 'Author 11', location: 'Location 11', image: 'https://via.placeholder.com/150' },
  { id: 12, name: 'Product 12', author: 'Author 12', location: 'Location 12', image: 'https://via.placeholder.com/150' },
  { id: 13, name: 'Product 13', author: 'Author 13', location: 'Location 13', image: 'https://via.placeholder.com/150' },
  { id: 14, name: 'Product 14', author: 'Author 14', location: 'Location 14', image: 'https://via.placeholder.com/150' },
  { id: 15, name: 'Product 15', author: 'Author 15', location: 'Location 15', image: 'https://via.placeholder.com/150' },
];

const ProductList: React.FC = () => {
  return (
    <div className="bg-white py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Recommend For You</h2>
      <div className="max-w-screen-lg mx-auto px-4"> {/* Đặt chiều rộng tối đa và căn giữa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.author}</p>
                <p className="text-gray-500 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fill-rule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clip-rule="evenodd" />
                </svg>

                  {product.location}

                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
