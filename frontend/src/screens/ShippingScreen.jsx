import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutStep";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (shippingAddress) {
      setAddress(shippingAddress.address || "");
      setCity(shippingAddress.city || "");
      setPostalCode(shippingAddress.postalCode || "");
      setCountry(shippingAddress.country || "");
    }
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, [shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-8">
        <CheckoutSteps step1 step2={false} step3={false} step4={false} />
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 md:p-8 mx-auto max-w-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Shipping Address
          </h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:border-indigo-600"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:border-indigo-600"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="postalCode"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:border-indigo-600"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:border-indigo-600"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingScreen;
