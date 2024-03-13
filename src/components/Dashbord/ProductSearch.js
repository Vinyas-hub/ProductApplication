import React, { useState } from 'react';
import axios from 'axios';
import './ProductSearch.css';
import Cookies from 'js-cookie';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  //const token = localStorage.getItem('token');
  const token = Cookies.get('token');
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatDate = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString(); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8089/products/search?name=${encodeURIComponent(searchTerm)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error searching products:', error);
      setLoading(false);
    }
  };

  return (
    <div className="product-search-container">
        <p className='para'>Search By Product Name</p>
        <form className="product-search-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter product name" style={{color:"white"}} value={searchTerm} onChange={handleChange} />
          <button type="submit">Search</button>
        </form>
        {loading && <p>Loading...</p>}
        {searchResults.length > 0 && (
          <div className="product-cards">
            {searchResults.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                <p>{formatDate(product.createdTime)}</p>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default ProductSearch;

