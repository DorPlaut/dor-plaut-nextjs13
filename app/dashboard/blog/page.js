'use client';
import React, { useState } from 'react';
import WritePost from '@/app/components/dashboard/WritePost';
import styles from '@/styles/Dashboard.module.css';
import AllPosts from '@/app/components/dashboard/AllPosts';
import { usePostsStore } from '@/store/PostsStore';
import EditPost from '@/app/components/dashboard/EditPost';
import { useAlertStore } from '@/store/alertStore';

const Blog = () => {
  const [page, setPage] = useState('dash');
  // alerts

  const showAlert = useAlertStore((state) => state.showAlert);

  const getAllPosts = usePostsStore((state) => state.getAllPosts);
  const posts = usePostsStore((state) => state.posts);
  const [post, setPost] = useState(posts[0]);

  return (
    <>
      <div className={styles.dashboard}>
        <h1>Blog Dashboard</h1>
        <div className={styles.blog_nav}>
          <ul>
            <li>
              <button
                className="btn block-btn bright"
                onClick={() => setPage('writeNew')}
              >
                Write new post
              </button>
            </li>
          </ul>
        </div>
        <div>
          {page === 'dash' && (
            <AllPosts
              showAlert={showAlert}
              setPage={setPage}
              setPost={setPost}
            />
          )}
        </div>
        <div>
          {page === 'writeNew' && (
            <WritePost showAlert={showAlert} setPage={setPage} />
          )}
        </div>
        <div>
          {page === 'edit' && (
            <EditPost post={post} showAlert={showAlert} setPage={setPage} />
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
