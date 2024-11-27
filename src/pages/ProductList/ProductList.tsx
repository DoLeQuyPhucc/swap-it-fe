import React, { useEffect, useCallback, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Product } from "../../shared/productsInterface";
import useSearchStore from "src/shared/store/SearchStore";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/SpinnerLoading/SpinnerLoading";
import { motion, AnimatePresence } from "framer-motion";

const ProductListSkeleton: React.FC = () => {
  return (
    <div className="bg-white py-10">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
              className="border rounded-lg overflow-hidden shadow-lg animate-pulse"
            >
              <div className="w-full h-32 bg-gray-300"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductList: React.FC = () => {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const userId = Number(localStorage.getItem('userId'));
  const navigate = useNavigate();

  // Enhanced fetch data with more robust error handling
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axiosInstance.get("/items/");
      const fetchedProducts = response.data.data;
      
      setProducts(fetchedProducts);
      setFilteredProducts(
        fetchedProducts.filter((product: Product) => product.seller_id !== userId).filter((product: Product) => product.item_status !== "Sold")
      );
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounced product filtering
  const filterProductList = useCallback(
    debounce((query: string) => {
      if (!products.length) return;

      const filtered = query 
        ? products.filter(
            (product) => 
              product.item_name.toLowerCase().includes(query.toLowerCase()) && 
              product.seller_id !== userId
          ).filter((product: Product) => product.item_status !== "Sold")
        : products.filter(product => product.seller_id !== userId).filter((product: Product) => product.item_status !== "Sold");
      
      setFilteredProducts(filtered);
    }, 300),
    [products, userId]
  );

  // Trigger filtering when search query changes
  useEffect(() => {
    filterProductList(searchQuery);
  }, [searchQuery, filterProductList]);

  const handleProductClick = (product: Product) => {
    navigate(`/product-detail/${product.item_id}`);
  };

  // Error state rendering
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Oops! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button 
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Loading state rendering
  if (isLoading) {
    return <ProductListSkeleton />;
  }

  // Empty state rendering
  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-600 mb-4">
            No Products Found
          </h2>
          <img 
            src="https://mitienda.ucol.mx/assets/img/productos/product-not-found.png" 
            alt="No products" 
            className="max-w-xs mx-auto mb-4"
          />
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white py-10"
    >
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <AnimatePresence>
          {filteredProducts
            .sort(
              (a, b) =>
                (a.item_status === "Sold" ? 1 : 0) - 
                (b.item_status === "Sold" ? 1 : 0)
            )
            .map((product) => {
              const isSold = product.item_status === "Sold"; // Check if the product is sold
              return (
                <motion.div
                key={product.item_id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
                  isSold ? "opacity-50 pointer-events-none" : "hover:shadow-xl"
                }`}
                onClick={() => !isSold && handleProductClick(product)}
              >
                <div
                  key={product.item_id}
                  className={`border rounded-lg overflow-hidden shadow-lg ${isSold ? "opacity-50 pointer-events-none" : ""}`} 
                  onClick={() => !isSold && handleProductClick(product)} // Disable click if sold
                >
                  <img
                    src={product.item_images[0]}
                    alt={product.item_name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold truncate">{product.item_name}</h3>
                    <p className="text-red-500 font-semibold">{product.price} SW</p>
                    <div className="flex items-center">
                      <img
                        src={product.image_user}
                        alt={`${product.user_name}'s profile`}
                        className="w-5 h-5 rounded-full mr-2"
                      />
                      <p className="text-gray-600 truncate my-2">{product.user_name}</p>
                    </div>
                    <p className="text-gray-500 text-sm flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {product.address}
                    </p>
                  </div>
                </div>
                </motion.div>
              );
            })}

          
</AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductList;
