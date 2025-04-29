import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // for navigation
import axios from 'axios'; // Import axios
import 'react-toastify/dist/ReactToastify.css';
import './SignUpLogIn.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate(); // hook from react-router-dom

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    let valid = true;

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include a number and a special character');
      valid = false;
    } else {
      setPasswordError('');
    }

    // Validate company name
    if (companyName.trim() === '') {
      setCompanyNameError('Company name is required');
      valid = false;
    } else {
      setCompanyNameError('');
    }

    // If all fields are valid, send the request
    if (valid) {
      try {
        const response = await axios.post('http://localhost:3000/user/register', {
          email,
          password,
          companyName,
        });

        if (response.status === 200) {
          toast.success(`Sign-up successful for ${companyName}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            style: { backgroundColor: '#4CAF50', color: '#fff' }, // Green background for success
          });
          setRegistrationSuccess(true);

          // Redirect to login after successful registration
          setTimeout(() => {
            // Using navigate if it's still not working, try window.location.href
            navigate('/login');
            // Alternatively: window.location.href = '/login'; 
          }, 1500);

          // Optionally clear inputs
          setEmail('');
          setPassword('');
          setCompanyName('');
        } else {
          toast.error(response.data.message || 'Registration failed');
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error('Bad Request. Please check your input and try again.');
        } else {
          toast.error('An error occurred. Please try again.');
        }
        console.error(error);
      }
    }
  };

  return (
    <div className="auth-window">
      <h2>Sign Up</h2>

      {/* Company Name input */}
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      {companyNameError && <div className="error-message">{companyNameError}</div>}

      {/* Email input */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <div className="error-message">{emailError}</div>}

      {/* Password input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <div className="error-message">{passwordError}</div>}

      {/* Sign Up button */}
      <button onClick={handleSignUp}>Sign Up</button>

      {/* After successful registration */}
      {registrationSuccess && (
        <div className="after-success">
          <p className="success-message">Registration complete! Redirecting to login...</p>
        </div>
      )}

      {/* Link to login page */}
      <div className="have-account">
        <p>Already have an account?     
          <span 
            onClick={() => navigate('/login')} 
            className="login-link"
          >Login
          </span>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export { SignUp };
