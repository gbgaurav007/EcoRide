import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../ApiBaseURL';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";

const Navbar = ({ userData, onLogout }) => {
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

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}users/logout`, {
        headers: {Authorization: `Bearer ${Cookies.get("accessToken")}`},
        method: 'POST',
        credentials: 'include',

      });

      if (response.ok) {
        alert('Logged out successfully');
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        onLogout();
      } else {
        const data = await response.json();
        alert(`Logout failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred while logging out.');
    }
  };

  if(userData){
    var username = userData.name;
    var name = username.charAt(0).toUpperCase() + username.slice(1);
  }
  

  return (
    <nav className="bg-white p-4 flex justify-between fixed top-0 w-full z-10">

      <div className="flex">
        <Link to="/" className="flex">
          <img src="assets/logo.png" alt="Logo" className="h-12 w-12 ml-5 mr-1" />
          <h5 className="text-cyan-800 text-3xl font-bold mt-1 hidden md:flex">coRide</h5>
        </Link>
      </div>

      <div className="flex items-center">

        <Link
          to="/search"
          className="flex text-emerald-800 hover:text-emerald-600 mr-6 text-lg items-center"
        >
          <FontAwesomeIcon icon={faSearch} className="text-xl" />
          <span className="hidden md:flex ml-2">Search</span>
        </Link>

        <Link
          to="/offer"
          className="flex text-emerald-800 hover:text-emerald-600 mr-6 text-lg items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="text-xl" />
          <span className="hidden md:flex ml-2">Offer a Ride</span>
        </Link>

        {userData ? (
          <div className="relative navbar-dropdown">
            <button
              onClick={toggleDropdown}
              className="text-emerald-800 hover:text-emerald-600 mr-8 focus:outline-none"
            >
              <FontAwesomeIcon icon={faUser} className="text-3xl" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-2 mt-2 bg-white border border-gray-200 rounded shadow-md w-36">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-center hover:bg-gray-100"
                  >
                    {name}'s Profile
                  </Link>
                  <Link
                    to="/myrides"
                    className="block px-4 py-2 text-center hover:bg-gray-100"
                  >
                    My Rides
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center px-4 py-2 font-semibold text-emerald-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/account"
            className="flex text-emerald-800 hover:text-emerald-600 mr-6 text-lg items-center"
          >
            <FontAwesomeIcon icon={faUser} className="text-3xl" />
          </Link>
        )}
      </div>
    </nav >
  );
};

export default Navbar;