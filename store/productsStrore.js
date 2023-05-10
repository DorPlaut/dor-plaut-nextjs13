import { create } from 'zustand';
import axios from 'axios';

const url = process.env.NEXT_PUBLIC_URL;

export const useProductsStore = create((set) => ({
  products: [],
  // get all products
  getAllProducts: async () => {
    try {
      const res = await axios.get(`${url}/api/products`);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  // get public products
  getPublicProducts: async () => {
    try {
      const res = await axios.get(`${url}/api/products`);
      set({
        products: res.data.filter(
          (product, index) => product.visible && product.is_locked === false
        ),
      });
    } catch (err) {
      console.log(err);
    }
  },
  // filter by tags
  filterByTags: (tags) => {
    set((state) => ({
      products: state.products.filter((i) =>
        i.tags.some((item) => tags.includes(item))
      ),
    }));
  },

  // sort products
  sortProducts: (sortBy, sortOrder) => {
    set((state) => ({
      products: state.products.sort((a, b) => {
        let compareResult;
        if (sortBy === 'price') {
          compareResult = a.variants[0].price - b.variants[0].price;
        } else if (sortBy === 'date') {
          compareResult = new Date(b.created_at) - new Date(a.created_at);
        }
        // Apply sort order
        return sortOrder === 'desc' ? -compareResult : compareResult;
      }),
    }));
  },
  //
}));

// if (!useProductsStore.products) {
//   // Call getAllPosts to fetch the products data
//   useProductsStore.getState().getPublicProducts();
// }
useProductsStore.getState();
