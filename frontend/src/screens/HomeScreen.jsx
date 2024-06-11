import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useGetProductsQuery } from "../slices/productsApiSlice"; // Import the hook
import ProductFilters from "../components/ProductFilters";
import MobileFilters from "../components/MobileFilters";
import ProductList from "../components/ProductList";
import Spinner from "../components/Spinner";

const HomeScreen = () => {
  const { data: products = [], error, isLoading } = useGetProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState(""); // Track sorting order

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);

      // Extract unique categories from products
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, [products]);

  useEffect(() => {
    // Function to apply filters and sorting
    const applyFilters = () => {
      let tempProducts = [...products];

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

      // Filter by selected categories
      if (selectedCategories.length > 0) {
        tempProducts = tempProducts.filter((product) =>
          selectedCategories.includes(product.category)
        );
      }

      // Sort by price
      if (sortOrder === "lowToHigh") {
        tempProducts.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "highToLow") {
        tempProducts.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(tempProducts);
      setCurrentPage(1); // Reset to first page after filtering
    };

    applyFilters();
  }, [searchTerm, priceRange, selectedCategories, sortOrder, products]);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle filters and reset if hiding
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    // Disable scrolling when filters are open
    document.body.style.overflow = showFilters ? "auto" : "hidden";
  };

  // Scroll to top when navigating to new product page
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo(0, 0);
    };
    handleScrollToTop();
  }, [currentPage]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 w-full">
      <div className="container mx-auto px-4 md:px-8 lg:px-8 w-full mt-8">
        <div className="flex flex-col lg:flex-row justify-between mb-6 space-y-6 lg:space-y-0 lg:space-x-6">
          {/* Filters Panel for Large Devices */}
          <ProductFilters
            categories={categories}
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortOrder={sortOrder}
            handleSortChange={handleSortChange}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            toggleFilters={toggleFilters}
          />

          {/* Mobile Filters Button */}
          <div className="lg:hidden flex items-center justify-between w-full mb-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="border p-2 rounded w-full pl-10 pr-4 focus:outline-none focus:ring-2 focus:border-indigo-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
            </div>
            <button
              className="ml-4 bg-indigo-600 text-white p-2 rounded"
              onClick={toggleFilters}
            >
              <FaFilter />
            </button>
          </div>

          {/* Filters Panel for Mobile */}
          {showFilters && (
            <MobileFilters
              categories={categories}
              selectedCategories={selectedCategories}
              handleCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortOrder={sortOrder}
              handleSortChange={handleSortChange}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              toggleFilters={toggleFilters}
            />
          )}

          {/* Products List */}
          {isLoading ? (
            <Spinner />
          ) : (
            <ProductList
              products={filteredProducts}
              error={error}
              currentProducts={currentProducts}
              currentPage={currentPage}
              productsPerPage={productsPerPage}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
