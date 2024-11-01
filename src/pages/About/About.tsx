import React from 'react';
import { BookOpen, Shirt, Zap, Recycle, Users, Target } from 'lucide-react';

const AboutPage = () => {
  const visionPoints = [
    {
      icon: <Recycle className="w-12 h-12 text-green-500" />,
      title: "Bảo Vệ Môi Trường",
      description: "Góp phần giảm thiểu rác thải, tăng vòng đời sử dụng của sản phẩm"
    },
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Cộng Đồng Chia Sẻ",
      description: "Xây dựng nền tảng trao đổi, kết nối người dùng một cách dễ dàng và hiệu quả"
    },
    {
      icon: <Target className="w-12 h-12 text-purple-500" />,
      title: "Tiết Kiệm Chi Phí",
      description: "Hỗ trợ người dùng tìm kiếm và trao đổi sản phẩm với chi phí tối ưu"
    }
  ];

  const productFocus = [
    {
      icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
      title: "Sách"
    },
    {
      icon: <Shirt className="w-8 h-8 text-pink-500" />,
      title: "Quần Áo"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Đồ Điện Tử"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            SwapIt - Nền Tảng Trao Đổi Thông Minh
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Kết nối, chia sẻ và tái sử dụng - Vì một cộng đồng bền vững hơn
          </p>
        </div>

        {/* Vision Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Tầm Nhìn Của Chúng Tôi
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {visionPoints.map((point, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  {point.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Target Audience */}
        <section className="mb-16 bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Đối Tượng Mục Tiêu
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Nhân Khẩu Học
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Độ tuổi: 18 - 25 tuổi</li>
                <li>Giới tính: Nam và nữ</li>
                <li>Thu nhập: Sinh viên, thu nhập thấp</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Sở Thích & Thói Quen
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Quan tâm đến môi trường</li>
                <li>Thích mua sắm online</li>
                <li>Sử dụng thành thạo mạng xã hội</li>
                <li>Tìm kiếm trải nghiệm tiện lợi</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Product Focus */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Sản Phẩm Trao Đổi
          </h2>
          <div className="flex justify-center space-x-8">
            {productFocus.map((product, index) => (
              <div key={index} className="text-center">
                <div className="bg-white shadow-md rounded-full p-4 inline-block mb-4">
                  {product.icon}
                </div>
                <p className="text-lg font-semibold text-gray-700">
                  {product.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Future Goals */}
        <section className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Mục Tiêu Năm Đầu Tiên
          </h2>
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4 list-disc list-inside text-gray-700 text-lg">
              <li>Xây dựng cộng đồng 10.000 người đam mê sách và quần áo</li>
              <li>Thiết lập quan hệ đối tác với nhà sách, nhà xuất bản</li>
              <li>Tổ chức 2 sự kiện khuyến khích đọc sách</li>
              <li>Tổ chức sự kiện về tác hại của thời trang nhanh</li>
              <li>Mở rộng trao đổi sang các lĩnh vực mới như điện tử, gia dụng</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;