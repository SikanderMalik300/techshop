import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutStep";
import { clearCartItems } from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { toast } from "react-toastify";

const OrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/myorder/${res._id}`);
    } catch (error) {
      toast.error(error.message || "Failed to place order. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-8">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 md:p-8 mx-auto max-w-lg">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Order Summary
          </h2>
          {cart.cartItems.length === 0 ? (
            <div className="text-gray-600 text-lg p-4">
              Your cart is empty. Please add items to place an order.
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
                <p>{cart.shippingAddress.address}</p>
                <p>{`${cart.shippingAddress.city}, ${cart.shippingAddress.postalCode}`}</p>
                <p>{cart.shippingAddress.country}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
                <p>{cart.paymentMethod}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Order Items</h3>
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                      />
                    </div>
                    <div className="flex-1 ml-4">
                      <h4 className="text-lg font-semibold">{item.name}</h4>
                      <p>
                        {item.quantity} x ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Price Details</h3>
                <div className="flex justify-between">
                  <p>Items Price</p>
                  <p>${cart.itemsPrice}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tax</p>
                  <p>${cart.taxPrice}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>${cart.shippingPrice}</p>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>${cart.totalPrice}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={placeOrderHandler}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "Placing Order..." : "Place Order"}
              </button>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error.message}</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
