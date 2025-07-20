// import { useContext, useEffect, useState } from "react";
// import axios_instance from "../../ult/axios_instance";
// import URL from "../../ult/url";
// import UserContext from "../../context/context";

const Merchandise = () => {
  // const { state, dispatch } = useContext(UserContext);
  // const [products, setProducts] = useState([]);

  // const getProducts = async () => {
  //   try {
  //     const response = await axios_instance.get(URL.GET_PRODUCTS);
  //     const data = await response.data.data;
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // const addToCart = (p) => {
  //   dispatch({
  //     type: "ADD_TO_CART",
  //     payload: {
  //       id: p.id,
  //       category_id: p.category_id,
  //       name: p.name,
  //       qty: 1,
  //       image: p.thumbnail,
  //       price: p.price,
  //     },
  //   });
  // };

  return (
    <>
      <h1>Merchandise</h1>
      {/* <h2>Products</h2>
      {products.map((product) => {
        if (product.type === "Merchandise") {
          return (
            <div key={product.id} style={{ marginBottom: 10 }}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>{product.type}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          );
        }
        return null;
      })} */}
    </>
  );
};

export default Merchandise;
