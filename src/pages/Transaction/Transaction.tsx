import { Product } from "@/shared/productsInterface";
import { useEffect, useState } from "react";

interface Transaction {
    transaction_id: number;
    buyer_id: number;
    seller_id: number;
    item_buyer_id: number;
    item_seller_id: number;
    transaction_date: string;
    transaction_status: string;
    buyer_item: Product;
    seller_item: Product;
}

const Transactions = () => {
  const [transactionsBuyer, setTransactionsBuyer] = useState<Transaction[]>([]);
  const [transactionsSeller, setTransactionsSeller] = useState<Transaction[]>([]);

  // Gọi API để lấy danh sách giao dịch của seller có ID 2
  useEffect(() => {
    // Fetch transactions for seller
    fetch("http://localhost:3001/api/v1/transactions/seller/2")
      .then((response) => response.json())
      .then((data) => {
        setTransactionsSeller(data.data);
        console.log("Seller transactions:", data.data); // Log after setting state
      })
      .catch((error) => console.error("Error fetching seller transactions:", error));
  
    // Fetch transactions for buyer
    fetch(`http://localhost:3001/api/v1/transactions/buyer/1`)
      .then((response) => response.json())
      .then((data) => {
        setTransactionsBuyer(data.data);
        console.log("Buyer transactions:", data.data); // Log after setting state
      })
      .catch((error) => console.error("Error fetching buyer transactions:", error));
  }, []); // Empty dependency array ensures it runs once on mount
  
  const handleAccept = (transactionId: number) => {
    // Logic xử lý khi bấm nút "Accept"
    console.log("Accepted transaction with ID:", transactionId);

    // Gọi API để cập nhật trạng thái transaction
    // fetch(`API_endpoint_to_accept_transaction/${transactionId}`, { method: "PUT" })
    //   .then(response => response.json())
    //   .then(data => console.log("Transaction accepted:", data))
    //   .catch(error => console.error("Error accepting transaction:", error));
  };

  return (
    <div className="container">
        
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Transactions (Buyer Id: 1) -- giao dịch của Tôi với người khác (chờ người khác accept)</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Transaction ID</th>
            <th className="border border-gray-200 px-4 py-2">My Item</th>
            <th className="border border-gray-200 px-4 py-2">Seller Name</th>
            <th className="border border-gray-200 px-4 py-2">Seller Item</th>
            <th className="border border-gray-200 px-4 py-2">Transaction Status</th>
          </tr>
        </thead>
        <tbody>
          {transactionsSeller.map((transaction) => (
            <tr key={transaction.transaction_id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{transaction.transaction_id}</td>
              
              <td className="border border-gray-200 px-4 py-2">
                <img
                  src={transaction.buyer_item?.image_Items}
                  alt={transaction.buyer_item?.item_name}
                  className="w-12 h-12"
                />
                <p className="mt-2">{transaction.buyer_item?.item_name}</p>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <img
                  src={transaction.seller_item?.image_user}
                  alt="Buyer"
                  className="w-12 h-12 rounded-full"
                />
                <p className="mt-2">{transaction.seller_item?.user_name}</p>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <img
                  src={transaction.seller_item?.image_Items}
                  alt={transaction.seller_item?.item_name}
                  className="w-12 h-12"
                />
                <p className="mt-2">{transaction.seller_item?.item_name}</p>
              </td>
              <td className="border border-gray-200 px-4 py-2">{transaction.transaction_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Transactions for Seller ID: 2 (giao dịch người khác đến với tôi -- chờ tôi accept)</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Transaction ID</th>
            <th className="border border-gray-200 px-4 py-2">Buyer Name</th>
            <th className="border border-gray-200 px-4 py-2">Buyer Item</th>
            <th className="border border-gray-200 px-4 py-2">Seller Item</th>
            <th className="border border-gray-200 px-4 py-2">Transaction Status</th>
            <th className="border border-gray-200 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactionsBuyer.map((transaction) => (
            <tr key={transaction.transaction_id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{transaction.transaction_id}</td>
              <td className="border border-gray-200 px-4 py-2">
                <img
                  src={transaction.buyer_item?.image_user}
                  alt="Buyer"
                  className="w-12 h-12 rounded-full"
                />
                <p className="mt-2">{transaction.buyer_item?.user_name}</p>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <img
                  src={transaction.buyer_item?.image_Items}
                  alt={transaction.buyer_item?.item_name}
                  className="w-12 h-12"
                />
                <p className="mt-2">{transaction.buyer_item?.item_name}</p>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <img
                  src={transaction.seller_item?.image_Items}
                  alt={transaction.seller_item?.item_name}
                  className="w-12 h-12"
                />
                <p className="mt-2">{transaction.seller_item?.item_name}</p>
              </td>
              <td className="border border-gray-200 px-4 py-2">{transaction.transaction_status}</td>
              <td className="border border-gray-200 px-4 py-2">
                {transaction.transaction_status === "Pending" && (
                  <button
                    onClick={() => handleAccept(transaction.transaction_id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Accept
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    

    </div>
  );
};

export default Transactions;
