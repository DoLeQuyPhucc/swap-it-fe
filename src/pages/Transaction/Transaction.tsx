import axiosInstance from "../../api/axiosInstance";
import { Product } from "../../shared/productsInterface";
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
  const [transactionsSeller, setTransactionsSeller] = useState<Transaction[]>(
    []
  );
  const [transactionUpdated, setTransactionUpdated] = useState(false);

  const userId = 1;

  // Gọi API để lấy danh sách giao dịch của seller có ID 1
  useEffect(() => {
    // Fetch transactions for seller
    axiosInstance
      .get(`/transactions/seller/${userId}`)
      .then((response) => {
        setTransactionsSeller(response.data.data);
      })
      .catch((error) =>
        console.error("Error fetching seller transactions:", error)
      );

    // Fetch transactions for buyer
    axiosInstance
      .get(`/transactions/buyer/${userId}`)
      .then((response) => {
        setTransactionsBuyer(response.data.data);
      })
      .catch((error) =>
        console.error("Error fetching buyer transactions:", error)
      );
  }, [userId, transactionUpdated]); // Ensure it runs once on mount, use userId as dependency
  const handleAccept = (
    transactionId: number,
    item_buyer_id: number,
    item_seller_id: number
  ) => {
    console.log("Accepted transaction with ID:", transactionId);

    axiosInstance
      .put(`/transactions/accept/${transactionId}`)
      .then((response) => {
        console.log("Transaction accepted:", response.data);

        // Cập nhật trạng thái cho transactionsBuyer
        setTransactionsBuyer((prevTransactions) =>
          prevTransactions.map((transaction) => {
            if (transaction.transaction_id === transactionId) {
              return { ...transaction, transaction_status: "Completed" }; // Đổi status thành "Completed"
            }
            return transaction.item_buyer_id === item_buyer_id ||
              transaction.item_seller_id === item_seller_id
              ? { ...transaction, transaction_status: "Not Completed" } // Đổi status thành "Not Completed"
              : transaction;
          })
        );

        // Cập nhật trạng thái cho transactionsSeller
        setTransactionsSeller((prevTransactions) =>
          prevTransactions.map((transaction) => {
            if (transaction.transaction_id === transactionId) {
              return { ...transaction, transaction_status: "Completed" }; // Đổi status thành "Completed"
            }
            return transaction.item_buyer_id === item_buyer_id ||
              transaction.item_seller_id === item_seller_id
              ? { ...transaction, transaction_status: "Not Completed" } // Đổi status thành "Not Completed"
              : transaction;
          })
        );
      })
      .catch((error) => console.error("Error accepting transaction:", error));
  };

  return (
    <div className="container mx-auto px-32">
      <div className="p-4 my-12">
        <h2 className="text-2xl font-bold mb-4">My transactions</h2>
        <table
          className="min-w-full border-collapse border border-gray-200"
          style={{ tableLayout: "fixed", width: "100%" }} // Ensure equal column widths
        >
          <thead>
            <tr className="bg-gray-100">
              <th colSpan={2} className="border border-gray-200 px-4 py-2">
                My Item
              </th>
              <th colSpan={2} className="border border-gray-200 px-4 py-2">
                Seller's Item
              </th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactionsBuyer.map((transaction) => (
              <tr key={transaction.transaction_id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">
                  <div className="flex items-center">
                    <img
                      src={transaction.buyer_item?.image_user}
                      alt="Buyer"
                      className="w-12 h-12 rounded-full"
                    />
                    <p className="ml-2">{transaction.buyer_item?.user_name}</p>
                  </div>
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
                  <div className="flex items-center">
                    <img
                      src={transaction.seller_item?.image_user}
                      alt="Seller"
                      className="w-12 h-12 rounded-full"
                    />
                    <p className="ml-2">{transaction.seller_item?.user_name}</p>
                  </div>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <img
                    src={transaction.seller_item?.image_Items}
                    alt={transaction.seller_item?.item_name}
                    className="w-12 h-12"
                  />
                  <p className="mt-2">{transaction.seller_item?.item_name}</p>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <span
                    className={`inline-flex items-center rounded-md px-4 py-2 text-xs font-medium ring-1 ring-inset ${
                      transaction.transaction_status === "Completed"
                        ? "bg-green-50 text-green-700 ring-green-600/10"
                        : transaction.transaction_status === "Not Completed"
                        ? "bg-red-50 text-red-700 ring-red-600/10"
                        : transaction.transaction_status === "Pending"
                        ? "bg-blue-50 text-blue-700 ring-blue-600/10"
                        : ""
                    }`}
                  >
                    {transaction.transaction_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 mb-12">
        <h2 className="text-2xl font-bold mb-4">Request for transactions</h2>
        <table
          className="min-w-full border-collapse border border-gray-200"
          style={{ tableLayout: "fixed", width: "100%" }} // Ensure equal column widths
        >
          <thead>
            <tr className="bg-gray-100">
              <th colSpan={2} className="border border-gray-200 px-4 py-2">
                My Item
              </th>
              <th colSpan={2} className="border border-gray-200 px-4 py-2">
                Buyer's Item
              </th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactionsSeller.map((transaction) => (
              <tr key={transaction.transaction_id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">
                  <div className="flex items-center">
                    <img
                      src={transaction.seller_item?.image_user}
                      alt="Seller"
                      className="w-12 h-12 rounded-full"
                    />
                    <p className="ml-2">{transaction.seller_item?.user_name}</p>
                  </div>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <img
                    src={transaction.seller_item?.image_Items}
                    alt={transaction.seller_item?.item_name}
                    className="w-12 h-12"
                  />
                  <p className="mt-2">{transaction.seller_item?.item_name}</p>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <div className="flex items-center">
                    <img
                      src={transaction.buyer_item?.image_user}
                      alt="Buyer"
                      className="w-12 h-12 rounded-full"
                    />
                    <p className="ml-2">{transaction.buyer_item?.user_name}</p>
                  </div>
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
                  <span
                    className={`inline-flex items-center rounded-md px-4 py-2 text-xs font-medium ring-1 ring-inset ${
                      transaction.transaction_status === "Completed"
                        ? "bg-green-50 text-green-700 ring-green-600/10"
                        : transaction.transaction_status === "Not Completed"
                        ? "bg-red-50 text-red-700 ring-red-600/10"
                        : transaction.transaction_status === "Pending"
                        ? "bg-blue-50 text-blue-700 ring-blue-600/10"
                        : ""
                    }`}
                  >
                    {transaction.transaction_status}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {transaction.transaction_status === "Pending" && (
                    <button
                      onClick={() =>
                        handleAccept(
                          transaction.transaction_id,
                          transaction.item_buyer_id,
                          transaction.item_seller_id
                        )
                      }
                      className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-700 rounded-full"
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
