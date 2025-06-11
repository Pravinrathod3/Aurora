import React, { useState, useEffect } from "react";
import { databases } from "../../appwriteConfig";
import { useSearch } from "./Context/SearchContextProvider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Query } from "appwrite";
import { Heart } from "lucide-react";
import usestore from "@/components/store";
import cartstore from "@/components/cartstatestore";

function Home() {
  const [products, setProducts] = useState([]);
  const { search } = useSearch();
  const [gender, setgender] = useState("All");
  const [rate, setrate] = useState([0, 200]);
  const { opencart } = usestore();
  const {addtocart} = cartstore((state) => state);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await databases.listDocuments(
          "67d6825c0010e3f2e721",
          "67d6826a00049d166fed",
          [Query.limit(100)]
        );
        setProducts(response.documents);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, []);


  const handleclick = (id) => {
    const producttoadd = {
      id: id,
      product: products.find((item) => item.$id === id),
      quantity: 1,
    };
    opencart();
    addtocart(producttoadd);
  }

  return (
    <div className="w-screen min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row p-6">
        {/* Filter Sidebar */}
        <motion.div
          className="bg-white text-black p-4 rounded-lg shadow-lg h-fit lg:w-1/4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold">Filter</h2>
          <p className="text-sm text-gray-600">Customize your search.</p>
          <div className="mt-4">
            {/* Gender Filter */}
            <div className="mb-4">
              <label className="font-medium">Gender</label>
              <div className="flex flex-col mt-2 gap-1">
                {["All", "Men's Perfume", "Women's Perfume", "Unisex Perfume"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value={item}
                      checked={gender === item}
                      onChange={(e) => setgender(e.target.value)}
                    />
                    {item}
                  </label>
                ))}
              </div>

              {/* Price Filter */}
              <label className="block font-medium mb-1 mt-5">Price Range</label>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={rate[1]}
                onChange={(e) => setrate([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">
                $0 - ${rate[1]}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product Listing */}
        <motion.div
          className="flex-1 bg-white text-black p-6 rounded-lg shadow-lg"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-center mb-6">Product Listing</h1>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter((item) => {
                const searchterm =
                  search === "" || (
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.category.toLowerCase().includes(search.toLowerCase()) ||
                    item.description.toLowerCase().includes(search.toLowerCase())
                  );

                const genderFilter = gender === "All" || item.category.toLowerCase() === gender.toLowerCase();
                const priceFilter = item.price >= rate[0] && item.price <= rate[1];

                return searchterm && genderFilter && priceFilter;
              })
              .map((product) => (
                <motion.div
                  key={product.$id}
                  className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105 bg-white"
                >
                  {/* Image + Link */}
                  <div
                    className="w-full h-60 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${product.imageid})` }}
                  >
                    {/* Text overlay */}
                    <Link to={`/product/${product.$id}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end text-white">
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p className="text-sm text-gray-200">{product.category}</p>
                        <p className="text-md font-semibold">${product.price}</p>
                      </div>
                    </Link>

                    {/* Heart Icon */}
                    <button
                    
                      className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full p-2 transition"
                     
                    >
                    
                      <Heart
                        className={`w-5 h-5 ${
                           "text-red-500" 
                        }`}
                      />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-blue-500 text-white py-2 font-medium hover:bg-blue-600 transition " onClick={() => handleclick(product.$id)}>
                    Add to Cart
                  </button>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
