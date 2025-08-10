import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/context";
import "./Favorite.css";
import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";
import { NavLink } from "react-router-dom";

const Favorite = () => {
  const [product, setProduct] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  const getProduct = async () => {
    try {
      const response = await axios_instance.get(URL.GET_PRODUCTS);
      const data = await response.data.data;
      setProduct(data);
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
  };

  return (
    <div className="favorite-page">
      <h2 className="favorite-title">Your Favorites</h2>
      <div className="favorite-list">
        {product
          .filter((item) => Number(item.favorite) === 1)
          .map((item) => (
            <div className="favorite-card" key={item.id}>
              <img
                src={item.thumbnail}
                alt={item.name}
                className="favorite-img"
              />
              <div className="favorite-name">{item.name}</div>
              <div className="merchandise-cart-btns">
                <NavLink
                  to={`/detail/${item.id}`}
                  className="merchandise-cart-btn__detail"
                >
                  View Detail
                </NavLink>
                <button
                  className="merchandise-cart-btn__add"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favorite;
