import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../assets/logo1.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [state, setState] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

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
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              <li>
                <Link to={`/cart`}>
                  <div className="block py-2 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none">
                    <FaShoppingCart className="inline text-lg mr-1" />
                    {cartItems.length > 0 && (
                      <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
              <li>
                <Link to={`/signin`}>
                  <div className="block py-2 px-3 font-medium text-center cursor-pointer text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline">
                    Sign in
                  </div>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
