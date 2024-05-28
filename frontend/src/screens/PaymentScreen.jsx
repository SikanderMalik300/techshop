import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutStep";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, [shippingAddress, navigate]);

  const [payment, setPayment] = useState(paymentMethod || "PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    navigate("/placeorder");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-8">
        <CheckoutSteps step1 step2 step3={false} step4={false} />
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 md:p-8 mx-auto max-w-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Payment Method
          </h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Select Payment Method
              </label>
              <select
                id="paymentMethod"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:border-indigo-600"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                required
              >
                <option value="PayPal">PayPal</option>
                <option value="CreditCard">Credit Card</option>
              </select>
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

export default PaymentScreen;
