import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import Cookies from 'js-cookie';
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8089/auth/login', formData);
      const token = response.data;
  //    localStorage.setItem('token', token);
  //Cookies.set('token', token, { expires: 7 }); 
  const expirationTime = new Date();
expirationTime.setTime(expirationTime.getTime() + 5 * 60 * 1000); // 5 minutes in milliseconds
Cookies.set('token', token, { expires: expirationTime });
  console.log('Login Successful:', token);
      alert('Login done Successfully!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setLoginError('User not registered. Please register below.');
        } else {
          console.error('Login Failed:', error.response.data);
        }
      } else {
        console.error('Login Failed:', error.message);
      }
    }
  };
  return (
    <div className='login'>
<div className="login-container">
  <h2>Login</h2>
  {loginError && <div className="error1">{loginError}</div>}
  <form onSubmit={handleSubmit}>
    <div>
      <label>Username:</label>
      <input type="text" name="username" placeholder='Enter Username' value={formData.username}  onChange={handleChange} required />
    </div>
    <div className="password-input">
          <label className="password-label">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password" placeholder='Enter password'
            value={formData.password}
            onChange={handleChange}
            required
            
          />
           {showPassword ? (
              <FaEyeSlash onClick={togglePasswordVisibility} className="toggle-password" />
            ) : (
              <FaEye onClick={togglePasswordVisibility} className="toggle-password" />
            )}
        </div>
    <button type="submit">Login</button>
  </form>
  <p>
    Not registered? <Link to="/register">Register here</Link>
  </p>
</div>
</div>
  );
};

export default Login;


