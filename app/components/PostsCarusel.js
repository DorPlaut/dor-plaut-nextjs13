'use client';

import React, { useEffect, useState } from 'react';
import Carousel from 'nuka-carousel';
import Product from './shop/product/PrintifyProduct';
import { useMobileStore } from '@/store/mobileStore';
import { usePostsStore } from '@/store/PostsStore';
import ShortPost from './blog/ShortPost';
import LoadScreen from './LoadScreen';
import Link from 'next/link';

function PostsCarusel({}) {
  //   state
  const posts = usePostsStore((state) => state.posts);
  const getBlogPosts = usePostsStore((state) => state.getBlogPosts);
  const isMobile = useMobileStore((state) => state.isMobile);
  // setProducts
  useEffect(() => {
    if (posts.length === 0) getBlogPosts();
  }, []);

  return (
    <>
      <Link href={'/blog'} scroll={false}>
        <button className="btn block-btn bright float">Go to the Blog</button>
      </Link>
      <Carousel
        className="carusel"
        autoplay
        autoplayInterval={4000}
        wrapAround={true}
        slidesToShow={isMobile ? 1 : 2}
        defaultControlsConfig={{
          nextButtonText: '>',
          prevButtonText: '<',
          nextButtonStyle: {
            borderRadius: '50%',
            height: '3rem',
            width: '3rem',
            transform: 'translateX(1.5rem)',
          },
          prevButtonStyle: {
            borderRadius: '50%',
            height: '3rem',
            width: '3rem',
            transform: 'translateX(-1.5rem)',
          },
          pagingDotsStyle: {
            display: 'none',
          },
        }}
      >
        {posts.length > 1 ? (
          posts.map((post, index) => {
            return (
              <div key={index} className="carusel-object">
                <ShortPost
                  isMini={true}
                  post={post}
                  index={index}
                  black={index % 2 === 0 ? true : false}
                />
              </div>
            );
          })
        ) : (
          <LoadScreen />
        )}
      </Carousel>
    </>
  );
}

export default PostsCarusel;
