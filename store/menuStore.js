import { create } from 'zustand';
export const useMenuStore = create((set) => ({
  isMenuOpen: false,

  // open/close menu
  clickMenu: () => {
    set((state) => ({ isMenuOpen: !state.isMenuOpen }));
  },
  // open menu
  openMenu: () => {
    set((state) => ({ isMenuOpen: true }));
  },
  // close menu
  closeMenu: () => {
    set((state) => ({ isMenuOpen: false }));
  },
}));

useMenuStore.getState();
