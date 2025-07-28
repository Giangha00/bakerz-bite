import { useContext, useEffect, useState } from "react";
import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";
import UserContext from "../../context/context";
import "../Merchandise/Merchandise.css";

const Merchandise = () => {
  const { state, dispatch } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios_instance.get(URL.GET_PRODUCTS);
      const data = await response.data.data;
      setProducts(data);
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
                  <div className="merchandise-cart">
                    <div key={product.id}>
                      <p className="merchandise-cart-price">
                        Price: ${product.price}
                      </p>
                      <img
                        className="merchandise-cart-img"
                        src={product.thumbnail}
                        alt={product.name}
                      />
                      <h3 className="merchandise-cart-name">{product.name}</h3>
                      <p className="merchandise-cart-des">
                        {product.description}
                      </p>

                      <button
                        className="merchandise-cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
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
