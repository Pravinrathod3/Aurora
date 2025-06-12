import React, { useState, useEffect } from 'react';
import {  Star, Heart, ChevronsRight, ChevronsLeft, ArrowRight } from 'lucide-react';
import { databases } from "../../appwriteConfig";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function LandingPage() {

  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [heroProducts, setHeroProducts] = useState([]);
  const [exploreProducts, setExploreProducts] = useState([]);

  const scrollRef = useRef();

   const scroll = (offset) => {
   scrollRef.current.scrollLeft += offset;
  };

  const recentlyViewed = [
    { id: 13, name: "Sunset Glow", price: "$90", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=300&h=300&fit=crop" },
    { id: 14, name: "Spring Garden", price: "$78", image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=300&h=300&fit=crop" },
  ];

  useEffect(() =>{
    async function getProducts() {
          try {
            const response = await databases.listDocuments(
              "67d6825c0010e3f2e721",
              "67d6826a00049d166fed",
            );

            const products = response.documents;


            const shuffled = [...products].sort(() => 0.5 - Math.random());
            setBestSellingProducts(shuffled.slice(0, 10));

            
            setExploreProducts(shuffled.slice(10, 18));

            setHeroProducts(shuffled.slice(0, 3));


          } catch (error) {
            console.error(error);
          }
        }
        getProducts();
  }, []);


  return (
   
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">


<section className="relative py-20 overflow-hidden bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 items-center gap-8">
    
    {/* Left section */}
    <div className="text-center md:text-left">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        Discover Your
        <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Signature Scent
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto md:mx-0">
        Explore our curated collection of luxury perfumes crafted with the finest ingredients from around the world.
      </p>
      <button 
      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto md:mx-0"
      onClick={() => window.location.href = "/App"
      }
      >
        <span>Shop Now</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>

    {/* Right section image */}
    <div className="relative">
      <img
        src="https://img.freepik.com/free-vector/tiny-women-with-huge-perfume-bottle-flat-vector-illustration-girls-creating-new-fragrance-flower-deodorant-adding-cinnamon-orange-scent-good-body-smell-aromatherapy-cosmetic-concept_74855-23229.jpg?uid=R154467872&ga=GA1.1.622978408.1735654898&semt=ais_hybrid&w=740"
        alt="Hero Perfume"
        className=" inset-0 w-full h-full object-cover mix-blend-overlay "
      />
    </div>
  </div>

  {/* Background floating elements */}
  <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-50 animate-pulse"></div>
  <div className="absolute bottom-20 right-5 w-32 h-32 bg-pink-200 rounded-full opacity-30 animate-pulse delay-1000"></div>

  
</section>

      {/*Best Selling Products Section*/}
      <section className="py-16 bg-white/50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Best Selling Products</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
    </div>

    <div className="flex items-center gap-4">
      <ChevronsLeft className="size-30 text-gray-600 cursor-pointer hover:text-purple-600 transition" onClick={() => scroll(-300)} />
      
      <div
        ref={scrollRef}
        className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] snap-x snap-mandatory py-4 gap-6"
      >
        {bestSellingProducts?.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[280px] snap-center">
            <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105 bg-white">
              <div
                className="w-full h-60 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${product.imageid})` }}
              >
                <Link to={`/product/${product.$id}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end text-white">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-sm text-gray-200">{product.category}</p>
                  <p className="text-md font-semibold">${product.price}</p>
                </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChevronsRight className="size-30 text-gray-600 cursor-pointer hover:text-purple-600 transition" onClick={() => scroll(300)} />
    </div>

    <a href="/App" className="text-purple-600 font-bold text-2xl text-end hover:underline block mt-6">
      <p>more...</p>
    </a>
  </div>
</section>

      {/* Explore Our Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Products</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreProducts.map((product) => (
                <div
                  key={product.$id}
                  className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105 bg-white"
                >
          
                  <div
                    className="w-full h-60 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${product.imageid})` }}
                  >
                  
                    <Link to={`/product/${product.$id}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end text-white">
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p className="text-sm text-gray-200">{product.category}</p>
                        <p className="text-md font-semibold">${product.price}</p>
                      </div>
                    </Link>

                
                    
                  </div>

                  
                </div>
              ))}
          </div>
          <a href="/App" className="text-purple-600 font-bold text-2xl text-end hover:underline block mt-6">
                 <p>more...</p>
          </a>
        </div>
      </section>

  
  

    </div>
  );
}