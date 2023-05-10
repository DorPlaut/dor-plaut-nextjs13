import React from 'react';
// css
import styles from '@/styles/Section.module.css';

// libreries
import parse from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';

import { useMobileStore } from '@/store/mobileStore';

function ShortPost(props) {
  const isMobile = useMobileStore((state) => state.isMobile);
  // phrase props
  const { _id, title, description, content, images, createdAt } = props.post;
  const { black, isMini } = props;
  const limited = content.substring(0, 400) + '...';
  const miniLimitied = content.substring(0, 150) + '...';

  return (
    <div
      className={`${black ? styles.black : styles.blue} ${
        styles.content_text
      } ${styles.short_post} container fade-in`}
      style={{ animationDelay: `${props.index / 5}s` }}
    >
      <div>
        <div className={styles.content}>
          <div className={styles.title}>
            <h1>{title}</h1>
            <h2>{description}</h2>
            <span className={styles.date}>
              {new Date(createdAt).toLocaleDateString('en-US', {
                dateStyle: 'medium',
              })}
            </span>
          </div>
          {isMini ? parse(miniLimitied) : parse(limited)}

          <div className={styles.short_post_img_container}>
            {images.map((img, index) => {
              if (index < (isMobile ? 2 : 4)) {
                return (
                  <div
                    key={index}
                    className={styles.short_post_img}
                    style={{
                      transform: `translateX(${index * 8}rem)`,
                    }}
                  >
                    <Image
                      src={img}
                      alt={img}
                      fill
                      sizes="(max-width: 100rem) 100vw,
              (max-width: 100rem) 50vw,
              33vw"
                    />
                  </div>
                );
              }
            })}
          </div>

          <div className={styles.post_btn_container}>
            <Link href={`/blog/${_id}`} passHref legacyBehavior>
              <button className="block-btn btn bright">{'Read more..'}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortPost;
