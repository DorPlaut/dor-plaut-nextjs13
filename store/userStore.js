import { create } from 'zustand';
import axios from 'axios';

export const useUserStore = create((set) => ({
  user: {},
  // get all products
  getUser: async (user) => {
    try {
      set({ user: user });
    } catch (err) {
      console.log(err);
    }
  },

  //
}));

// Call getAllPosts to fetch the products data

// useUserStore.getState().getUser();
