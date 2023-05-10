'use client';

import React, { useEffect, useState } from 'react';
import { usePostsStore } from '@/store/PostsStore';
import styles from '@/styles/Section.module.css';
import MainSection from '@/app/components/MainSection';
import TitlesSection from '@/app/components/TitlesSection';
import LoadScreen from '@/app/components/LoadScreen';
import { useParams } from 'next/navigation';
import FullPost from '@/app/components/blog/FullPost';
import Link from 'next/link';

const Shop = () => {
  const router = useParams();
  const postId = router.id;
  const [post, setPost] = useState('');

  // pages
  //   state
  const posts = usePostsStore((state) => state.posts);
  const getBlogPosts = usePostsStore((state) => state.getBlogPosts);

  // get posts
  useEffect(() => {
    if (posts.length === 0) {
      getBlogPosts();
    }
  }, []);

  //   filter posts
  useEffect(() => {
    if (posts) {
      const selectedPost = posts.find((i) => i._id === postId);
      if (selectedPost) {
        setPost(selectedPost);
      }
    }
  }, [postId, posts]);

  return (
    <>
      <div className={styles.shop}>
        <TitlesSection>
          <div
            className={`${styles.post_route_container}   flex-column fade-in`}
          >
            <div className={styles.post_route}>
              <span>
                <Link href={'/blog'}>
                  <button className="btn text-btn ">Blog</button>
                </Link>{' '}
                {` -> `}{' '}
                <Link href={`/blog/${post._id}`}>
                  <button className="btn text-btn ">{post.title}</button>
                </Link>
              </span>
              {/* <br />
                  <button className="btn block-btn bright">
                    Go Back to the blog
                  </button> */}
            </div>
          </div>
        </TitlesSection>
        <MainSection>
          {post ? <FullPost post={post} /> : <LoadScreen />}
        </MainSection>
      </div>
    </>
  );
};

export default Shop;
