import {create} from 'zustand' ;

const cartstore = create((set) => ({

    cartitems: [],
    addtocart: (items) => set((state) => {
        const existingItem = state.cartitems.find(item => item.id === items.id);
        if (existingItem) {
            return {
                cartitems: state.cartitems.map(item =>
                    item.id === items.id
                        ? { ...item, quantity: item.quantity + items.quantity }
                        : item
                )
            };
        } else {
            return { cartitems: [...state.cartitems, items] };
            console.log("Item added to cart:", items);
        }
    }),

    deleteitem: (id) => set((state) => ({
        cartitems: state.cartitems.filter((item) => item.id !== id)
    })),

    deletecart: () => set(() => ({
        cartitems: []
    })),

    incrementQuantity: (id) => set((state) => ({
        cartitems: state.cartitems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
    })),

    decrementQuantity: (id) => set((state) => ({
        cartitems: state.cartitems.map((item) => 
            item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1 } : item
        )
    }))

    

}))

export default cartstore;