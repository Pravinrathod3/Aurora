import React , {useState, useEffect} from 'react'
import { databases, ID } from "../../appwriteConfig";
import { useParams } from 'react-router-dom';
import { Star, Truck, RefreshCcw, Heart } from 'lucide-react';
import usestore from '@/components/store';
import cartstore from '@/components/cartstatestore';


function Productdetailpage() {

   const [quantity, setQuantity] = useState(1);
   const [Products, setProducts] = useState(null);

  const opencart = usestore((state) => state.opencart);

  const {addtocart} = cartstore((state) => state);

    const { id } = useParams();

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
    const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }   
    }

    const handleclick = () => {
      const producttoadd = {
        id: id,
        product: Products,
        quantity: quantity,
      };

      addtocart(producttoadd);
      setQuantity(1);
      opencart();
    }


  useEffect(() => {
    async function getProducts() {
      try {
        const response = await databases.getDocument(
          "67d6825c0010e3f2e721",
          "67d6826a00049d166fed",
          id
        );
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, [id]);



  return (
    <div className="max-w-6xl mx-auto p-4">
    <div className="flex flex-col md:flex-row gap-8">
      {/* Product Image */}
      <div className="w-full max-h-150 md:w-1/2 bg-gray-50 p-8 rounded-lg flex items-center justify-center">
        <img 
          src={Products?.imageid} 
          alt={Products?.name}
          className="max-w-full h-full object-contain"
        />
      </div>
      
    {/* Product Details */}
        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-2">{Products?.name}</h1>
            <div className="px-3 py-1 border rounded-lg bg-indigo-700 text-white">{Products?.category}</div>
          </div>
          
          
          {/* Price */}
        <div className="text-xl font-bold mb-4">{Products?.price}</div>
        
        {/* Description */}
        <p className="text-gray-600 mb-6">
            {Products?.description}
        </p>
        
        <div className="border-t border-gray-200 pt-4 mb-6"></div>
        
        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center border border-gray-300 rounded">
            <button 
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              onClick={decrementQuantity}
            >
              -
            </button>
            <div className="w-10 text-center">{quantity}</div>
            <button 
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
          
          <button className="bg-red-500 text-white px-8 py-2 rounded hover:bg-red-600 flex-grow" onClick={handleclick}>
            Buy Now
          </button>
          
          <button className="border border-gray-300 p-2 rounded hover:bg-gray-50">
            <Heart size={20} />
          </button>
        </div>
        
        {/* Shipping Info */}
        <div className="space-y-4">
          <div className="border border-gray-200 rounded p-4 flex items-start gap-4">
            <div className="text-gray-600">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-medium">Free Delivery</h3>
              <p className="text-sm text-gray-500">Enter your postal code for Delivery Availability</p>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded p-4 flex items-start gap-4">
            <div className="text-gray-600">
              <RefreshCcw size={24} />
            </div>
            <div>
              <h3 className="font-medium">Return Delivery</h3>
              <p className="text-sm text-gray-500">Free 30 Days Delivery Returns. <span className="text-blue-500">Details</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Productdetailpage