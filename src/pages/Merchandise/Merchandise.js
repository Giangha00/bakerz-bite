import { useContext, useEffect, useState } from "react";
import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";
import UserContext from "../../context/context";
import "../Merchandise/Merchandise.css";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Merchandise = () => {
  const { state, dispatch } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({});

  const getProducts = async () => {
    try {
      const response = await axios_instance.get(URL.GET_PRODUCTS);
      const data = await response.data.data;
      setProducts(data);
      const favoriteMap = {};
      data.forEach((p) => {
        favoriteMap[p.id] = Number(p.favorite) === 1;
      });
      setFavorites(favoriteMap);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
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
  };

  const toggleFavorite = async (product) => {
    try {
      await axios_instance.post(URL.FAVORITE_PRODUCTS, {
        product_id: product.id,
      });
      getProducts();
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <>
      <div className="merchandise-content">
        <h1 className="merchandise-title">Merchandise</h1>
        <p className="merchandise-des">
          Take home a piece of Bakerz Bite with our branded merchandise
          collection
        </p>
        <div className="merchandise-products">
          {Array.isArray(products) &&
            products.map((product) => {
              if (product.type === "Merchandise") {
                return (
                  <div className="merchandise-cart" key={product.id}>
                    <img
                      className="merchandise-cart-img"
                      src={product.thumbnail}
                      alt={product.name}
                    />
                    <div className="merchandise-cart-info">
                      <div className="merchandise-cart-info__row">
                        <div>
                          <h3 className="merchandise-cart-name">
                            {product.name}
                          </h3>
                          <p className="merchandise-cart-des">
                            {product.description}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            marginLeft: "0.5rem",
                            height: "100%",
                            justifyContent: "space-between",
                            padding: "0.5rem 0 1rem 0",
                          }}
                          onClick={() => toggleFavorite(product)}
                        >
                          <FontAwesomeIcon
                            icon={
                              favorites[product.id] ? faHeart : faHeartSolid
                            }
                            style={{
                              color: "red",
                              fontSize: "1.5rem",
                              cursor: "pointer",
                              marginBottom: 8,
                            }}
                          />
                          <p className="merchandise-cart-price">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                      <div className="merchandise-cart-btns">
                        <NavLink
                          to={`/detail/${product.id}`}
                          className="merchandise-cart-btn__detail"
                        >
                          View Detail
                        </NavLink>
                        <button
                          className="merchandise-cart-btn__add"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
    </>
  );
};

export default Merchandise;
