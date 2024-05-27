import React from "react";
import ProductCard from "../components/ProductCard";

const ProductList = ({
  products,
  isLoading,
  error,
  currentProducts,
  currentPage,
  productsPerPage,
  paginate,
}) => {
  // Calculate total pages for pagination
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="w-full lg:w-3/4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {currentProducts.length === 0 && (
          <div className="col-span-3 text-center">No products found</div>
        )}
      </div>

      {/* Pagination */}
      {products.length > currentProducts.length && (
        <div className="flex justify-center mt-4">
          <nav className="block">
            <ul className="flex pl-0 rounded list-none flex-wrap">
              {/* Previous Button */}
              <li key="previous">
                <button
                  className={`relative block py-2 px-3 leading-tight text-indigo-600 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
                    currentPage === 1 ? "pointer-events-none text-gray-400" : ""
                  }`}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {/* Pagination Buttons */}
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    className={`relative block py-2 px-3 leading-tight ${
                      currentPage === index + 1
                        ? "text-white bg-indigo-600"
                        : "text-indigo-600 bg-white"
                    } border border-gray-200 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              {/* Next Button */}
              <li key="next">
                <button
                  className={`relative block py-2 px-3 leading-tight text-indigo-600 border border-gray-200 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
                    currentPage === totalPages
                      ? "pointer-events-none text-gray-400"
                      : ""
                  }`}
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProductList;
