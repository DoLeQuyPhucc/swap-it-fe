"use client";

import React, { useState, useRef } from "react";
import NextImage from "next/image";
import { toast, Toaster } from "sonner";
import axiosInstance from "../../api/axiosInstance";

// Default image can be stored in public folder
const DEFAULT_IMAGE = "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg";

// Cloudinary upload function
const uploadImageToCloudinary = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();

    const CLOUDINARY_UPLOAD_PRESET = "gift_system";
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dt4ianp80/image/upload";

    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Upload failed: ${JSON.stringify(errorData)}`);
    }

    const responseData = await response.json();
    return responseData.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    toast.error("Image upload failed");
    throw error;
  }
};

interface FormData {
  item_name: string;
  description: string;
  price: number;
  quantity: number;
  address: string;
  image_url?: string;
}

export default function NewItemForm() {
  const [formData, setFormData] = useState<FormData>({
    item_name: "",
    description: "",
    price: 0,
    quantity: 1,
    address: "",
  });

  const userId = Number(localStorage.getItem("userId"));

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(DEFAULT_IMAGE);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      // Convert string to number for price and quantity fields
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    fileInputRef.current?.click();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Start upload process
    setIsUploading(true);

    try {
      // Upload image to Cloudinary if a file is selected
      let imageUrl = "";
      if (selectedFile) {
        imageUrl = await uploadImageToCloudinary(selectedFile);

        // Prepare final form data
        const finalFormData = {
          ...formData,
          image_Items: [imageUrl],
          seller_id: userId,
          category_id: 1,
          item_status: "Available",
        };

        console.log("finalFormData:", finalFormData);

        // Send data to your backend
        const response = await axiosInstance.post("/items", finalFormData);

        if (response.data.success) {
          toast.success("Item created successfully");

          // Reset form
          setFormData({
            item_name: "",
            description: "",
            price: 0,
            quantity: 1,
            address: "",
          });
          setImagePreview(DEFAULT_IMAGE);
          setSelectedFile(null);
        } else {
          const errorData = await response.data.message.json();
          toast.error(`Failed to create item: ${errorData.message}`);
        }
      }
    } catch (error) {
      console.error("Error creating item:", error);
      toast.error("Failed to create item");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <Toaster />
      <h2 className="text-3xl font-bold text-center mb-6">Thêm sách mới</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hình ảnh
          </label>
          <div className="flex justify-center">
            <div className="relative w-72 h-72" >
              {/* Use img tag instead of NextImage to avoid import issues */}
              <img
                src={imagePreview}
                alt="Product Preview"
                className="absolute inset-0 w-full h-full object-cover rounded-lg border"
                
                onClick={handleImageUpload}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Rest of the form remains the same */}
        <div className="grid grid-cols-1 gap-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên:
          </label>
          <input
            type="text"
            name="item_name"
            value={formData.item_name}
            onChange={handleInputChange}
            placeholder="Tên"
            required
            className="w-full p-2 border rounded-lg"
          />

<label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Mô tả"
            rows={4}
            className="w-full p-2 border rounded-lg"
          />

<label className="block text-sm font-medium text-gray-700 mb-2">
            Điểm:
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Giá"
            required
            className="w-full p-2 border rounded-lg"
          />

<label className="block text-sm font-medium text-gray-700 mb-2">
            Số lượng
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Số lượng"
            className="w-full p-2 border rounded-lg"
          />

<label className="block text-sm font-medium text-gray-700 mb-2">
            Địa chỉ
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Địa chỉ"
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:bg-amber-300"
        >
          {isUploading ? "Đang tiến hành..." : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
}
