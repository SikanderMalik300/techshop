import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Ratings from "../components/Ratings";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Spinner from "../components/Spinner";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [qty, setQuantity] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleIncrement = () => {
    if (qty < product.countInStock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    setShowConfirmation(true);
  };

  const handleKeepShopping = () => {
    setShowConfirmation(false);
    navigate("/");
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  if (!product) {
    return <p className="text-red-500">Product not found</p>;
  }

  return (
    <div className="bg-gray-100 pt-8 pb-20" id="product-details">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-4 md:p-8">
          <div className="w-full md:w-1/2 lg:w-5/12 mb-4 md:mb-0">
            <div className="relative w-full h-96 overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-7/12 md:pl-8">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              {product.name}
            </h3>

            <Ratings
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />

            <p className="text-2xl font-semibold text-indigo-600 mb-4">
              ${product.price}
            </p>

            <div className="flex items-center mb-4">
              <button
                className="px-3 py-2 bg-indigo-600 text-white rounded-md"
                onClick={handleDecrement}
                disabled={qty <= 1}
              >
                -
              </button>
              <span className="text-lg font-semibold mx-2">{qty}</span>
              <button
                className="px-3 py-2 bg-indigo-600 text-white rounded-md"
                onClick={handleIncrement}
                disabled={qty >= product.countInStock}
              >
                +
              </button>
            </div>

            <div className="mb-6 max-w-xl">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                Description:
              </h4>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                Status:
              </h4>
              <p className="text-sm text-gray-600">
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            <button
              className={`bg-indigo-600 text-white px-4 py-2 rounded ${
                product.countInStock === 0
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-indigo-700"
              }`}
              disabled={product.countInStock === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4">Product Added to Cart</h3>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  onClick={handleKeepShopping}
                >
                  Keep Shopping
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={handleViewCart}
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;
