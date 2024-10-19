import useSearchStore from 'src/shared/store/SearchStore';
import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://files.startupranking.com/startup/thumb/20590_0d069efaf0db1a3d0c7441e6e069683b26f27cdf_swap-it_l.png" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Swap It</span>
      </Link>
      <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="data:image/png;base64,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" alt="user photo"/>
          </button>
          <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
              </li>
            </ul>
          </div>
          <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
      </div>

      {/* Search Form */}
      <form className="relative flex-1 max-w-sm mx-4 md:mx-6">   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="search" 
              id="default-search" 
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500" 
              placeholder="Search..." 
              onChange={handleSearch}
               
            />
            <button 
              type="submit" 
              className="absolute right-2.5 bottom-1.5 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg text-sm px-3 py-1 dark:bg-amber-600 dark:hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800"
            >
              Search
            </button>
          </div>
      </form>
      
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link to="/home" className="block py-2 px-3 text-white bg-amber-700 rounded md:bg-transparent md:text-amber-700 md:p-0 md:dark:text-amber-500" aria-current="page">Home</Link>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
          </li>
          <li>
            <Link to="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-700 md:p-0 dark:text-white md:dark:hover:text-amber-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
