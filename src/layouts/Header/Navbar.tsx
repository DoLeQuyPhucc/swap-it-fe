import useSearchStore from "src/shared/store/SearchStore";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/img/logo.png";
import { ArrowUpToLine } from "lucide-react";

const Navbar: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const userImage = localStorage.getItem("userImage");

  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const user = localStorage.getItem("user");

  const NO_AVT =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-bmqm7mCI2OBNsFo6PDo9QD3NPzXnpn9vA&s";
  const user_image = user ? JSON.parse(user).image_user : NO_AVT;

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (location.pathname !== "/home") {
        navigate("/home");
      }
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const links = document.querySelectorAll(".nav-link");

    // Remove "active" class from other links
    links.forEach((item) => item.classList.remove("active"));
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
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/auth");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 right-0 left-0 z-10 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse rounded-lg"
        >
          <img src={Logo} className="h-8" alt="Flowbite Logo" />
          <span
            className="self-center text-2xl font-bold whitespace-nowrap dark:text-white text-amber-700"
            style={{ transform: "translate(0, -8%)", letterSpacing: "1px" }}
          >
            Swap it
          </span>
        </Link>

        <div
          className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3"
          style={{ width: "36%" }}
        >
          {/* Search bar */}
          <input
            type="text"
            onChange={handleSearch}
            onKeyDown={handleSearchKeyPress}
            placeholder="Tìm kiếm sản phẩm..."
            className="p-2 border rounded-lg focus:ring-2 focus:border-amber-300 focus:ring-amber-500 focus:outline-none dark:bg-gray-800"
            style={{ width: "100%" }}
          />

          <a
            className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-700 rounded-lg"
            href="/products/create"
          >
            <ArrowUpToLine className="w-6 h-6" />
          </a>
          {user ? (
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 w-8"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={user_image}
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
          ) : (
            <Link
              to="/auth"
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
              style={{ width: "156px" }}
            >
              Đăng nhập
            </Link>
          )}

          {/* Avatar with Dropdown */}
        </div>

        {/* Navbar Links */}
        <div className="hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/home"
                onClick={handleLinkClick}
                className="active nav-link block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white"
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
