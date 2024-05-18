import React from "react";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white border-b w-full md:static md:text-sm md:border-none">
      <div className="px-4 max-w-screen-xl mx-auto md:px-8">
        <h1 className="text-2xl md:text-3xl text-center mt-5 mb-4 pb-4">
          Our Latest Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="w-full sm:w-auto">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
