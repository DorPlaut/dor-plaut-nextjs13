import React from 'react';
// css
import styles from '@/styles/Section.module.css';

// libreries
import parse from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';

function FullPost(props) {
  // phrase props
  const { _id, title, description, content, images, createdAt } = props.post;
  const { black } = props;
  //   const limited = content.substring(0, 400) + '...';
  return (
    <div
      className={`${black ? styles.black : styles.blue} ${
        styles.content_text
      } ${styles.full_post} container fade-in`}
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

          {parse(content)}
        </div>
      </div>
    </div>
  );
}

export default FullPost;
