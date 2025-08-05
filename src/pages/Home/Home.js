import { Link } from 'react-router-dom';
import './Home.css';
import backgroundImage from '../../assets/images/background.png';
import img1 from '../../assets/images/homepic1.jpeg';
import img2 from '../../assets/images/homepic2.png';
import img3 from '../../assets/images/homepic3.jpeg';
import img4 from '../../assets/images/homepic4.jpeg';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import UserContext from '../../context/context';

const Home = () => {
  const { dispatch } = useContext(UserContext);
  const products = [
    { src: img1, name: 'Artisan Cakes', desc: 'Handcrafted with love' },
    { src: img2, name: 'Fresh Pastries', desc: 'Baked daily' },
    { src: img3, name: 'Gourmet Cookies', desc: 'Irresistible flavors' },
    { src: img4, name: 'Specialty Pies', desc: 'Unique recipes' },
  ];

  const [loading, setLoading] = useState(true);
  const [apiProducts, setApiProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortOption, setSortOption] = useState('default');
  const [minPrice, setMinPrice] = useState(0);
  const [selectedType, setSelectedType] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8888/api/products.php?min_price=${minPrice}&max_price=${maxPrice}`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      if (data.status && data.data) {
        const sortedProducts = data.data
          .filter(product => [1, 2, 3].includes(parseInt(product.category_id)))
          .sort((a, b) => parseInt(a.id) - parseInt(b.id))
          .map(product => ({
            ...product,
            subImages: [
              product.sub_image1 || 'https://via.placeholder.com/150?text=Sub+Image+1',
              product.sub_image2 || 'https://via.placeholder.com/150?text=Sub+Image+2',
              product.sub_image3 || 'https://via.placeholder.com/150?text=Sub+Image+3'
            ],
            ingredients: product.ingredients || 'No ingredients available'
          }));
        setApiProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let filtered = apiProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const productPrice = parseFloat(product.price);
      const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;
      const matchesType = !selectedType || product.type === selectedType;
      return matchesSearch && matchesPrice && matchesType;
    });

    switch (sortOption) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, minPrice, maxPrice, sortOption, apiProducts, selectedType]);

  const addToCart = (product) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: {
      id: product.id,
      category_id: product.category_id,
      name: product.name,
      qty: 1, // Mỗi lần click sẽ thêm 1 sản phẩm
      image: product.thumbnail,
      price: product.price,
    },
  });
};

const handleAddToCart = async (productId) => {
  try {
    const product = apiProducts.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      
      // Gửi yêu cầu cập nhật số lượng lên server
      const response = await fetch('http://localhost:8888/update_order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `product_id=${productId}&quantity=1&action=increase` // Thêm action=increase
      });
      
      const result = await response.json();
      if (!result.success) {
        console.error('Failed to update server cart');
      }
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setMinPrice(value);
    setMaxPrice(100 - value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const uniqueTypes = [...new Set(apiProducts.map(product => product.type))];

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
            <div className="search-container">
              <input
                type="text"
                placeholder="🔍 Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={selectedType}
                onChange={handleTypeChange}
                className="type-select"
              >
                <option value="">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="price-filter-container">
              <div className="price-filter">
                <label>Price Range: <span className="price-value">${minPrice} - ${maxPrice}</span></label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minPrice}
                  onChange={handlePriceChange}
                  className="price-slider"
                />
              </div>
            </div>
            <div className="sort-container">
              <select 
                value={sortOption} 
                onChange={handleSortChange}
                className="sort-select"
              >
                <option value="default">Sort by</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
          </div>
        </section>
        <section className="api-products">
          <h2>Our Bakery Collection</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            <div className="api-product-grid">
              {filteredProducts.map((product) => (
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
                    <p className="api-product-description">{product.description || 'No description available'}</p>
                    <Link to={`/detail/${product.id}`} className="view-details-link">View Details</Link>
                    <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No products match your search criteria.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;