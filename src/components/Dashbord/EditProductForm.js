import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProductForm.css';
import Cookies from 'js-cookie';
import DashNav from './DashNav';


const EditProductForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: ''
    });

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
       // const token = localStorage.getItem('token');
       const token = Cookies.get('token');
        try {
            const response = await axios.get(`http://localhost:8089/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            const { name, description, category } = response.data;
            setFormData({
                name,
                description,
                category
            });
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const categories = ['BEVERAGES','ELECTRONICS', 'CLOTHING', 'BOOKS', 'SNACKS','MAKEUP'];
    const handleSubmit = async (e) => {
        e.preventDefault();
        //const token = localStorage.getItem('token');
        const token = Cookies.get('token');
        try {
            const response = await axios.put(`http://localhost:8089/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                alert('Product updated Successfully!');
                navigate('/products');
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <>
         <DashNav />
        <div className="edit-product-form-container">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='label-name' htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className='label' htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>
                {/* <div className="form-group">
                    <label className='label' htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
                </div> */}
                <div className="form-group">
          <label className='cat1'>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} required >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
                <button className='btn-smt' type="submit">Update</button>
            </form>
        </div>
        </>
    );
};

export default EditProductForm;
