import './App.css';
import React from 'react';
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm/ProductForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditProductModal from "./components/EditProductModal/EditProductModal";

function App() {
  return (
      <Router>
          <div>
              <nav className="navbar">
                  <div className="navbar-logo">
                      <Link to="/">LHOSI</Link>
                  </div>
                  <div className="navbar-links">
                      <Link to="/">Produtos</Link>
                      <Link to="/add-product">Novo Produto</Link>
                  </div>
              </nav>
              <div className="main-content">
                  <Routes>
                      <Route path="/" element={<ProductList/>}/>
                      <Route path="/add-product" element={<ProductForm/>}/>
                  </Routes>
              </div>
          </div>
      </Router>
  );
}

export default App;
