import { create } from 'zustand';
import axios from 'axios';

const url = process.env.NEXT_PUBLIC_URL;

export const usePostsStore = create((set) => ({
  posts: [],
  // get all posts
  getAllPosts: async () => {
    try {
      const res = await axios.get(`${url}/api/post`);
      set({ posts: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  // get public posts
  getBlogPosts: async () => {
    try {
      const res = await axios.get(`${url}/api/post`);
      set({
        posts: res.data.filter((post, index) => post.category === 'blog'),
      });
    } catch (err) {
      console.log(err);
    }
  },

  sortPosts: (sortBy, sortOrder) => {
    set((state) => {
      const sortedPosts = state.posts.slice().sort((a, b) => {
        let compareResult;
        if (sortBy === 'price') {
          compareResult = a.variants[0].price - b.variants[0].price;
        } else if (sortBy === 'date') {
          compareResult = new Date(b.createdAt) - new Date(a.createdAt);
        }
        // Apply sort order
        return sortOrder === 'desc' ? -compareResult : compareResult;
      });
      return { posts: sortedPosts };
    });
  },
}));

usePostsStore.getState();

// if (!usePostsStore.posts) {
//   // Call getAllPosts to fetch the products data
//   usePostsStore.getState().getAllPosts();
// }
