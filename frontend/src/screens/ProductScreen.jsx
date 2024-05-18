import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Ratings from "../components/Ratings";
import axios from "axios";

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  const [quantity, setQuantity] = useState(1);

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

  return (
    <div className="bg-white border-b md:border-none pt-8 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 lg:w-5/12 mb-4 md:mb-0 shadow-md">
            <img src={product.image} alt={product.name} className="w-full" />
          </div>
          <div className="w-full md:w-1/2 lg:w-7/12 px-4">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              {product.name}
            </h3>
            <Ratings
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <p className="text-lg mb-4">
              Price: <span className="text-blue-500">${product.price}</span>
            </p>
            <div className="flex items-center mb-4">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="text-lg font-semibold mr-2">{quantity}</span>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
                onClick={handleIncrement}
                disabled={quantity >= product.countInStock}
              >
                +
              </button>
            </div>
            <div className="mb-4 max-w-xl">
              <h4 className="text-lg font-semibold mb-2">Description:</h4>
              <p className="text-sm">{product.description}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Status:</h4>
              <p className="text-sm">
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded ${
                product.countInStock === 0
                  ? "cursor-not-allowed opacity-50"
                  : ""
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
