import { Link } from 'react-router-dom';
import './Home.css';
import backgroundImage from '../../assets/images/background.png';
import img1 from '../../assets/images/homepic1.jpeg';
import img2 from '../../assets/images/homepic2.png';
import img3 from '../../assets/images/homepic3.jpeg';
import img4 from '../../assets/images/homepic4.jpeg';
import React, { useState, useEffect, useCallback } from 'react';

const Home = () => {
  const products = [
    { src: img1, name: 'Artisan Cakes', desc: 'Handcrafted with love' },
    { src: img2, name: 'Fresh Pastries', desc: 'Baked daily' },
    { src: img3, name: 'Gourmet Cookies', desc: 'Irresistible flavors' },
    { src: img4, name: 'Specialty Pies', desc: 'Unique recipes' },
  ];

  const [loading, setLoading] = useState(true);
  const [apiProducts, setApiProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8888/api/products.php');
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      if (data.status && data.data) {
        const sortedProducts = data.data
          .sort((a, b) => parseInt(a.id) - parseInt(b.id))
          .slice(0, 12); // Lấy tối đa 12 sản phẩm
        setApiProducts(sortedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="home-container">
      <div className="background-blur" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="home-page">
        <section className="hero">
          <div className="hero-content-container">
            <div className="hero-content">
              <h1>Welcome to Bakerz Bite</h1>
              <div className="subtitle">Premium Bakery & Café</div>
            </div>
          </div>
        </section>
        <section className="stats">
          <div className="stat-item" style={{ animation: 'fadeIn 1s ease-in-out', transition: 'transform 0.3s ease' }}>100+ Recipes</div>
          <div className="stat-item" style={{ animation: 'fadeIn 1.2s ease-in-out', transition: 'transform 0.3s ease' }}>50+ Varieties</div>
          <div className="stat-item" style={{ animation: 'fadeIn 1.4s ease-in-out', transition: 'transform 0.3s ease' }}>500+ Happy Customers</div>
        </section>
        <section className="products">
          <div className="product-row">
            {products.map((product, index) => (
              <div className="product-card" key={index}>
                <div className="product-image-container">
                  <img src={product.src} alt={product.name} className="product-image" />
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p>{product.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="delicious-products">
          <h2>Delicious Products</h2>
          <p>Explore our wide range of freshly baked goods</p>
          <div className="filter-options">
            <select>
              <option value="all">All</option>
              <option value="cakes">Cakes</option>
              <option value="pastries">Pastries</option>
            </select>
            <input type="range" min="0" max="100" />
          </div>
        </section>
        <section className="api-products">
          <h2>Our Bakery Collection</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : apiProducts.length > 0 ? (
            <div className="api-product-grid">
              {apiProducts.map((product) => (
                <div key={product.id} className="api-product-card">
                  <div className="api-product-image-container">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available'; }}
                    />
                  </div>
                  <div className="api-product-info">
                    <h3>{product.name}</h3>
                    <p className="api-product-price">${parseFloat(product.price).toFixed(2)}</p>
                    <p className="api-product-type">{product.type}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No products available.</p>
          )}
        </section>
        <div className="action-buttons">
          <button className="view-gallery"><Link to="/gallery" style={{ color: 'white', textDecoration: 'none' }}>View Gallery</Link></button>
          <button className="contact-us"><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Home;  