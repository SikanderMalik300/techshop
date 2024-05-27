import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaBars, FaAngleDown, FaAngleUp } from "react-icons/fa";
import Logo from "../assets/logo1.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartDropdown from "./CartDropdown";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const closeCartDropdown = () => {
      if (window.innerWidth >= 768) {
        setCartOpen(false);
      }
    };

    window.addEventListener("click", closeCartDropdown);
    return () => window.removeEventListener("click", closeCartDropdown);
  }, []);

  useEffect(() => {
    // Close dropdown when location changes to '/'
    if (location.pathname === "/") {
      setDropdownOpen(false);
    }
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setCartOpen(false);
    setDropdownOpen(false); // Close dropdown when opening mobile menu
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
    setDropdownOpen(false); // Close dropdown when opening cart
  };

  const openCart = () => {
    if (window.innerWidth < 768) {
      navigate("/cart");
      setMobileMenuOpen(false);
    } else {
      toggleCart();
    }
  };

  const openSignIn = () => {
    navigate("/signin");
    setMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-white border-b w-full md:static md:text-sm md:border-none">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link to={`/`}>
            <img src={Logo} width={160} height={80} alt="Float UI logo" />
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={toggleMobileMenu}
            >
              <FaBars className="inline text-lg" />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul
            className="justify-end items-center space-y-3 md:flex md:space-x-6 md:space-y-0"
            onClick={(e) => e.stopPropagation()} // Prevent closing the menu when clicking inside
          >
            <li className="relative">
              <button
                className="block py-2 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none"
                onClick={openCart}
              >
                <FaShoppingCart className="inline text-lg mr-1" />
                {cartItems.length > 0 && (
                  <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </button>
              {isCartOpen && (
                <CartDropdown onClose={() => setCartOpen(false)} />
              )}
            </li>
            <li>
              {userInfo ? (
                <div className="relative">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <span className="font-medium text-gray-700">
                      {userInfo.name}
                    </span>
                    {isDropdownOpen ? (
                      <FaAngleUp className="inline text-lg ml-1" />
                    ) : (
                      <FaAngleDown className="inline text-lg ml-1" />
                    )}
                  </div>
                  {isDropdownOpen && (
                    <ul className="absolute mt-2 w-36 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 mr-8">
                      <li>
                        <button
                          className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left"
                          onClick={() => navigate("/profile")}
                        >
                          View Profile
                        </button>
                      </li>
                      <li>
                        <button
                          className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                      {/* Add more dropdown items as needed */}
                    </ul>
                  )}
                </div>
              ) : (
                <div
                  className="block py-2 px-3 font-medium text-center cursor-pointer text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline"
                  onClick={openSignIn}
                >
                  Sign in
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
