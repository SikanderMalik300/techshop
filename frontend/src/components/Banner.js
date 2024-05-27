import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ product }) => {
  return (
    <div className="relative bg-gray-800 text-white py-10 px-4 rounded-lg shadow-lg mb-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-2">Featured Product</h3>
          <h2 className="text-5xl font-bold mb-2">{product.name}</h2>
          <p className="text-2xl mb-4">${product.price}</p>
          <Link
            to={`/product/${product._id}`}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 text-xl"
          >
            Buy Now
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-xs md:max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
