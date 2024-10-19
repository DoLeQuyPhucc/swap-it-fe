import React, { useEffect, useCallback, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Product } from '../../shared/productsInterface';
import useSearchStore from 'src/shared/store/SearchStore';
import { debounce } from 'lodash';

const ProductList: React.FC = () => {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products once when the component mounts
  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    axiosInstance.get('/items/')
      .then((response) => {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); // Set filtered list to full list initially
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Debounce the search filter to avoid excessive filtering while typing
  const filterProductList = useCallback(debounce((query: string) => {
    if (!query) {
      setFilteredProducts(products); // Reset to full list when query is empty
    } else {
      const productsFiltered = products.filter((product) =>
        product.item_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(productsFiltered);
    }
  }, 300), [products]); // Update when products change

  // Trigger filtering when searchQuery changes
  useEffect(() => {
    filterProductList(searchQuery);
  }, [searchQuery, filterProductList]);

  return (
    <div className="bg-white py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Recommend For You</h2>
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.item_id} className="border rounded-lg overflow-hidden shadow-lg">
              <img src={product.image} alt={product.item_name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{product.item_name}</h3>
                <p className="text-gray-600">{product.seller_name}</p>
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
      </div>
    </div>
  );
};

export default ProductList;
