import React from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

const ProductCard = ({ product }) => {
  const { name, image, price, rating, numReviews } = product;

  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <img alt={name} src={image} className="w-full h-50 object-cover" />
        <div className="p-4">
          <h5 className="font-semibold text-gray-800 text-lg mb-2 truncate">
            {name}
          </h5>
          <div className="flex items-center mb-2">
            <Ratings value={rating} />
            <span className="text-gray-600 text-sm ml-2">
              {numReviews} Reviews
            </span>
          </div>
          <p className="text-gray-700 text-xl font-bold">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
