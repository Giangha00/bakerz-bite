import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/context";
import "./Favorite.css";
import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import Popup from "../../components/Popup/Popup";

const Favorite = () => {
  const [product, setProduct] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [favorite, setFavorites] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);

  const getProduct = async () => {
    try {
      const response = await axios_instance.get(URL.GET_PRODUCTS);
      const data = await response.data.data;
      setProduct(data);

      const favoriteMap = {};
      data.data.forEach((p) => {
        favoriteMap[p.id] = Number(p.favorite) === 1;
      });
      setFavorites(favoriteMap);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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
    setPopupOpen(true);
  };

  const toggleFavorite = async (productItem) => {
    try {
      await axios_instance.post(URL.FAVORITE_PRODUCTS, {
        product_id: productItem.id,
      });

      setProduct((prev) => prev.filter((p) => p.id !== productItem.id));
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <div className="favorite-page">
      <h2 className="favorite-title">Your Favorites</h2>
      <div className="favorite-list">
        {product.filter((item) => Number(item.favorite) === 1).length === 0 ? (
          <div className="favorite-empty">
            <FontAwesomeIcon
              icon={faHeartSolid}
              style={{
                color: "red",
                fontSize: "9rem",
                textAlign: "center",
              }}
            />
            <h3
              style={{
                textAlign: "center",
                color: "#b45309",
                marginTop: "18px",
              }}
            >
              You have no favorite products yet.
            </h3>
            <p
              style={{
                textAlign: "center",
                color: "#a67c52",
              }}
            >
              Browse products and click the heart to add your favorites!
            </p>
          </div>
        ) : (
          product
            .filter((item) => Number(item.favorite) === 1)
            .map((product) => (
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
                      icon={favorite[product.id] ? faHeart : faHeartSolid}
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
            ))
        )}
      </div>
      <Popup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        title="Added to Cart Successfully"
        type="success"
      />
    </div>
  );
};

export default Favorite;
