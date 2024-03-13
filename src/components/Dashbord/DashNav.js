import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import './DashNav.css';
import CategoryIcon from '@mui/icons-material/Category';
import ProductSearch from './ProductSearch';
const DashNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  //  const token = localStorage.getItem('token');
  const token = Cookies.get('token');
    if (!token) {
      navigate('/login'); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    alert('Logging out...');
    navigate('/login'); 
  };

//   const handleMenuClick = () => {
//     setMenuOpen(!menuOpen);
//   };

  return (
    <>
      <div className={`top-navbar ${menuOpen ? 'open' : ''}`}>
        {/* <button className="hamburger-menu" onClick={handleMenuClick}>
          &#9776;
        </button> */}
        <h3 className="navbar-heading">
          <Link to="/dashboard">Product Store</Link>
        </h3>
        <div className="icons-container">
          <Link to="/products/add">
            <ShoppingCartIcon style={{ color: '#ccc' }} />
            <span>Add product</span>
          </Link>
        </div>
        <div className="icons-container">
          <Link to="/products" >
            <CategoryIcon style={{ color: '#ccc' }} />
            <span>Products</span>
          </Link>
        </div>
        {/* <div className="icons-container">
          <Link to="/products/search">
            <SearchIcon style={{ color: '#ccc' }} />
            <ProductSearch /> 
          </Link> 
        </div>*/}
        <div className="icons-container">
          <Link to="/login" >
            <LoginIcon style={{ color: '#ccc' }} />
            <span>Login</span>
          </Link>
        </div>
        <div className="icons-container">
          <Link to="/login" onClick={handleLogout}>
            <LogoutIcon style={{ color: '#ccc' }} />
            <span>Logout</span>
          </Link>
        </div>
      </div>
      
    </>
  );
};

export default DashNav;

