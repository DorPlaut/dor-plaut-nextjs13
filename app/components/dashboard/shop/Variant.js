import React, { useEffect, useState } from 'react';
import TextEditor from '../../TextEditor';
import styles from '@/styles/Dashboard.module.css';
import axios from 'axios';
import ImgUpload from '../../ImgUpload';
import Image from 'next/image';

const Variant = ({
  setCurrentVariant,
  last,
  deleteVariant,
  index,
  variant,
}) => {
  return (
    <div className={styles.create_variant}>
      <button
        className={`${styles.x_btn} btn block-btn dark flex-row`}
        onClick={() => deleteVariant(index)}
      >
        X
      </button>
      <h5>Option #{index + 1}</h5>
      {/* variant title */}
      <div className="flex-column">
        <span>title : {variant.title}</span>
      </div>
      {/* is avilable */}
      <div className="flex-column">
        <label htmlFor="">Is the product in stock?</label>
        <input
          className="checkbox"
          type="checkbox"
          value={variant.is_available}
          checked={variant.is_available}
        />
      </div>
    </div>
  );
};

export default Variant;
