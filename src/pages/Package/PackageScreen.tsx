// src/pages/PackagesScreen.js
import PackageCard from '../../components/PackageCard/PackageCard';
import React from 'react';

const PackagesScreen = () => {
  const packages = [
    {
      title: 'Gói Cơ Bản',
      price: 'Free',
      features: ['Đăng tối đa 3 bài', 'Hiển thị trong 7 ngày', 'Không hỗ trợ ưu tiên'],
      buttonText: 'Đăng ký',
    },
    {
      title: 'Gói Tiêu Chuẩn',
      price: '50,000 VND',
      features: ['Đăng tối đa 10 bài', 'Hiển thị trong 30 ngày', 'Ưu tiên trung bình'],
      buttonText: 'Đăng ký',
    },
    {
      title: 'Gói Cao Cấp',
      price: '100,000 VND',
      features: ['Đăng không giới hạn', 'Hiển thị trong 60 ngày', 'Ưu tiên cao nhất'],
      buttonText: 'Đăng ký',
    },
  ];

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100" style={{height: 'calc(100vh - 130px)'}}>
      <h1 className="text-3xl font-bold mb-6">Chọn Gói Đăng Bài</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {packages.map((pkg, index) => (
          <PackageCard
            key={index}
            title={pkg.title}
            price={pkg.price}
            features={pkg.features}
            buttonText={pkg.buttonText}
          />
        ))}
      </div>
    </div>
  );
};

export default PackagesScreen;
