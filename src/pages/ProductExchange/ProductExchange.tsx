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
  const [selectedItem, setSelectedItem] = useState<Product | null>(null); // Only store 1 product
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Show 5 items per page
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
    const priceDiff = Math.abs(parseFloat(itemPrice) - parseFloat(exchangePrice));
    return priceDiff > 20;
  };

  const handleRadioChange = (item: Product) => {
    setSelectedItem(item);
  };

  const handleRequestExchange = () => {
    if (!window.confirm("Are you sure you want to request exchange?")) return;

    const data = {
      buyer_id: userId,
      seller_id: itemExchange?.seller_id,
      item_buyer_id: selectedItem?.item_id,
      item_seller_id: itemExchange?.item_id,
      transaction_date: new Date().toISOString().split("T")[0],
      transaction_status: "Pending",
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemsBySellerId.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(itemsBySellerId.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-between h-screen px-10">
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
          <p>{itemExchange?.description}</p>
          <p className="mt-2 text-gray-600">Price: ${itemExchange?.price}</p>
        </div>
      </div>

      {/* Middle button - Request Exchange */}
      <div className="flex justify-center mt-32 w-1/6">
        <button
          className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full w-24 h-24"
          onClick={handleRequestExchange}
          disabled={!selectedItem}
        >
          Request Exchange
        </button>
      </div>

      {/* Right side - List of Items in Table */}
      <div className="w-1/2 p-5">
        <h2 className="text-xl font-semibold mb-4">Select My Item:</h2>
        <div className="overflow-x-auto">
          <div style={{ maxHeight: "420px", overflowY: "scroll" }}>
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
                {currentItems.map((item) => {
                  const disabled =
                    isItemDisabled(item.price, itemExchange.price) ||
                    item.item_status === "Sold";
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
                      <td className="px-4 py-2 border text-ellipsis overflow-hidden whitespace-nowrap">
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
          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(itemsBySellerId.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductExchange;
