import './App.css' 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginAdmin } from './Context/Login/Login';
import {Login} from './Components/SignUpLogIn/Login'
import { SignUp } from './Components/SignUpLogIn/SignUp';
import { LandingPage } from './Pages/LandingPage/LandingPage';
import { Dashboard } from './Components/DashBoard/Dashboard';
import ImageClassifier from './Components/ImageClassifier/ImageClassifier';
function App() {

  return (
  <>
  {/* <Router>
    <Routes>
      <Route>

      </Route>
    </Routes>
  </Router> */}
  {/* <LoginAdmin>
    <div>
        <Login />
        <SignUp />
    </div>
  </LoginAdmin> */}
  {/* <LandingPage></LandingPage> */}
  {/* <HomePage></HomePage> */}
  <Dashboard></Dashboard>
  <ImageClassifier></ImageClassifier>

  </>
  )
}

export default App
