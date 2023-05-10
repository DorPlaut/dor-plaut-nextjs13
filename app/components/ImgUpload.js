import React, { useEffect, useRef } from 'react';

function ImgUpload({ images, setImages, setProductImages }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_UPLOAD_PRESET_PROFILE,
        cropping: 'true',
        croppingCoordinatesMode: 'custom',
      },
      (error, result) => {
        if (result.event === 'success') {
          setProductImages
            ? setProductImages(result.info.secure_url)
            : setImages((images) => [...images, result.info.secure_url]);
        }
      }
    );
  }, [images, setImages]);
  return (
    <>
      {' '}
      <br />
      <button
        className="btn block-btn dark"
        onClick={(event) => {
          event.preventDefault();
          widgetRef.current.open();
        }}
      >
        Upload Image
      </button>
      <br />
    </>
  );
}

export default ImgUpload;
