import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";
import UserContext from "../../context/context";
import "./Detail.css";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Detail = () => {
  const { id } = useParams();
  const { dispatch } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [buyQty, setBuyQty] = useState(1);

  const getProductDetail = async () => {
    try {
      setLoading(true);
      const response = await axios_instance.get(`${URL.DETAIL_PRODUCT}${id}`);
      const data = response.data.data;
      setProduct(data);
    } catch (error) {
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProductDetail();
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
    const images = JSON.parse(product.images);
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (!product || !product.images) return;
    const images = JSON.parse(product.images);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
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

  if (loading) {
    return <div className="detail-loading">Loading...</div>;
  }

  if (error) {
    return <div className="detail-error">{error}</div>;
  }

  if (!product) {
    return <div className="detail-error">Product not found</div>;
  }

  const productImages = product.images
    ? JSON.parse(product.images)
    : [product.thumbnail];

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
            <div className="detail-favorite">
              <FontAwesomeIcon
                icon={faHeart}
                style={{
                  color: "red",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                }}
              />
            </div>
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
    </div>
  );
};

export default Detail;
