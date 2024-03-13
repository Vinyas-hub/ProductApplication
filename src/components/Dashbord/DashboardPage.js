import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductSearch from './ProductSearch';
import { useNavigate } from 'react-router-dom';
import DashNav from './DashNav';
const DashboardPage = () => {
  

  return (
    <div>
        <DashNav/>
        <div className="home">
      <div id="banner" className="banner full-screen-mode parallax">
        <div className="container pr">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="banner-static">
              <div className="banner-text">
                <div className="banner-cell">
                  <h2>We sell top branded products</h2>
                  <p>Flat 40% OFF on all products</p>
                  <div className="book-btn">
                    <Link to="/products" className="table-btn hvr-underline-from-center">View Product</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-box pad-top-70">
        <div className="container">
        <ProductSearch /> 
        <br /><br /><br /><br />
         </div>
      </div>
    </div>
     
      
     
    </div>
  );
};

export default DashboardPage;


