import React, { useEffect, useState } from 'react';
import TextEditor from '../../TextEditor';
import styles from '@/styles/Dashboard.module.css';
import axios from 'axios';
import ImgUpload from '../../ImgUpload';
import Image from 'next/image';
import Variant from './Variant';
import { useAlertStore } from '@/store/alertStore';

const EditProduct = ({ setPage, product }) => {
  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);
  // state
  const _id = product._id;
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [tags, setTags] = useState(product.tags);
  const [variants, setVariants] = useState(product.variants);
  const [images, setImages] = useState(product.images);
  const [provider, setProvider] = useState(product.provider);
  const [visible, setVisible] = useState(product.visible);

  const [variantTitle, setVariantTitle] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  // add variant
  const addVariant = (newVariant) => {
    setVariants([...variants, newVariant]);
  };
  // delete variant
  const deleteVariant = (index) => {
    setVariants(variants.filter((v, i) => i != index));
  };
  // set variant
  const setCurrentVariant = (varTitle, isAvailable) => {
    const newVariant = {
      title: varTitle,
      is_available: isAvailable,
    };
    addVariant(newVariant);
  };
  // set images
  const setProductImages = (url) => {
    setImages([
      ...images,
      {
        src: url,
        is_default: true,
      },
    ]);
  };

  // publish product
  // Update
  const updateProduct = async (product, publish) => {
    console.log(variants);
    const Update = {
      _id,
      title,
      description,
      price,
      tags,
      variants,
      images,
      provider,
      visible,
    };
    console.log(Update);
    try {
      await axios.put(`/api/products`, Update).then(() => {
        showAlert('product update', 'success');
        setPage('dash');
        getAllProducts();
      });
    } catch (error) {
      console.log(error);
    }
  };
  //

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(title, desc, content);
    // post();
  };

  return (
    <div className={`container`}>
      <h1>Edit product</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* title */}
        <label>Product title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* desc */}
        <label>tags:</label>
        <span>should be sprated by comma. </span>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value.split(','))}
        />
        <div className={styles.form_special}>
          {/* provider */}
          <div className="flex-column">
            <label htmlFor="">Provider</label>
            <input
              type="text"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            />
          </div>

          {/* publish */}
          <div className="flex-column">
            <label htmlFor="">Publish the product??</label>
            <input
              className="checkbox"
              type="checkbox"
              value={visible}
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
            />
          </div>
          {/* price */}
          <div className="flex-column">
            <label htmlFor="">price:</label>
            <span>
              in USD include cents. examples: 1550 for 15.50$, 690 for 6.90$
            </span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <span>content:</span>
        <TextEditor setContent={setDescription} content={description} />
        {/* VARIANTS */}
        <lable>Options and sizes</lable>
        <span>
          If you have multiple sizes or diffrent options. you can enter ech
          product variation here. If you dont have any variations to your
          product. Fill only the price.
        </span>
        <div className={styles.variants_container}>
          {variants.map((v, index) => {
            const last = variants.length === index + 1;
            return (
              <Variant
                key={index}
                variant={v}
                deleteVariant={deleteVariant}
                index={index}
              />
            );
          })}
          {/* new variant */}
          <div className={styles.create_variant}>
            <h5>new option</h5>
            {/* variant title */}
            <div className="flex-column">
              <label htmlFor="">option title:</label>
              <input
                type="text"
                value={variantTitle}
                onChange={(e) => setVariantTitle(e.target.value)}
              />
            </div>

            {/* is avilable */}
            <div className="flex-column">
              <label htmlFor="">Is the product in stock?</label>
              <input
                className="checkbox"
                type="checkbox"
                value={isAvailable}
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              />
            </div>

            <button
              type="button"
              className="btn block-btn dark"
              onClick={() => setCurrentVariant(variantTitle, isAvailable)}
            >
              Add
            </button>
          </div>
          {/*  */}
        </div>
        {/*  */}
        {/* IMAGES */}
        <ImgUpload
          images={images}
          setImages={setImages}
          text="Upload Pic"
          setProductImages={setProductImages}
        />
        <div className="flex-row">
          {images.map((i) => (
            <div className={styles.product_img} key={i}>
              <Image
                src={i.src}
                alt={i.src}
                fill
                sizes="(max-width: 100rem) 100vw,
              (max-width: 100rem) 50vw,
              33vw"
                priority
              />

              <button
                type="button"
                onClick={() => {
                  setImages(images.filter((img) => img != i));
                }}
                className="btn block-btn bright"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(i);
                }}
                className="btn block-btn dark"
              >
                Copy Url
              </button>
            </div>
          ))}
        </div>
        <button
          type="submit"
          onClick={() => updateProduct()}
          className={`${styles.form_btn}  btn block-btn dark`}
        >
          Save Product
        </button>
      </form>
      <br />
      <button
        className={`  btn block-btn bright`}
        onClick={() => setPage('dash')}
      >
        Back to shop mangmant
      </button>
    </div>
  );
};

export default EditProduct;
