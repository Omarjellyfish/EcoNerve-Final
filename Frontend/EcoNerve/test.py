from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.resnet50 import preprocess_input
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load trained model
model = load_model("resnet50_model.h5")

# Original class labels from model
class_labels = {
    0: 'battery',
    1: 'cardboard',
    2: 'clothes',
    3: 'glass',
    4: 'metal',
    5: 'paper',
    6: 'plastic',
    7: 'shoes'
}

# Indices that should be mapped to "other"
map_to_other = {0, 1, 2, 7}

# Preprocess image for ResNet50
def preprocess_image(image_path):
    img = Image.open(image_path).convert("RGB")
    img_resized = img.resize((224, 224))
    img_array = np.array(img_resized)
    img_array = preprocess_input(img_array)
    return np.expand_dims(img_array, axis=0)

# Predict the class of the image
def predict_image(image_path):
    preprocessed_img = preprocess_image(image_path)
    prediction = model.predict(preprocessed_img)[0]
    predicted_class_idx = int(np.argmax(prediction))
    confidence = float(np.max(prediction))

    if predicted_class_idx in map_to_other:
        expected_label = class_labels[predicted_class_idx]
        return {
            "prediction": "other",
            "expected": expected_label,
            "confidence": round(confidence, 3)
        }

    return {
        "prediction": class_labels[predicted_class_idx],
        "confidence": round(confidence, 3)
    }

# API endpoint
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if not os.path.exists("static/uploads"):
        os.makedirs("static/uploads")

    file_path = os.path.join("static/uploads", file.filename)
    file.save(file_path)

    result = predict_image(file_path)
    return jsonify(result)

# Run app
if __name__ == "__main__":
    app.run(debug=True, port=5000)
