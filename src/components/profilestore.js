import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],
      toggleWishlist: (id) =>
        set((state) => {
          const isInWishlist = state.wishlist.includes(id)
          return {
            wishlist: isInWishlist
              ? state.wishlist.filter((item) => item !== id)
              : [...state.wishlist, id],
          }
        }),
    }),
    {
      name: 'wishlist-storage', // 👈 key in localStorage
    }
  )
)

export default useWishlistStore
