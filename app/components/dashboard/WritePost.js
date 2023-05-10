import React, { useEffect, useState } from 'react';
import TextEditor from '../TextEditor';
import styles from '@/styles/Dashboard.module.css';
import axios from 'axios';
import ImgUpload from '../ImgUpload';
import Image from 'next/image';

const WritePost = ({ showAlert, setPage }) => {
  const [title, setTitle] = useState('Post title');
  const [description, setDescription] = useState('Post description');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('post');
  const [publish, setPublish] = useState(true);

  // rest post
  const reset = () => {
    setTitle('Post title');
    setDescription('Post description');
    setContent('');
    setImages([]);
  };

  // post post
  const post = async () => {
    try {
      await axios
        .post(`/api/post`, {
          title,
          description,
          content,
          images,
          category,
          publish,
        })
        .then(() => {
          console.log('send post');
          showAlert('Post publishd successfully');
          setPage('dash');
        });
    } catch (err) {
      console.log(err);
      showAlert("There's a problem. make sure you filled all field");
    }
  };
  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(title, desc, content);
    post();
  };

  // get the content of the editor
  // useEffect(() => {
  //   console.log(content);
  // }, [content]);

  return (
    <div className={`container`}>
      <h1>Write post</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* title */}
        <span>Title:</span>
        <input
          type="text"
          placeholder={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* desc */}
        <span>Description:</span>
        <input
          type="text"
          placeholder={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* category */}
        <input
          type="text"
          placeholder={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <span>content:</span>
        <TextEditor setContent={setContent} content={content} />
        <ImgUpload images={images} setImages={setImages} text="Upload Pic" />
        <button
          type="submit"
          className={`${styles.form_btn}  btn block-btn dark`}
        >
          Publish post
        </button>
      </form>
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
                setPhotos(images.filter((img) => img != i));
              }}
              className="btn block-btn bright"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(i);
                showAlert('Image URL copied to clipboard');
              }}
              className="btn block-btn dark"
            >
              Copy Url
            </button>
          </div>
        ))}
      </div>

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

export default WritePost;
