// import { useContext, useEffect, useState } from "react";
// import "./Home.css";
// import axios_instance from "../../ult/axios_instance";
// import URL from "../../ult/url";
// import UserContext from "../../context/context";

const Home = () => {
  // const { state, dispatch } = useContext(UserContext);
  // const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // const getProducts = async () => {
  //   try {
  //     const response = await axios_instance.get(URL.GET_PRODUCTS);
  //     const data = await response.data.data;
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  // const getCategories = async () => {
  //   try {
  //     const rs = await axios_instance.get(URL.CATEGORY_LIST);
  //     const data = await rs.data.data;
  //     setCategories(data);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  // useEffect(() => {
  //   getProducts();
  //   getCategories();
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
      <h1>Home</h1>
      {/* <select
        value={selectedCategoryId}
        onChange={(e) => {
          const selectedId = e.target.value;
          setSelectedCategoryId(selectedId);
          getCategories(selectedId);
        }}
      >
        <option value="">All Categories</option>
        {categories
          .filter(({ id }) => Number(id) !== 4)
          .map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
      </select>

      <h2>Products</h2>
      {products
        .filter((product) => {
          if (selectedCategoryId) {
            return product.category_id == selectedCategoryId;
          }
          return true;
        })
        .filter((product) => Number(product.category_id) !== 4)
        .map((product) => (
          <div key={product.id} style={{ marginBottom: 10 }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>{product.type}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))} */}
    </>
  );
};

export default Home;
