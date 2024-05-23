// MobileFilters.js
import React from "react";
import { Range, getTrackBackground } from "react-range";
import { FaTimes } from "react-icons/fa";

const MobileFilters = ({
  categories,
  selectedCategories,
  handleCategoryChange,
  priceRange,
  setPriceRange,
  sortOrder,
  handleSortChange,
  toggleFilters,
}) => {
  const STEP = 10;
  const MIN = 0;
  const MAX = 2000;

  return (
    <div className="fixed top-[-10px] right-0 w-full h-full bg-white shadow-lg z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out">
      <div className="p-4">
        <button
          className="absolute top-4 right-4 text-gray-600 text-2xl"
          onClick={toggleFilters}
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          {categories.map((category) => (
            <div key={category} className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="ml-2">{category}</span>
              </label>
            </div>
          ))}
        </div>

        {/* Price Range */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Filter By Price
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
                    colors: ["#ccc", "#4F46E5", "#ccc"],
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
                className="w-3 h-3 bg-indigo-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
            )}
          />
          <div className="flex justify-between mt-2 text-gray-700">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Sort Options */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Sort By Price</h2>
          <div className="flex space-x-2">
            <button
              className={`py-1 px-1 rounded-lg border ${
                sortOrder === "lowToHigh"
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => handleSortChange("lowToHigh")}
            >
              Low to High
            </button>
            <button
              className={`py-1 px-2 rounded-lg border ${
                sortOrder === "highToLow"
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => handleSortChange("highToLow")}
            >
              High to Low
            </button>
            <button
              className={`py-2 px-4 rounded-lg border ${
                !sortOrder
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => handleSortChange("")}
            >
              Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilters;
