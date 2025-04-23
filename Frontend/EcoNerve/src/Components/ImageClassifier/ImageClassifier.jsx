import React, { useState } from 'react';
import axios from 'axios';
import './ImageClassifier.css';

const ImageClassifier = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setPrediction('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setPrediction(response.data.prediction || 'No prediction received');
    } catch (error) {
      console.error('Error uploading image:', error);
      setPrediction('Error during prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-classifier-container">
      <h2>Upload an Image for Classification</h2>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Classify</button>
      </form>

      {preview && (
        <div>
          <img src={preview} alt="Preview" className="image-preview" />
        </div>
      )}

      {loading && <p className="loading-text">Loading...</p>}

      {prediction && (
        <div className="prediction-result">
          Prediction: {prediction}
        </div>
      )}
    </div>
  );
};

export default ImageClassifier;
