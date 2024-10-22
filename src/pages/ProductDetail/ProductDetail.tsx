import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../shared/productsInterface';
import axiosInstance from '../../api/axiosInstance';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);


  
  useEffect(() => {
    const fetchData = () => {
        axiosInstance.get(`/items/${productId}`)
          .then((response) => {
            setProduct(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      fetchData();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white p-6 shadow-md rounded-md">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={product.image_Items}
              alt={product.item_name}
              className="w-full h-96 object-cover rounded-md"
            />
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.item_name}</h1>
            <p className="text-gray-700 mb-2">Seller: <span className="font-semibold">{product.seller_name}</span></p>
            <p className="text-gray-700 mb-2">Category: <span className="font-semibold">{product.category}</span></p>
            <p className="text-gray-700 mb-2">Status: <span className="font-semibold">{product.item_status}</span></p>
            <p className="text-gray-700 mb-4">Address: <span className="font-semibold">{product.address}</span></p>

            <div className="text-4xl text-red-500 font-bold mb-6">${product.price}</div>

            <div className="flex items-center mb-6">
              <span className="text-gray-700 mr-4">Quantity:</span>
              <input
                type="number"
                className="border w-20 p-2 rounded-md"
                min="1"
                max={product.quantity}
                defaultValue="1"
              />
            </div>

            <div className="flex gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-md font-semibold">
                Buy Now
              </button>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white py-3 px-8 rounded-md font-semibold">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
