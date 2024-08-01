import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (event.target.closest('.navbar-dropdown') === null) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <nav className="bg-white p-4 flex justify-between fixed top-0 w-full z-10">
      <div className="flex">
        <Link to="/" className="flex">
          <img src="logo.png" alt="Logo" className="h-12 w-12 ml-5 mr-1" />
          <h5 className="text-cyan-800 text-3xl font-bold mt-1 hidden md:flex">coRide</h5>
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/search" className="flex text-emerald-800 hover:text-emerald-600 mr-6 text-lg items-center">
          <FontAwesomeIcon icon={faSearch} className="text-xl" /><span className="hidden md:flex ml-2">Search</span>
        </Link>
        <Link to="/offer" className=" flex text-emerald-800 hover:text-emerald-600 mr-6 text-lg items-center">
          <FontAwesomeIcon icon={faPlus} className="text-xl" /><span className="hidden md:flex ml-2">Offer a Ride</span>
        </Link>

        <div className="relative navbar-dropdown">
          <button onClick={toggleDropdown} className="text-emerald-800 hover:text-emerald-600 mr-8 focus:outline-none">
            <FontAwesomeIcon icon={faUser} className="text-3xl" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-md">
              <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">Login/Signup</Link>
              <Link to="/myrides" className="block px-4 py-2 hover:bg-gray-100">My Rides</Link>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
