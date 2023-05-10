import React from 'react';
import ImageGallery from 'react-image-gallery';

function ImagesGallery({ photos, showThumbnails }) {
  const images = photos.map((i) => {
    return { original: i, thumbnail: i };
  });
  return (
    <ImageGallery
      items={images}
      showThumbnails={showThumbnails}
      showPlayButton={showThumbnails}
      autoPlay
    />
  );
}

export default ImagesGallery;
