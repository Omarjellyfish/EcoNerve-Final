// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginAdmin } from './Context/Login/Login';
import { Login } from './Components/SignUpLogIn/Login';
import { SignUp } from './Components/SignUpLogIn/SignUp';
import { LandingPage } from './Pages/LandingPage/LandingPage';
import { Dashboard } from './Components/Dashboard/Dashboard';
import ImageClassifier from './Components/ImageClassifier/ImageClassifier';
import { NavBar } from './Components/NavBar/NavBar';
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="app-container">
      <Router>
        <LoginAdmin>
          <NavBar />
          <div className="content-wrap">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/landingpage" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/testmodel" element={<ImageClassifier />} />
            </Routes>
          </div>
          <Footer />
        </LoginAdmin>
      </Router>
    </div>
  );
}

export default App;
