import React from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

const ProductCard = ({ product }) => {
  const { name, image, price } = product;

  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-600">
        <img alt="" src={image} className="w-full h-50 object-cover" />
        <div className="p-4">
          <h5
            className="font-bold mb-2 overflow-ellipsis"
            style={{ height: "2.5em" }}
          >
            {name}
          </h5>
          <div className="flex items-center mt-2">
            <Ratings value={product.rating} />
            <span className="text-gray-600 text-sm ml-2">
              {product.numReviews} Reviews
            </span>
          </div>
          <p className="text-gray-700 text-lg">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
