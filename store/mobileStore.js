import { create } from 'zustand';
export const useMobileStore = create((set) => ({
  isMobile: false,
  setIsMobile: () => {
    if (typeof window !== 'undefined') {
      set({ isMobile: window.innerWidth < 768 });
      window.addEventListener('resize', () => {
        set({ isMobile: window.innerWidth < 768 });
      });
    }
  },
}));

// Call setIsMobile to set the initial value and add event listener for resize
useMobileStore.getState().setIsMobile();
