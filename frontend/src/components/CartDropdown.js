import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../slices/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CartDropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-20">
      <div className="p-4">
        <h2 className="text-lg font-bold">Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-sm">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-2">
                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                <div>
                  <Link to={`/product/${item._id}`} className="text-sm font-semibold text-indigo-600 hover:underline">
                    {item.name}
                  </Link>
                  <p className="text-xs text-gray-600">${item.price} x {item.qty}</p>
                </div>
              </div>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleRemoveFromCart(item._id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} size="sm" />
              </button>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          <Link
          to={`/cart`}
          onClick={onClose}
          className="block w-full text-center py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
        >
          View Cart
        </Link>
        <Link
          to={`/checkout`}
          onClick={onClose}
          className="block w-full text-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500 mt-2"
        >
          Checkout
        </Link>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
