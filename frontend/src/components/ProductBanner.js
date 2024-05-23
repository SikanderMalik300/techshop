// src/components/ProductBanner.js
import React from 'react';

const ProductBanner = ({ latestProducts }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {latestProducts.map((product, index) => (
          <div key={product.id} className={`p-4 ${index % 2 === 0 ? 'md:border-r' : ''}`}>
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">${product.price}</p>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded">
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBanner;
