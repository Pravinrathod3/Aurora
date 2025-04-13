import React, { useState, useEffect } from "react";
import { databases } from "../../appwriteConfig";
import { useSearch } from "./Context/SearchContextProvider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const { search } = useSearch();
  const [gender, setgender] = useState("All");
  const [rate, setrate] = useState([0, 1000]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await databases.listDocuments(
          "67d6825c0010e3f2e721",
          "67d6826a00049d166fed"
        );
        setProducts(response.documents);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row p-6">
        {/* Filter Sidebar */}
        <motion.div
          className="bg-gray-100 text-black p-4 rounded-lg shadow-lg h-fit lg:w-1/4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold">Filter</h2>
          <p className="text-sm text-gray-600">Customize your search.</p>
          <div className="mt-4">
            {/* Add your filters here */}
            <div className="mb-4">
              <label className="font-medium">Gender</label>
              <div className="flex flex-col mt-2 gap-1">
                {["All", "Men's Perfume", "Women's Perfume", "Unisex Perfume"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                        type = "radio"
                        name = "gender"
                        value = {item}
                        checked = {gender === item}
                        onChange = {(e) => setgender(e.target.value)}
                      />
                    {item}


                   </label> 

                   
                ))}
              </div>

              
              <label className="block font-medium mb-1 mt-5">Price Range</label>
               <input
                 type="range"
                 min="0"
                 max="1000"
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

                const genderFilter = gender === "All" ||  item.category.toLowerCase() == gender.toLowerCase();
                    
                const priceFilter = item.price >= rate[0] && item.price <= rate[1];

                return searchterm && genderFilter && priceFilter;
              })
              .map((product) => (
                <motion.div
                  key={product.$id}
                  className="bg-gray-100 shadow-md rounded-lg p-4 hover:shadow-xl transition"
                  whileHover={{ scale: 1.05 }}
                >
                  <Link to={`/product/${product.$id}`}>
                    <img
                      src={product.imageid}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                    <p className="text-gray-600">{product.category}</p>
                    <p className="text-gray-800 font-medium">${product.price}</p>
                  </Link>
                  <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
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
