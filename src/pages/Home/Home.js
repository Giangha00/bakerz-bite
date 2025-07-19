import { useEffect, useState } from "react";
import "./Home.css";
import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";

const Home = () => {
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

  products.map((product, index) => {
    product.type === "Merchandise" && console.log("Product:", product);
  });

  return (
    <>
      <h1>Home</h1>
      <h2>Products</h2>
      {products.map((product) => {
        if (product.type !== "Merchandise") {
          return (
            <div key={product.id} style={{ marginBottom: 10 }}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>{product.type}</p>
              <button>Add to Cart</button>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default Home;
