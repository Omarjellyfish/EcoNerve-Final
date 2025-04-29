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
    <div className="image-classifier-page">
      <div className="model-info">
        <h2>About This Model</h2>
        <p>
          This recycling classification model was developed by a passionate team of environmental enthusiasts. 
          Its goal is to promote better recycling habits by making it easier to recognize and sort waste properly.
        </p>
        <p>
          The model was trained on a dataset of over <strong>10,000 images</strong> across multiple categories like plastic, paper, metal, glass, and organic waste.
        </p>
        <p>
        The system utilizes a ResNet50-based Convolutional Neural Network (CNN), achieving 96.8% accuracy, significantly improving classification performance
        </p>
        <p>
          Through continuous learning and updates, we aim to improve the model's accuracy and encourage sustainable living worldwide.
        </p>
      </div>

      <div className="classifier-section">
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
    </div>
  );
};

export default ImageClassifier;
