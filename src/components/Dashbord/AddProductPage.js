import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProductPage.css';
import { Link, useNavigate } from 'react-router-dom'; 
import DashNav from './DashNav';
import Cookies from 'js-cookie';
const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const categories = ['BEVERAGES','ELECTRONICS', 'CLOTHING', 'BOOKS', 'SNACKS','MAKEUP'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
     // const token = localStorage.getItem('token');
     const token = Cookies.get('token');
      const response = await axios.post('http://localhost:8089/products/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Product added:', response.data);
      setLoading(false);
      setFormData({ name: '', description: '', category: '' });
      navigate('/products', { state: { message: 'Product created successfully' } });
    } catch (error) {
      setError('Error adding product');
      setLoading(false);
    }
  };

  return (
    <>
    <DashNav />
    <div className="top-container"><br></br></div>
    <div className="add-product-container">
      <h2>Add Product</h2>
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label className='name'>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className='desc'>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className='cat'>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          Save
        </button>
      </form>
    </div>
  </>
  );
};

export default AddProductPage;

