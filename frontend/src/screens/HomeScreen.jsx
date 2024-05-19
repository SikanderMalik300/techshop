import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { Range, getTrackBackground } from "react-range";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const STEP = 10;
  const MIN = 0;
  const MAX = 2000;

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let tempProducts = products;

      // Filter by search term
      if (searchTerm) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by price range
      tempProducts = tempProducts.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      setFilteredProducts(tempProducts);
      setCurrentPage(1); // Reset to first page after filtering
    };

    applyFilters();
  }, [searchTerm, priceRange, products]);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Our Latest Products
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="md:w-1/4 bg-white p-4 rounded-lg shadow-md mb-4 md:mb-0">
            <label className="block text-gray-700 font-semibold mb-2">
              Filter by price:
            </label>
            <Range
              values={priceRange}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={(values) => setPriceRange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-1 w-full rounded-md"
                  style={{
                    background: getTrackBackground({
                      values: priceRange,
                      colors: ["#ccc", "#548BF4", "#ccc"],
                      min: MIN,
                      max: MAX,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-3 h-3 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
              )}
            />
            <div className="flex justify-between mt-2 text-gray-700">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          <div className="md:w-1/3 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search products..."
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div key={product._id} className="w-full sm:w-auto">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <nav className="inline-flex shadow-sm">
            <ul className="flex pl-0 rounded list-none flex-wrap">
              {[
                ...Array(
                  Math.ceil(filteredProducts.length / productsPerPage)
                ).keys(),
              ].map((number) => (
                <li key={number + 1} className="page-item">
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`page-link relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === number + 1
                        ? "text-blue-500"
                        : "text-gray-500"
                    } hover:bg-gray-200`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
