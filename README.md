# ♻️ EcoNerve

**EcoNerve** is a web-based platform developed as a graduation project by students of **Damietta University, Class of 2025**. It uses artificial intelligence to identify and classify recyclable materials from images—contributing to a greener, more sustainable future.

---

## 🌱 Project Overview

EcoNerve helps users properly sort waste materials using an AI model. By simply uploading an image, the system:

- Identifies the material type (e.g., plastic, paper, metal)
- Calculates estimated revenue
- Presents classification statistics in a dynamic dashboard

---

## ✨ Features

- 🔍 **AI Material Classifier** – Upload an image and receive instant feedback on the material type.
- 📊 **Interactive Dashboard** – View revenue insights and classification statistics.
- 🧠 **Two Backend Systems**:
  - **Express.js API** – Manages user authentication and classification data.
  - **Flask Server** – Handles AI model inference separately.

---

## 🛠️ Technologies Used

- **Frontend**: React.js, CSS Modules
- **Backend 1**: Express.js (Node.js)
- **Backend 2**: Flask (Python)
- **AI**: Trained classification model using image input
- **Database**: MongoDB *(or whichever you use)*
- **Routing**: React Router DOM

---

## 🖥️ Run Locally

> **Requirements**: Node.js, npm, Python 3.x

### 1. Start the Express Backend

```bash
cd backend
npm start
```

### 2. Start the Flask AI Inference Server

```bash
cd frontend/econerve
python test.py
```

### 3. Start the React Frontend

```bash
cd frontend/econerve
npm run dev
```

---

## 👥 Meet the Team

A passionate group of students from Damietta University building tech for a greener tomorrow:

- **Ahlam Mostafa** – Focused on AI and sustainability.
- **Afaf Nader** – Environmental science and tech innovation.
- **Salma Mohammed** – System analyst specialized in green projects.
- **Omar Kandil** – Full-stack software engineer.
- **Amr Azmal** – Networking and data science expert.
- **Zeyad Tarek** – Mobile and iOS developer.

---

## 📄 License

This project is open-source and developed solely for educational and research purposes as part of a graduation project.