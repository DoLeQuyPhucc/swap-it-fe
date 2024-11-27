import { Spinner } from '../../components/SpinnerLoading/SpinnerLoading';
import PackageCard from '../../components/PackageCard/PackageCard';
import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

const PackagesScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async (packageDetails: any) => {
    setIsLoading(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
      if (!userId) throw new Error('User not authenticated.');

      const paymentData = {
        orderCode: Math.floor(Math.random() * 1000000), // Random order code
        amount: parseFloat(packageDetails.price.replace(/[^0-9]/g, '')),
        description: `Payment for ${packageDetails.title}`.slice(0, 25), // Limit description to 25 characters
        returnUrl: window.location.origin + '/payment-success',
        cancelUrl: window.location.origin + '/payment-cancel',
      };

      // Initialize payment
      const response = await axiosInstance.post('/payos/payment-link', paymentData);

      if (response.data.success) {
        // Redirect to payment URL
        window.location.href = response.data.data.checkoutUrl;

        // Post payment success data
        await axiosInstance.post('/payments', {
          payment_method: 'PayOS',
          amount: paymentData.amount,
          payment_status: 'Success',
          user_id: userId,
        });
      } else {
        setError('Payment initialization failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const packages = [
    {
      title: 'Gói Cơ Bản',
      price: 'Miễn Phí',
      features: ['Đăng tối đa 3 bài', 'Hiển thị trong 7 ngày', 'Không hỗ trợ ưu tiên'],
      buttonText: 'Đang áp dụng',
    },
    {
      title: 'Gói Tiêu Chuẩn',
      price: '69000',
      features: ['Đăng tối đa 10 bài', 'Hiển thị trong 30 ngày', 'Ưu tiên trung bình'],
      buttonText: 'Đăng ký',
    },
    {
      title: 'Gói Cao Cấp',
      price: '179000',
      features: ['Đăng không giới hạn', 'Hiển thị trong 60 ngày', 'Ưu tiên cao nhất'],
      buttonText: 'Đăng ký',
    },
  ];

  if (isLoading) {
    return (
      <div className="py-10 px-6 flex items-center justify-center text-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100" style={{ height: 'calc(100vh - 130px)' }}>
      <h1 className="text-3xl font-bold mb-6">Chọn Gói Đăng Bài</h1>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl">
        {packages.map((pkg, index) => (
          <PackageCard
            key={index}
            {...pkg}
            onSelect={() => pkg.price !== 'Miễn Phí' && handlePayment(pkg)}
          />
        ))}
      </div>
    </div>
  );
};

export default PackagesScreen;
