import React, { useState, useRef } from "react";
import DefaultImage from "../../assets/img/upload-photo-here.png";

const NewItemForm = () => {
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    price: "",
    category: "",
    quantity: 1,
    address: "",
    item_status: "Available",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState(DefaultImage);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const userId = Number(localStorage.getItem('userId'));

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setSelectedFile(file);
      setImageURL(URL.createObjectURL(file)); // Hiển thị ảnh tạm thời
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataWithImage = new FormData(); // Sử dụng FormData để gửi cả file ảnh
    formDataWithImage.append("item_name", formData.item_name);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("price", formData.price);
    formDataWithImage.append("category", formData.category);
    formDataWithImage.append("quantity", formData.quantity.toString());
    formDataWithImage.append("address", formData.address);
    formDataWithImage.append("item_status", formData.item_status);
    formDataWithImage.append(
      "posted_date",
      new Date().toISOString().split("T")[0]
    ); // Ngày hiện tại
    formDataWithImage.append("seller_id", userId.toString()); // seller_id giả định
    if (selectedFile) {
      formDataWithImage.append("image", selectedFile); // Thêm tệp ảnh vào FormData
    }

    try {
      const response = await fetch("http://your-server-url.com/api/items", {
        method: "POST",
        body: formDataWithImage,
      });

      if (response.ok) {
        alert("Item created successfully");
        // Reset form sau khi submit thành công
        setFormData({
          item_name: "",
          description: "",
          price: "",
          category: "",
          quantity: 1,
          address: "",
          item_status: "Available",
        });
        setImageURL(DefaultImage);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div 
    className="flex flex-col space-y-4 p-8 w-1/2 mx-auto">
      
      <h2 className="text-3xl font-bold text-center">Thêm sản phẩm mới</h2>
    <form
      onSubmit={handleSubmit}
    >
      {/* Các trường khác */}
      <label>
        Tên sản phẩm:
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleInputChange}
          required
          className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
        />
      </label>

      <label>
        Mô tả:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
          rows={4}
        />
      </label>

      <label>
        Giá:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
          className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
        />
      </label>

      <label>
        Phân loại:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
        />
      </label>

      <label>
        Số lượng:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
        />
      </label>

      <label>
        Địa chỉ:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
        />
      </label>
      <label>
        Hình ảnh:
        <div className="mt-2 flex items-center justify-center rounded-lg" style={{border: '1px solid #ccc'}}>
          <img
            src={imageURL}
            alt="Avatar"
            className="h-72 w-72 object-cover"
          />
          <input
            type="file"
            ref={fileUploadRef}
            onChange={handleFileChange}
            hidden
          />
        </div>
      </label>
      <label>
        Item Status:
        <select
          name="item_status"
          value={formData.item_status}
          onChange={handleInputChange}
          className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded-lg"
        >
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
        </select>
      </label>

      <button
        type="submit"
        className="w-full p-2 mt-2 mb-4 bg-amber-500 hover:bg-amber-700 text-white rounded-lg"
      >
       Thêm sản phẩm
      </button>
    </form>

    </div>
  );
};

export default NewItemForm;
