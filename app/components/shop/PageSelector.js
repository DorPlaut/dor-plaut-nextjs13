'use client';

import React from 'react';
import styles from '@/styles/Shop.module.css';

const PageSelector = ({ setPage, pages, page }) => {
  //

  return (
    <div className={styles.page_selector}>
      <ul>
        <h4>page:</h4>
        {pages.map((i) => {
          return (
            <li key={i}>
              <button
                style={{
                  textDecoration: page === i && 'underline',
                  color: page === i && 'var(--primaryColor)',
                }}
                className={`${styles.page_btn} btn`}
                onClick={() => setPage(i)}
              >
                {i}
              </button>
            </li>
          );
        })}
      </ul>
      <span>*Showing 6 products per page</span>
    </div>
  );
};

export default PageSelector;
