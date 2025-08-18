import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";
import UserContext from "../../context/context";
import "./Detail.css";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const { dispatch } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [buyQty, setBuyQty] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [favorite, setFavorites] = useState({});

  const getProductDetail = async () => {
    try {
      setLoading(true);
      const response = await axios_instance.get(`${URL.DETAIL_PRODUCT}${id}`);
      const data = response.data.data;
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product detail:", error);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios_instance.get(URL.GET_PRODUCTS);
      const data = response.data.data;
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getProductDetail();
      getAllProducts();
    }
  }, [id]);

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        category_id: product.category_id,
        name: product.name,
        qty: buyQty,
        image: product.thumbnail,
        price: product.price,
      },
    });
  };

  const nextImage = () => {
    if (!product || !product.images) return;
    try {
      const images = JSON.parse(product.images);
      if (!Array.isArray(images) || images.length === 0) return;
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    } catch (error) {
      console.error("Error parsing images:", error);
    }
  };

  const prevImage = () => {
    if (!product || !product.images) return;
    try {
      const images = JSON.parse(product.images);
      if (!Array.isArray(images) || images.length === 0) return;
      setCurrentImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    } catch (error) {
      console.error("Error parsing images:", error);
    }
  };

  const selectImage = (index) => {
    if (!product || !product.images) return;
    try {
      const images = JSON.parse(product.images);
      if (!Array.isArray(images) || index >= images.length) return;
      setCurrentImageIndex(index);
    } catch (error) {
      console.error("Error parsing images:", error);
    }
  };

  const inputHandle = (e) => {
    const v =
      e.target.value > 0 && e.target.value <= product.qty
        ? e.target.value
        : product.qty;
    setBuyQty(v);
  };

  const decreaseQty = () => {
    if (buyQty > 1) {
      setBuyQty(buyQty - 1);
    }
  };

  const increaseQty = () => {
    if (buyQty < product.qty) {
      setBuyQty(buyQty + 1);
    }
  };

  const toggleFavorite = async (targetProduct) => {
    try {
      await axios_instance.post(URL.FAVORITE_PRODUCTS, {
        product_id: targetProduct.id,
      });

      if (targetProduct.id === product.id) {
        setProduct({
          ...product,
          favorite: product.favorite === 1 ? 0 : 1,
        });
      }

      setAllProducts((prev) =>
        prev.map((p) =>
          p.id === targetProduct.id
            ? { ...p, favorite: p.favorite === 1 ? 0 : 1 }
            : p
        )
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  if (loading) {
    return <div className="detail-loading">Loading...</div>;
  }

  if (error) {
    return <div className="detail-error">{error}</div>;
  }

  if (!product) {
    return <div className="detail-error">Product not found</div>;
  }

  let productImages = [product.thumbnail];
  try {
    if (product.images) {
      const parsedImages = JSON.parse(product.images);
      if (Array.isArray(parsedImages) && parsedImages.length > 0) {
        productImages = parsedImages;
      }
    }
  } catch (error) {
    console.error("Error parsing product images:", error);
  }

  let productIngredients = [];
  try {
    if (product.ingredients) {
      const parsedIngredients = JSON.parse(product.ingredients);
      if (Array.isArray(parsedIngredients)) {
        productIngredients = parsedIngredients;
      }
    }
  } catch (error) {
    console.error("Error parsing product ingredients:", error);
    productIngredients = [];
  }

  const recommendedProducts = allProducts
    .filter((p) => p.type === product.type && p.id !== product.id)
    .slice(0, 8);

  return (
    <div className="detail-container">
      <div className="detail-content">
        <div className="detail-image-section">
          <div className="detail-main-image">
            <img
              className="detail-image"
              src={productImages[currentImageIndex]}
              alt={product.name}
            />
            <button
              className="carousel-btn carousel-btn-prev"
              onClick={prevImage}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="carousel-btn carousel-btn-next"
              onClick={nextImage}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className="detail-thumbnails">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`thumbnail-item ${
                  index === currentImageIndex ? "active" : ""
                }`}
                onClick={() => selectImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="thumbnail-image"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="detail-info-section">
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <div className="detail-price-section">
            <span className="detail-price">${product.price}</span>
            <button
              className="detail-favorite"
              type="button"
              onClick={() => toggleFavorite(product)}
            >
              <FontAwesomeIcon
                icon={Number(product.favorite) === 1 ? faHeartSolid : faHeart}
                style={{
                  color: "red",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                }}
              />
            </button>
          </div>
          <div className="detail-qty-selector">
            <button className="qty-btn" onClick={decreaseQty}>
              -
            </button>
            <input
              type="number"
              value={buyQty}
              min={1}
              max={product.qty}
              className="detail-qty"
              onChange={inputHandle}
            />
            <button className="qty-btn" onClick={increaseQty}>
              +
            </button>
          </div>
          {productIngredients.length > 0 ? (
            <div className="detail-ingredient-selector">
              <h3>Ingredient</h3>
              <div className="detail-ingredient-layout">
                <ul style={{ margin: 0 }}>
                  {productIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="detail-actions">
            <button
              className="detail-add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {recommendedProducts.length > 0 && (
        <div className="recommended-section">
          <h2 className="recommended-title">You Might Also Like</h2>
          <p className="recommended-description">
            Discover more amazing products from our collection
          </p>
          <div className="recommended-products">
            {recommendedProducts.map((recProduct) => (
              <div className="recommended-card" key={recProduct.id}>
                <div className="recommended-image-container">
                  <img
                    className="recommended-image"
                    src={recProduct.thumbnail}
                    alt={recProduct.name}
                  />
                  <div className="recommended-overlay">
                    <button
                      className="recommended-heart-btn"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(recProduct);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          Number(recProduct.favorite) === 1
                            ? faHeartSolid
                            : faHeart
                        }
                        style={{
                          color:
                            Number(recProduct.favorite) === 1 ? "red" : "white",
                          fontSize: "1.2rem",
                        }}
                      />
                    </button>
                  </div>
                </div>
                <div className="recommended-info">
                  <h3 className="recommended-name">{recProduct.name}</h3>
                  <p className="recommended-price">${recProduct.price}</p>
                  <div className="recommended-actions">
                    <NavLink
                      to={`/detail/${recProduct.id}`}
                      className="recommended-detail-btn"
                    >
                      View Detail
                    </NavLink>
                    <button
                      className="recommended-add-btn"
                      onClick={() => addToCart(recProduct)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
