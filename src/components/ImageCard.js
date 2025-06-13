import React from 'react';

const ImageCard = ({ image }) => {
  return (
    <div className="image-card">
      <img src={image.url} alt="Uploaded" />
      <p><strong>Uploader:</strong> {image.uploader}</p>
      <p><small>{new Date(image.date).toLocaleString()}</small></p>
    </div>
  );
};

export default ImageCard;
