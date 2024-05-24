import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateCartItemQty } from "../slices/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CartScreen = () => {
  const dispatch = useDispatch();
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (id, qty, countInStock) => {
    if (qty < countInStock) {
      dispatch(updateCartItemQty({ id, qty: qty + 1 }));
    }
  };

  const handleDecrement = (id, qty) => {
    if (qty > 1) {
      dispatch(updateCartItemQty({ id, qty: qty - 1 }));
    }
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg">
          Your cart is empty.{" "}
          <Link to="/" className="text-indigo-600">
            Go back
          </Link>
        </p>
      ) : (
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="md:w-2/3">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-start justify-between border-b py-4"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-lg font-semibold text-indigo-600 hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-600">${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={() => handleDecrement(item._id, item.qty)}
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold mx-2">
                        {item.qty}
                      </span>
                      <button
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={() =>
                          handleIncrement(item._id, item.qty, item.countInStock)
                        }
                        disabled={item.qty >= item.countInStock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 flex items-center justify-center"
                  onClick={() => handleRemoveFromCart(item._id)}
                  style={{ minWidth: "40px", minHeight: "40px" }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </button>
              </div>
            ))}
          </div>
          <div className="md:w-1/3 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between py-2">
              <span>Items Price:</span>
              <span>${itemsPrice}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Shipping Price:</span>
              <span>${shippingPrice}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Tax Price:</span>
              <span>${taxPrice}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total Price:</span>
              <span>${totalPrice}</span>
            </div>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded mt-4 w-full hover:bg-indigo-700"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;