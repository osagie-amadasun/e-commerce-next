import { CartStoreActionsType, cartStoreStateType } from '@/types'
import { create } from 'zustand'

const useStore = create<cartStoreStateType & CartStoreActionsType>()((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (product) => set((state) => ({})),
  clearCart: () => 
}))