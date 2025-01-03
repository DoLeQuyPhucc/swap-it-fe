import React, { useEffect, useCallback, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Product } from "../../shared/productsInterface";
import useSearchStore from "src/shared/store/SearchStore";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/SpinnerLoading/SpinnerLoading";

const MyProduct: React.FC = () => {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const userId = Number(localStorage.getItem('userId'));

  // Fetch products once when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axiosInstance
      .get(`/items/user/${userId}`)
      .then((response) => {
        setProducts(response.data.data);
        setFilteredProducts(
          response.data.data.filter(
            (product: Product) => product.seller_id == userId
          )
        ); // Filter initially
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Debounce the search filter to avoid excessive filtering while typing
  const filterProductList = useCallback(
    debounce((query: string) => {
      if (!products) {
        return;
      }
      if (!query) {
        setFilteredProducts(
          products.filter((product) => product.seller_id === userId)
        ); // Reset to filtered list excluding seller_id === 1
      } else {
        const productsFiltered = products.filter(
          (product) =>
            product.item_name.toLowerCase().includes(query.toLowerCase()) &&
            product.seller_id !== userId // Exclude seller_id === 1
        );
        setFilteredProducts(productsFiltered);
      }
    }, 300),
    [products]
  ); // Update when products change

  // Trigger filtering when searchQuery changes
  useEffect(() => {
    filterProductList(searchQuery);
  }, [searchQuery, filterProductList]);
  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    navigate(`/product-detail/${product.item_id}`);
  };

  if (!products) {
    return (
      <div  className="py-10 px-6 flex items-center justify-center text-center">
        <Spinner size="lg" color="primary" />
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div
        className="py-16"
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-3xl font-bold text-center mb-8">
          You do not have any product
        </div>
        <img
          style={{ width: "400px", margin: "0 auto" }}
          src="https://mitienda.ucol.mx/assets/img/productos/product-not-found.png"
          alt="product"
        />
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 my-12">
      <div className="flex justify-between px-4 mb-8">
        <h2 className="text-3xl font-bold text-center">Sản phẩm của tôi</h2>

        <a
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-700 rounded-lg"
          href="/products/create"
        >
          Thêm sản phẩm
        </a>
      </div>
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts
            .sort(
              (a, b) =>
                (a.item_status === "Sold" ? 1 : 0) -
                (b.item_status === "Sold" ? 1 : 0)
            )
            .map((product) => {
              const isSold = product.item_status === "Sold"; // Check if the product is sold
              return (
                <div
                  key={product.item_id}
                  className={`border rounded-lg overflow-hidden shadow-lg ${
                    isSold ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={() => !isSold && handleProductClick(product)} // Disable click if sold
                >
                  <img
                    src={product.item_images[0]}
                    alt={product.item_name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold truncate">{product.item_name}</h3>
                    <div className="flex items-center">
                      <img
                        src={product.image_user}
                        alt={`${product.user_name}'s profile`}
                        className="w-5 h-5 rounded-full mr-2"
                      />
                      <p className="text-gray-600 truncate my-2">{product.user_name}</p>
                    </div>
                    <p className="text-red-500">{product.price} SW</p>
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
                    {/* if is sold, render the p tag "Sold" */}
                    {/* else, render the button to buy the product */}
                    {isSold ? (
                      <p className="text-red-500 text-bold text-sm">Đã trao đổi</p>
                    ) : (<></>)}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MyProduct;
