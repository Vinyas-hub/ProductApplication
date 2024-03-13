
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DashNav from './DashNav';
// import './Product.css';
// import DeleteIcon from '@mui/icons-material/Delete'; 
// import EditIcon from '@mui/icons-material/Edit';

// const Product = ({ loading}) => {
//     const [products, setProducts] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     useEffect(() => {
//       fetchProducts();
//     }, []);
//     const navigate = useNavigate();
//     const fetchProducts = async () => {
//       const token = localStorage.getItem('token'); // Retrieve token from local storage
//       try {
//         const response = await axios.get('http://localhost:8089/products', {
//           headers: {
//             Authorization: `Bearer ${token}` 
//           }
//         });
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         navigate('/login');
//       }
//     };
//     const editProduct = (productId) => {
        
//       };
    
//       const handleDeleteProduct = async (id) => {
//         try {
//             const token = localStorage.getItem('token');
//           const response = await fetch(`http://localhost:8089/products/${id}`, {
//             method: 'DELETE',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (response.ok) {
//             setProducts(products.filter((product) => product.id !== id));
//           } else {
//             console.error('Failed to delete product');
//           }
//         } catch (error) {
//           console.error('Error deleting product:', error);
//         }
//       };

//       const formatDate = (dateTimeString) => {
//         return new Date(dateTimeString).toLocaleString();
//     };

    
//     return (
 
//     <>
//       <DashNav/>
//       {loading && (
//         <div className="loading-container">
//           <div className="loading-spinner"></div>
//         </div>
//       )}
 
//       {products && !loading && (
//          <div className="product-container">
//         <table className="product-table">
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Description</th>
//               <th>Category</th>
//               <th>Created Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.length > 0 &&
//               products.map((product) => (
//                 <tr key={product.id}>
//                   <td>{product.name}</td>
//                   <td>{product.description}</td>
//                    <td>{product.category}</td>
//                    <td>{formatDate(product.createdTime)}</td>
//                   <td>
//                     <button
//                       onClick={() => editProduct(product.id)}
//                       className="edit-button"
//                     >
//                      <EditIcon/>
//                     </button>
//                     <button
//                       onClick={() => handleDeleteProduct(product.id)}
//                       className="delete-button"
//                     >
//                      <DeleteIcon />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//         </div>
//       )}

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="blurred-bg"></div>
//           <div className="modal-card">
//             <div className="error">OOPs</div>
//             <br />
//             <br />
//             <span className="info">No products found for this brand</span>
//             <img
//               src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
//               className="static"
//             />
//             <button className="modal-btn" onClick={() => setShowModal(false)}>
//               View Other Brands
//             </button>
//           </div>
//         </div>
//       )}
    
//     </>
//     );
// }

// export default Product;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashNav from './DashNav';
import './Product.css';
import DeleteIcon from '@mui/icons-material/Delete'; 
import EditIcon from '@mui/icons-material/Edit';
import Cookies from 'js-cookie';

const Product = ({ loading }) => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null); // State to store the product being edited
    useEffect(() => {
        fetchProducts();
    }, []);
    const navigate = useNavigate();
    
    const fetchProducts = async () => {
        // const token = localStorage.getItem('token');
        const token = Cookies.get('token');
        try {
            const response = await axios.get('http://localhost:8089/products', {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            navigate('/login');
        }
    };
    
    const editProduct = async (productId) => {
        // const token = localStorage.getItem('token');
        const token = Cookies.get('token');
        try {
            const response = await axios.get(`http://localhost:8089/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setEditingProduct(response.data);
          
            navigate(`/edit-product/${productId}`);
        } catch (error) {
            console.error('Error fetching product details for editing:', error);
        }
    };
    
    const handleDeleteProduct = async (id) => {
        try {
          //  const token = localStorage.getItem('token');
          const token = Cookies.get('token');
            const response = await fetch(`http://localhost:8089/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setProducts(products.filter((product) => product.id !== id));
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const formatDate = (dateTimeString) => {
        return new Date(dateTimeString).toLocaleString();
    };

    return (
        <>
            <DashNav/>
            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div>
            )}

            {products && !loading && (
                <div className="product-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Created Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 &&
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.category}</td>
                                        <td>{formatDate(product.createdTime)}</td>
                                        <td className='btn'>
                                            <button
                                                onClick={() => editProduct(product.id)}
                                                className="edit-button"
                                            >
                                                <EditIcon/>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="delete-button"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="blurred-bg"></div>
                    <div className="modal-card">
                        <div className="error">OOPs</div>
                        <br />
                        <br />
                        <span className="info">No products found for this brand</span>
                        <img
                            src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
                            className="static"
                        />
                        <button className="modal-btn" onClick={() => setShowModal(false)}>
                            View Other Brands
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Product;
