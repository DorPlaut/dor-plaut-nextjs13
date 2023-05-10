import React, { useEffect } from 'react';
import { usePostsStore } from '@/store/PostsStore';
import styles from '@/styles/Shop.module.css';

function BlogMenu() {
  const sortPosts = usePostsStore((state) => state.sortPosts);

  return (
    <div>
      <li>
        <span>Date Added :</span>
        <button
          className="btn text-btn"
          onClick={() => {
            sortPosts('date', 'desc');
          }}
        >
          Old
        </button>
        /
        <button
          className="btn text-btn"
          onClick={() => {
            sortPosts('date', 'asc');
          }}
        >
          New
        </button>
      </li>
    </div>
  );
}

export default BlogMenu;
