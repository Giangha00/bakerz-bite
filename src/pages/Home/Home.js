import { Link } from "react-router-dom";
import "./Home.css";
import backgroundImage from "../../assets/images/background.png";
import img1 from "../../assets/images/homepic1.jpeg";
import img2 from "../../assets/images/homepic2.png";
import img3 from "../../assets/images/homepic3.jpeg";
import img4 from "../../assets/images/homepic4.jpeg";
import React, { useState, useEffect, useCallback, useContext } from "react";
import UserContext from "../../context/context";
import { TbChefHat } from "react-icons/tb";
import { PiMedalLight } from "react-icons/pi";
import { CiClock2, CiFilter } from "react-icons/ci";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";

const Home = () => {
  const { dispatch } = useContext(UserContext);
  // const products = [
  //   { src: img1, name: "Artisan Cakes", desc: "Handcrafted with love" },
  //   { src: img2, name: "Fresh Pastries", desc: "Baked daily" },
  //   { src: img3, name: "Gourmet Cookies", desc: "Irresistible flavors" },
  //   { src: img4, name: "Specialty Pies", desc: "Unique recipes" },
  // ];

  const [loading, setLoading] = useState(true);
  const [apiProducts, setApiProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortOption, setSortOption] = useState("default");
  const [minPrice, setMinPrice] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [favorite, setFavorites] = useState({});

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8888/api/products.php?min_price=${minPrice}&max_price=${maxPrice}`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (data.status && data.data) {
        const sortedProducts = data.data
          .filter((product) =>
            [1, 2, 3].includes(parseInt(product.category_id))
          )
          .sort((a, b) => parseInt(a.id) - parseInt(b.id))
          .map((product) => ({
            ...product,
            subImages: [
              product.sub_image1 ||
                "https://via.placeholder.com/150?text=Sub+Image+1",
              product.sub_image2 ||
                "https://via.placeholder.com/150?text=Sub+Image+2",
              product.sub_image3 ||
                "https://via.placeholder.com/150?text=Sub+Image+3",
            ],
            ingredients: product.ingredients || "No ingredients available",
          }));
        setApiProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
        const favoriteMap = {};
        data.data.forEach((p) => {
          favoriteMap[p.id] = Number(p.favorite) === 1;
        });
        setFavorites(favoriteMap);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let filtered = apiProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const productPrice = parseFloat(product.price);
      const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;
      const matchesType = !selectedType || product.type === selectedType;
      return matchesSearch && matchesPrice && matchesType;
    });

    switch (sortOption) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, minPrice, maxPrice, sortOption, apiProducts, selectedType]);

  const addToCart = (p) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: p.id,
        category_id: p.category_id,
        name: p.name,
        qty: 1,
        image: p.thumbnail,
        price: p.price,
      },
    });
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

  const uniqueTypes = [...new Set(apiProducts.map((product) => product.type))];

  const toggleFavorite = async (product) => {
    try {
      await axios_instance.post(URL.FAVORITE_PRODUCTS, {
        product_id: product.id,
      });

      setFavorites((prev) => ({
        ...prev,
        [product.id]: !prev[product.id],
      }));
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  console.log("apiProducts", apiProducts);

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-container-overlay"></div>
        <h1>Welcome to Bakerz Bite</h1>
        <p>
          Premium bakery & café specializing in artisan baked goods,
          passionately made from the finest ingredients
        </p>
        <div className="home-container-medal">
          <div className="home-container-medal__item">
            <TbChefHat style={{ color: "#B45309", width: 24, height: 24 }} />
            <p>300+ Products</p>
          </div>
          <div className="home-container-medal__item">
            <PiMedalLight style={{ color: "#B45309", width: 24, height: 24 }} />
            <p>Premium Quality</p>
          </div>
          <div className="home-container-medal__item">
            <CiClock2 style={{ color: "#B45309", width: 24, height: 24 }} />
            <p>Fresh Daily</p>
          </div>
        </div>
        <div className="home-container-button">
          <button type="button">
            <Link to="/contact_us">Contact us</Link>
          </button>
        </div>
        <div></div>
      </div>
      <div className="home-product">
        <h1>Our Delicious Products</h1>
        <p>
          Discover our wide range of premium baked goods, made fresh daily with
          the finest ingredients
        </p>
        <div className="home-product-filter">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 15,
              color: "#78350F",
              gap: "0.5rem",
            }}
          >
            <CiFilter style={{ color: "#B45309", width: 24, height: 24 }} />
            Category:
            <select
              value={selectedType}
              onChange={handleTypeChange}
              className="type-select"
            >
              <option value="">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="price-filter">
            <label>
              Price:{" "}
              <span className="price-value">
                ${minPrice} - ${maxPrice}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={minPrice}
              onChange={handlePriceChange}
              className="price-slider"
            />
          </div>
          <div className="sort-container">
            <FaSortAmountUpAlt
              style={{ color: "#B45309", width: 24, height: 24 }}
            />
            Sort:{" "}
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
      </div>
      <div className="home-product-list">
        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          <>
            {filteredProducts.map((product) => (
              <div key={product.id} className="home-product-item">
                <div className="home-product-item-img">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=Image+Not+Available";
                    }}
                  />
                </div>
                <div className="home-product-item-info">
                  <div className="home-product-item-name">
                    <h3>{product.name}</h3>
                    <FontAwesomeIcon
                      icon={favorite[product.id] ? faHeartSolid : faHeart}
                      style={{
                        color: "red",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleFavorite(product)}
                    />
                  </div>
                  <p className="home-product-item-description">
                    {product.description || "No description available"}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="home-product-item-type">{product.type}</p>
                    <p className="home-product-item-price">
                      ${parseFloat(product.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="home-product-item-actions">
                    <Link
                      to={`/detail/${product.id}`}
                      className="view-details-link"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="add-to-cart"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>No products match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
