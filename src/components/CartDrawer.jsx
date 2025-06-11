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
import { X, Check, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import usestore from "./store";
import cartstore from "./cartstatestore";
import { useState } from "react";

const CartDrawer = () => {
  const cartopen = usestore((state) => state.cartopen);
  const setcartopen = usestore((state) => state.setcartopen);

 const cartitems = cartstore((state) => state.cartitems);
 const deleteitem = cartstore((state) => state.deleteitem);
 const deletecart = cartstore((state) => state.deletecart);
 const incrementQuantity = cartstore((state) => state.incrementQuantity);
 const decrementQuantity = cartstore((state) => state.decrementQuantity);

  const handleincrement = (id) => {
    incrementQuantity(id);
  }

  var total = 0;

  const totalamount = cartitems.map((item) =>{
    total = total + (item.quantity * item.product.price).toFixed(2)

    return total;
   }
  )

  var subtotal = total + 50;

  const handledecrement = (id) => {
    if(cartitems.find(item => item.id === id).quantity > 1){
      decrementQuantity(id);
    }
    else {
      handledelete(id);
    }
    
  }

  const handledelete = (id) => {
    deleteitem(id);
  }


  return (
    <Sheet open={cartopen} onOpenChange={(open) => setcartopen(open)}>
      <SheetContent side="right" className="w-1/2">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetDescription>View and manage items in your cart.</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col justify-between items-center h-full">
          <div className="h-78 overflow-y-auto w-full flex flex-col space-y-4 p-4 border-2 border-gray-200 rounded-lg">
            <div className="flex flex-row justify-around font-semibold">
              <h2>Product</h2>
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2>Subtotal</h2>
            </div>

            {cartitems?.length > 0 ? (
              cartitems.map((cartItem) =>{

                const product = cartItem.product;
                

                return(
                
                  <div
                    key={cartItem.id}
                    className="flex flex-row justify-around items-center"
                  >
                    <img
                      src={product.imageid}
                      alt={product.name}
                      className="w-16 h-20 object-cover"
                    />
                    <h3>₹{product.price}</h3>
                    <div className="flex flex-row space-x-3">
                    <h3>{cartItem.quantity}</h3>
                    <div className="flex flex-col">
                      <button onClick={() => handleincrement(cartItem.id)}><ChevronUp /></button>
                      <button onClick={() => handledecrement(cartItem.id)}><ChevronDown /></button>
                    </div>
                    <h3>₹{(cartItem.quantity * product.price).toFixed(2)}</h3>

                    
                  </div>
                  </div>
                )
              }
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <p className="text-gray-500">Add items to your cart to see them here.</p>
              </div>
            )}
          </div>

          {/*Cart Total*/}
          <div className="flex flex-col space-y-4 mt-10 border-2 h-auto w-3/4 p-4">
             <div className="font-medium text-2xl">Cart Total</div>
             <div className="flex flex-row justify-between">
              <p>Subtotal</p>
              <p>₹{totalamount}</p>
             </div>
              <div className="flex flex-row justify-between">
                <p>Shipping</p>
                <p>₹50</p>
              </div>  
              <div className="flex flex-row justify-between">
                <p>Total</p>
                <p>₹{subtotal}</p>
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
