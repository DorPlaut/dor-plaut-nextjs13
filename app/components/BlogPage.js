'use client';

import React, { useEffect, useState } from 'react';
import { usePostsStore } from '@/store/PostsStore';
import styles from '@/styles/Section.module.css';
import MainSection from './MainSection';
import TitlesSection from './TitlesSection';
import LoadScreen from './LoadScreen';
import ShortPost from './blog/ShortPost';
import BlogMenu from './blog/BlogMenu';

const BlogPage = () => {
  //   state
  const posts = usePostsStore((state) => state.posts);
  const getBlogPosts = usePostsStore((state) => state.getBlogPosts);

  useEffect(() => {
    if (posts.length === 0) getBlogPosts();
  }, []);

  return (
    <>
      <div className={styles.shop}>
        <TitlesSection>
          <div className={`flex-column fade-in `}>
            <div className={styles.info}>
              <BlogMenu />
            </div>
          </div>
        </TitlesSection>
        <MainSection>
          {posts.length > 0 ? (
            posts.map((post, index) => {
              return (
                <ShortPost
                  key={index}
                  index={index}
                  post={post}
                  black={index % 2 === 0 ? true : false}
                  isMini={false}
                />
              );
            })
          ) : (
            <LoadScreen />
          )}
        </MainSection>
      </div>
    </>
  );
};

export default BlogPage;
