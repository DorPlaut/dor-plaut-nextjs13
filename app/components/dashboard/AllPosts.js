import React from 'react';
import { usePostsStore } from '@/store/PostsStore';
import styles from '@/styles/Dashboard.module.css';
import axios from 'axios';
import Image from 'next/image';

const AllPosts = ({ showAlert, setPage, setPost }) => {
  const posts = usePostsStore((state) => state.posts);

  //   delete post
  const deletePost = async (id) => {
    console.log('delete');
    try {
      await axios.delete(`../../api/post`, { data: { id: id } }).then(() => {
        showAlert('Post deleted successfully');
        // setPage('dash');
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.post_container}>
      {posts.map((post, index) => {
        return (
          <div className={`${styles.post} flex-column`} key={index}>
            <h3>{post.title}</h3>
            <h4>{post.description}</h4>
            <div className={styles.product_img}>
              {post.images.length > 0 ? (
                <Image
                  src={post.images[0]}
                  alt={post.images[0]}
                  fill
                  sizes="(max-width: 100rem) 100vw,
              (max-width: 100rem) 50vw,
              33vw"
                  priority
                />
              ) : (
                ''
              )}
            </div>
            <div className={styles.btn_container}>
              <button
                className="btn block-btn dark"
                onClick={() => {
                  setPage('edit');
                  setPost(post);
                }}
              >
                ערוך כתבה
              </button>
              <button
                className="btn block-btn dark"
                onClick={() => deletePost(post._id)}
              >
                מחק כתבה
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllPosts;
