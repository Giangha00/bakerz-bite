import { useEffect, useState } from "react";
import "./Favorite.css";
import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";

const Favorite = () => {
  const [product, setProduct] = useState([]);

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
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favorite;
