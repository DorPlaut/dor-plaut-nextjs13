import { create } from 'zustand';
import axios from 'axios';

const url = process.env.NEXT_PUBLIC_URL;

export const useCartStore = create((set) => ({
  cart: { userId: '', products: [] },
  // get all posts
  getUserCart: async (id) => {
    try {
      const res = await axios.get(`${url}/api/cart?id=${id}`);
      set({ cart: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  //
}));

// Call getAllPosts to fetch the products data
// usePostsStore.getState().getAllPosts();
