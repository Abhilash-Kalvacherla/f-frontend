import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from '../components/ImageCard';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploader, setUploader] = useState("");
  const [uploading, setUploading] = useState(false);

  // Get backend URL from environment variable
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/gallery`);
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !uploader) return;

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('uploader', uploader);

    setUploading(true);
    try {
      await axios.post(`${API_URL}/api/gallery/upload`, formData);
      fetchImages();
      setSelectedFile(null);
      setUploader("");
    } catch (err) {
      alert("Upload failed.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="gallery-container">
      <h2>Family Gallery</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Your Name"
          value={uploader}
          onChange={(e) => setUploader(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          required
        />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      <div className="image-grid">
        {images.map((img) => (
          <ImageCard key={img._id} image={img} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
