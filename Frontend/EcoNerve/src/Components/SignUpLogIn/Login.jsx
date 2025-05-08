import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Context/Login/Login'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUpLogIn.css';

function Login() {
  const { setIsAuthenticated } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async () => {
    let valid = true;


    if (!email || !password) {
      setErrorMessage('Please fill all fields');
      valid = false;
    } else {
      setErrorMessage(''); 
    }


    if (valid) {
      try {
        const response = await axios.post('http://localhost:3000/user/login', {
          email,
          password,
        });

        if (response.status === 200) {
          const data = response.data;

          // Store tokens and other data in sessionStorage
          sessionStorage.setItem('token', data.accessToken);
          sessionStorage.setItem('refreshToken', data.refreshToken);
          sessionStorage.setItem('companyName', data.companyName);

          setIsAuthenticated(true);
          toast.success('Login successful');


          setTimeout(() => {
            navigate('/dashboard'); 
          }, 1500);
        } else {
          toast.error(response.data.message || 'Invalid credentials');
        }
      } catch (error) {
        toast.error('Login failed. Please try again.');
        console.error('Login error:', error);
      }
    }
  };

  // Navigate to the signup page
  const navigateToSignUp = () => {
    navigate('/signup'); 
  };

  return (
    <div className="auth-window">
      <h2>Login</h2>

      {/* Email input */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (e.target.value && password) setErrorMessage('');
        }}
      />

      {/* Password input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (email && e.target.value) setErrorMessage(''); 
        }}
      />

      {/* Unified error message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Login button */}
      <button onClick={handleLogin} disabled={!email || !password}>Login</button>

      {/* Sign up button */}
      <div>
        <p>Don't have an account?</p>
        <button onClick={navigateToSignUp}>Sign Up</button>
      </div>

      <ToastContainer />
    </div>
  );
}

export { Login };
