import create from 'zustand';

export const useCartMenuStore = create((set) => ({
  isCartOpen: false,

  // open/close cart
  clickCart: () => {
    set((state) => ({ isCartOpen: !state.isCartOpen }));
  },
  //   // open cart
  openCart: () => {
    set((state) => ({ isCartOpen: true }));
  },
  //   // close cart
  closeCart: () => {
    set((state) => ({ isCartOpen: false }));
  },
}));

useCartMenuStore.getState();
