import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../shared/productsInterface";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ProductExchange: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const [itemsBySellerId, setItemsBySellerId] = useState<Product[]>([]);
  const [itemExchange, setItemExchange] = useState<Product>();

  const [selectedItem, setSelectedItem] = useState<Product | null>(null); // Chỉ lưu 1 sản phẩm
  const navigate = useNavigate();
  const userId = 1;

  useEffect(() => {
    const fetchData = () => {
      axiosInstance
        .get(`/items/exchange/${userId}&${productId}`)
        .then((response) => {
          setItemsBySellerId(response.data.data.itemsBySellerId);
          setItemExchange(response.data.data.itemExchange);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
  }, [productId]);

  if (!itemExchange) {
    return <div>Loading...</div>;
  }

  const isItemDisabled = (itemPrice: string, exchangePrice: string) => {
    const priceDiff = Math.abs(
      parseFloat(itemPrice) - parseFloat(exchangePrice)
    );
    return priceDiff > 10;
  };

  const handleRadioChange = (item: Product) => {
    setSelectedItem(item);
  };

  const handleRequestExchange = () => {
    console.log("Request sent");
    console.log(selectedItem);

    if (!window.confirm("Are you sure you want to request exchange?")) {
      return;
    }

    const data = {
      buyer_id: userId,
      seller_id: itemExchange?.seller_id,
      item_buyer_id: itemExchange?.item_id,
      item_seller_id: selectedItem?.item_id,
      transaction_date: new Date().toISOString().split("T")[0],
      transaction_status: "Completed",
    };

    axiosInstance
      .post("/transactions", data)
      .then((response) => {
        console.log(response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex justify-between  h-screen px-10">
      {/* Left side - Item to Exchange */}
      <div className="w-1/2 p-5">
        <h2 className="text-xl font-semibold mb-4">Product for Exchange</h2>
        <div className="border p-5 rounded-lg shadow-md">
          <img
            src={itemExchange?.image_Items}
            alt={itemExchange?.item_name}
            className="w-full h-64 object-cover mb-4 rounded-lg"
          />
          <h3 className="text-lg font-bold">{itemExchange?.item_name}</h3>
          <div className="flex items-center my-2">
            <img
              src={itemExchange.image_user}
              alt={`${itemExchange.user_name}'s profile`}
              className="w-5 h-5 rounded-full mr-2"
            />
            <p className="text-gray-700">{itemExchange.user_name}</p>
          </div>
          <p>{itemExchange?.description}</p>
          <p className="mt-2 text-gray-600">Price: ${itemExchange?.price}</p>
          <p className="mt-2     text-gray-600 text-sm flex items-center">
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
            {itemExchange?.address}
          </p>
        </div>
      </div>

      {/* Middle button - Request Exchange */}
      <div className="flex justify-center mt-32 w-1/6">
        <button
          className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full w-24 h-24"
          onClick={handleRequestExchange}
          disabled={!selectedItem} // Disable button nếu chưa chọn item nào
        >
          Request Exchange
        </button>
      </div>

      {/* Right side - List of Items in Table */}
      <div className="w-1/2 p-5">
        <h2 className="text-xl font-semibold mb-4">Select My Item:</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border">Select</th>
                <th className="px-4 py-2 text-left border">Item Name</th>
                <th className="px-4 py-2 text-left border">Image</th>
                <th className="px-4 py-2 text-left border">Description</th>
                <th className="px-4 py-2 text-left border">Price</th>
                <th className="px-4 py-2 text-left border">Address</th>
              </tr>
            </thead>
            <tbody>
              {itemsBySellerId.map((item) => {
                const disabled = isItemDisabled(item.price, itemExchange.price);
                return (
                  <tr
                    key={item.item_id}
                    className={`border-t ${
                      disabled ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <td className="px-4 py-2 border">
                      {!disabled && (
                        <input
                          type="radio"
                          checked={selectedItem?.item_id === item.item_id}
                          onChange={() => handleRadioChange(item)}
                        />
                      )}
                    </td>
                    <td className="px-4 py-2 border">{item.item_name}</td>
                    <td className="px-4 py-2 border">
                      <img
                        src={item.image_Items}
                        alt={item.item_name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td
                      className="px-4 py-2 border"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.description}
                    </td>
                    <td className="px-4 py-2 border">${item.price}</td>
                    <td className="px-4 py-2 border">{item.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductExchange;
