
import { BrowserRouter as Router, Route,Routes, Navigate  } from 'react-router-dom';
import Login from "./components/Auth/Login";
import RegistrationForm from "./components/Auth/Register";
import DashboardPage from "./components/Dashbord/DashboardPage";
import ProductSearch from "./components/Dashbord/ProductSearch";
import AddProductPage from "./components/Dashbord/AddProductPage";
import Logout from "./components/Auth/Logout";
import Product from "./components/Dashbord/Product";
import Page404 from "./components/Dashbord/Page404";
import EditProductForm from './components/Dashbord/EditProductForm';
// import ProductEditForm from './components/Dashbord/ProductEditForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products/add" element={<AddProductPage />} />
          <Route path="/products/search" element={<ProductSearch />} />
         <Route path="/products" element={<Product />} /> 
       <Route path="edit-product/:id" element={<EditProductForm/>} />  
         <Route path="/not-found" element={<Page404/>} />
        <Route path="*" element={<Navigate to="/not-found" />} />
       
        </Routes>
      </Router>
    </div>
  );
}

export default App;
