import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email format';
    }
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.trim().length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8089/auth/register', formData);
      console.log('Registration Successful:', response.data);
      alert('Registration Successful!');
      navigate("/login");
    } catch (error) {
      console.error('Registration Failed:', error.response.data);
      alert('Registration Failed!');
    }
  };

  return (
    <div className='registration-container'>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="username-label">Username:</label>
          <input type="text" name="username" placeholder='Enter Username' value={formData.username} onChange={handleChange} required />
          {errors.username && <div className="error-message">{errors.username}</div>}
        </div>
        <div>
          <label className="email-label">Email:</label>
          <input type="email" name="email" placeholder='Enter Email'value={formData.email} onChange={handleChange} required />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div>
          <label className="password-label">Password:</label>
          <input type="password" name="password" placeholder='Enter Password' value={formData.password} onChange={handleChange} required />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;