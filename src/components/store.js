import { create } from 'zustand'

const usestore = create((set) => ({
  // State
  cartopen : false,

  tooglecart: () => set((state) => ({
    cartopen: !state.cartopen
  })),

  opencart: () => set(() => ({
      cartopen: true
  })),

  closecart: () => set(() => ({
      cartopen: false
  })),

  setcartopen: (value) => set((state) => {
    if (state.cartopen === value) return state;
    return { cartopen: value };
  }),
  


}));

export default usestore;