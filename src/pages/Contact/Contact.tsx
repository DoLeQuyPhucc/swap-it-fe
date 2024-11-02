import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageCircle, Facebook, Instagram, Linkedin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const contactInfo = {
    email: 'support@swapit.com',
    phone: '+84 (028) 3824 1515',
    address: 'Lô E2a-7, Đường D1, Khu Công Nghệ Cao, Phường Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh',
    socialMedia: {
      facebook: 'https://www.facebook.com/SwapIt.FPT',
      instagram: 'https://instagram.com/swapit_official',
      linkedin: 'https://linkedin.com/company/swapit'
    },
    socialIcons: {
      facebook: <Facebook className="mr-3 text-amber-500" />,
      instagram: <Instagram className="mr-3 text-amber-500" />,
      linkedin: <Linkedin className="mr-3 text-amber-500" />
    } as Record<string, JSX.Element>
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Temporary submit handler - replace with actual form submission logic
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Liên Hệ Với SwapIt
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <MessageCircle className="mr-3 text-blue-500" /> Gửi Tin Nhắn
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Họ và Tên
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập họ và tên"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Số Điện Thoại
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Nội Dung Tin Nhắn
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập nội dung tin nhắn..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                <Send className="mr-2" /> Gửi Tin Nhắn
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Thông Tin Liên Hệ
            </h2>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <Mail className="text-blue-500 w-5 h-5" />
              <div>
                <h3 className="font-semibold text-gray-700">Email</h3>
                <p className="text-gray-600">{contactInfo.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4">
              <Phone className="text-green-500 w-5 h-5" />
              <div>
                <h3 className="font-semibold text-gray-700">Điện Thoại</h3>
                <p className="text-gray-600">{contactInfo.phone}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center space-x-4">
              <MapPin className="text-red-500 w-8 h-8" />
              <div>
                <h3 className="font-semibold text-gray-700">Địa Chỉ</h3>
                <p className="text-gray-600">{contactInfo.address}</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-4">Kết Nối Với Chúng Tôi</h3>
              <div className="flex space-x-2">
                {Object.entries(contactInfo.socialMedia).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition duration-300"
                  >
                    {contactInfo.socialIcons[platform]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;