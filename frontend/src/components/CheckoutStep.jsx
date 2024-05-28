// CheckoutSteps.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiTruck, FiCreditCard, FiCheckCircle } from "react-icons/fi"; // Import icons

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-center items-center mb-8">
      <div className="flex items-center">
        {/* Step 1 - Sign In (not shown in the steps) */}
        <div className="flex items-center text-gray-300">
          <FiUser className="w-6 h-6 text-gray-600" />
          <span className="mx-4">→</span>
        </div>
        {/* Step 2 - Shipping */}
        <div
          className={`flex items-center ${
            step1 ? "text-indigo-600" : "text-gray-300"
          }`}
        >
          <Link
            to="/shipping"
            className={`block p-2 rounded-full ${
              step1 ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            <FiTruck
              className={`w-6 h-6 ${step1 ? "text-white" : "text-gray-600"}`}
            />
          </Link>
          <span className="mx-4">{step2 ? "→" : ""}</span>
        </div>
        {/* Step 3 - Payment */}
        <div
          className={`flex items-center ${
            step2 ? "text-indigo-600" : "text-gray-300"
          }`}
        >
          <Link
            to="/payment"
            className={`block p-2 rounded-full ${
              step2 ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            <FiCreditCard
              className={`w-6 h-6 ${step2 ? "text-white" : "text-gray-600"}`}
            />
          </Link>
          <span className="mx-4">{step3 ? "→" : ""}</span>
        </div>
        {/* Step 4 - Place Order */}
        <div
          className={`flex items-center ${
            step3 ? "text-indigo-600" : "text-gray-300"
          }`}
        >
          <div
            className={`block p-2 rounded-full ${
              step3 ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            <FiCheckCircle
              className={`w-6 h-6 ${step3 ? "text-white" : "text-gray-600"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
