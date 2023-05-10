import React, { useEffect, useState } from 'react';
import TextEditor from '../TextEditor';
import styles from '@/styles/Dashboard.module.css';
import axios from 'axios';
import ImgUpload from '../ImgUpload';
import Image from 'next/image';
import { useAlertStore } from '@/store/alertStore';

const EditPost = ({ post, setPage }) => {
  const { _id } = post;
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [content, setContent] = useState(post.content);
  const [images, setImages] = useState(post.images);
  const [category, setCategory] = useState(post.category);
  const [publish, setPublish] = useState(true);
  // alerts
  const showAlert = useAlertStore((state) => state.showAlert);

  // rest post
  const reset = () => {
    setTitle('Post title');
    setDescription('Post description');
    setContent('');
    setImages([]);
  };

  // update post info
  const updatePost = async () => {
    try {
      await axios
        .put(`/api/post`, {
          _id,
          title,
          description,
          content,
          images,
          category,
          publish,
        })
        .then((res) => {
          showAlert('Post updated successfully', 'success');
          setPage('dash');
        });
    } catch (err) {
      console.log(err);
    }
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    updatePost();
  };

  return (
    <div className={`container`}>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* title */}
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* desc */}
        <label>{`Description (optional):`}</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.form_special}>
          <div className="flex-column">
            {/* category */}
            <label htmlFor="">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="flex-column">
            {/* publish */}
            <label htmlFor="">Publish the post?</label>
            <input
              className="checkbox"
              type="checkbox"
              value={publish}
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
            />
          </div>
        </div>

        <span>content:</span>
        <TextEditor setContent={setContent} content={content} />
        <ImgUpload images={images} setImages={setImages} text="Upload Pic" />
        <div className="flex-row">
          {images.map((i) => (
            <div className={styles.product_img} key={i}>
              <Image
                src={i}
                alt={i}
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
                className="btn block-btn dark"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(i);
                  showAlert('Image URL copied to clipboard');
                }}
                className="btn block-btn bright"
              >
                Copy Url
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className={`${styles.form_btn}  btn block-btn dark`}
        >
          Update Post
        </button>
      </form>

      <br />
      <button
        className={`  btn block-btn bright`}
        onClick={() => setPage('dash')}
      >
        Back to all posts
      </button>
    </div>
  );
};

export default EditPost;
