import { useState } from "react";
import { motion } from "framer-motion";
import { X, Check, ChevronUp, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const CartDrawer = ({ open, setopen }) => {
  const [quantities, setQuantities] = useState({
    "pizza-oven": 1,
    "grill-bundle": 1,
    "starters": 1,
    "charcoal-pack": 1
  });

  const updateQuantity = (item, change) => {
    setQuantities(prev => ({
      ...prev,
      [item]: Math.max(1, prev[item] + change)
    }));
  };

  return (
    <Sheet open={open} onOpenChange={setopen} >
      <SheetContent side="right" className=" w-1/2">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>
            View and manage items in your cart.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col justify-between items-center ">
          {/* Cart items would be mapped here */}
          <div className="flex flex-col space-y-4">
              <div className="flex flex-row space-x-10">
                <h2>Product</h2>

                <h2>Price</h2>

                <h2>Quantity</h2>

                <h2>SubTotal</h2>
              </div>
              <div className="flex flex-row space-x-10">
                  <img src="example.jpeg" alt="product" className="w-18 h-20" />
                  <h3>₹50</h3>
                  <div className="flex flex-row space-x-3">
                    <h3>1</h3>
                    <div className="flex flex-col">
                      <button><ChevronUp /></button>
                      <button><ChevronDown /></button>
                    </div>
                    
                  </div>
                  <h2>₹50</h2>
              </div>
          </div>

          {/*Cart Total*/}
          <div className="flex flex-col space-y-4 mt-10 border-2 h-full w-3/4 p-4">
             <div className="font-medium text-2xl">Cart Total</div>
             <div className="flex flex-row justify-between">
              <p>Subtotal</p>
              <p>₹50</p>
             </div>
              <div className="flex flex-row justify-between">
                <p>Shipping</p>
                <p>₹50</p>
              </div>  
              <div className="flex flex-row justify-between">
                <p>Total</p>
                <p>₹50</p>
              </div>  
              
          </div>

        </div>

        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button variant="outline">Continue Shopping</Button>
          </SheetClose>
          <Button className="bg-black hover:bg-gray-800">Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;