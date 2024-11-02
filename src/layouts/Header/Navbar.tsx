import useSearchStore from "src/shared/store/SearchStore";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (location.pathname !== '/home') {
        navigate('/home');
      }
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const links = document.querySelectorAll(".nav-link");

    // Remove "active" class from other links
    links.forEach((item) =>
      item.classList.remove("active")
    );
    links.forEach((item) =>
      item.classList.add(
        "hover:bg-gray-100",
        "md:hover:bg-transparent",
        "md:hover:text-amber-700",
        "md:p-0",
        "dark:text-white",
        "md:dark:hover:text-amber-500",
        "dark:hover:bg-gray-700",
        "dark:hover:text-white",
        "md:dark:hover:bg-transparent",
        "dark:border-gray-700"
      )
    );

    // Add "active" class to clicked link
    (event.target as HTMLElement).classList.add("active");
  };

  const logout = () => {
    localStorage.removeItem("userId");  
    localStorage.removeItem("userRole");
    navigate("/auth");
  }


  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 right-0 left-0 z-10 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://files.startupranking.com/startup/thumb/20590_0d069efaf0db1a3d0c7441e6e069683b26f27cdf_swap-it_l.png"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Swap It
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse" style={{width: '30%'}}>
          {/* Search bar */}
          <input
            type="text"
            onChange={handleSearch}
            onKeyDown={handleSearchKeyPress}
            placeholder="Tìm kiếm sản phẩm..."
            className="p-2 border rounded-lg mr-4 focus:ring-2 focus:border-amber-300 focus:ring-amber-500 focus:outline-none dark:bg-gray-800"
            style={{width: '100%'}}
          />

          {/* Avatar with Dropdown */}
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1730477642~exp=1730481242~hmac=299984a54341bf9def944d5f6e169501e5c206f083c7ba29f8780946145be263&w=740"
                alt="User avatar"
              />
            </button>
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 dark:bg-gray-800 z-10 shadow-md"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Thông tin cá nhân
                </Link>
                <Link
                  to="/products/myProduct"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Quản lí sản phẩm của tôi
                </Link>
                <Link
                  to="/transactions"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Quản lí giao dịch của tôi
                </Link>
                <Link
                  to="/package"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Quản lí gói đăng bài
                </Link>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Cài đặt
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  onClick={logout}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navbar Links */}
        <div className="hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/home"
                onClick={handleLinkClick}
                className="nav-link block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={handleLinkClick}
                className="nav-link block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white"
              >
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className="nav-link block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
