import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ratings from "../components/Ratings";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Spinner from "../components/Spinner"; // Import Spinner component

const ProductScreen = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleIncrement = () => {
    if (quantity < product.countInStock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Implement your logic to add the selected quantity of items to the cart
    // For now, let's just log the selected quantity
    console.log("Added to cart:", quantity);
  };

  if (isLoading) {
    // Return the Spinner component while loading
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="bg-gray-100 pt-8 pb-20" id="product-details">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-4 md:p-8">
          {/* Product Image Section */}
          <div className="w-full md:w-1/2 lg:w-5/12 mb-4 md:mb-0">
            <div className="relative w-full h-96 overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-1/2 lg:w-7/12 md:pl-8">
            {/* Product Name */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              {product.name}
            </h3>

            {/* Product Ratings */}
            <Ratings
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />

            {/* Product Price */}
            <p className="text-2xl font-semibold text-indigo-600 mb-4">
              ${product.price}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center mb-4">
              <button
                className="px-3 py-2 bg-indigo-600 text-white rounded-md"
                onClick={handleDecrement}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="text-lg font-semibold mx-2">{quantity}</span>
              <button
                className="px-3 py-2 bg-indigo-600 text-white rounded-md"
                onClick={handleIncrement}
                disabled={quantity >= product.countInStock}
              >
                +
              </button>
            </div>

            {/* Product Description */}
            <div className="mb-6 max-w-xl">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                Description:
              </h4>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>

            {/* Product Status */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                Status:
              </h4>
              <p className="text-sm text-gray-600">
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            {/* Add to Cart Button */}
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
      </div>
    </div>
  );
};

export default ProductScreen;
