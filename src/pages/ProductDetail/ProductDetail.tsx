import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../shared/productsInterface';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import { Spinner } from '../../components/SpinnerLoading/SpinnerLoading';
import { Carousel } from 'react-responsive-carousel';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const userId = localStorage.getItem('userId');

  // Fetch products once when the component mounts
  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    axiosInstance.get('/items/')
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  
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

  const handleProductClick = (product: Product) => {
    navigate(`/product-detail/${product.item_id}`);
  };

  const handleRequest = () => {
    
  const userId = localStorage.getItem('userId');

    if (!userId) {
      //Alert user to login
      alert('Vui lòng đăng nhập để thực hiện chức năng này');
      navigate('/auth');
      return;
    }
    navigate(`/request-exchange/${productId}`);
  }

  if (!product) {
    return (
      <div  className="py-10 px-6 flex items-center justify-center text-center">
        <Spinner size="lg" color="primary" />
      </div>
    )
  }


  return (
    <div className="bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white p-6 shadow-md rounded-md">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image */}
          {/* <div className="w-full lg:w-1/2">
            <img
              src={product.item_images[0]}
              alt={product.item_name}
              className="w-full h-96 object-cover rounded-md"
            />
          </div> */}

        <div className="w-full lg:w-1/2 rounded-lg">
          <Carousel
            showArrows={true}
            showThumbs={false}
            infiniteLoop={true}
            showStatus={false}
            stopOnHover={true}
            className="w-full"
          >
            {product.item_images.map((image, index) => (
              <div key={index} className="h-80 md:h-96 lg:h-[500px] rounded-lg">
                <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </Carousel>
        </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.item_name}</h1>
            <div className="flex items-center mb-2">
              <img
              src={product.image_user}
              alt={`${product.user_name}'s profile`}
              className="w-5 h-5 rounded-full mr-2"
              />
              <p className="text-gray-700 font-semibold">{product.user_name}</p>
            </div>
            <p className="mt-2 text-gray-800 text-sm flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 mr-1"
            >
              <path
                fillRule="evenodd"
                d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                clipRule="evenodd"
              />
            </svg>
            {product?.address}
          </p>

            <div className="text-4xl text-red-500 font-bold mb-6">{product.price} SW</div>

            <div className="flex items-center mb-6">
              <span className="text-gray-700 mr-4">Số lượng:</span>
              <input
                type="number"
                className="border w-20 p-2 rounded-md"
                min="1"
                max={product.quantity}
                defaultValue="1"
              />
            </div>
            {product.seller_id !== Number(userId) && (
              <div className="flex gap-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-md font-semibold">
                  Liên hệ
                </button>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white py-3 px-8 rounded-md font-semibold" onClick={handleRequest}>
                  Yêu cầu trao đổi
                </button>
              </div>

            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Mô tả:</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>

      <ProductCarousel products={products} handleProductClick={handleProductClick} />
    </div>
  );
};

export default ProductDetail;
