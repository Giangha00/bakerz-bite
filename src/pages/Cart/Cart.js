import { CiShoppingCart } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import "./Cart.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../context/context";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup/Popup";

const Cart = () => {
  const { state, dispatch } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [order, setOrder] = useState({
    id: null,
    name: "",
    email: "",
    telephone: "",
    address: "",
    cart: state.cart,
  });
  const navigate = useNavigate();

  const cartItems = state.cart;
  const increaseQty = (id) => {
    dispatch({
      type: "INCREASE_QTY",
      payload: id,
    });
  };
  const options = {
    clientId:
      "AWzvuU6YCAbMeiF1XgMPjTMXFz_m_qljHB-I7DDCAfQf7aQgvWuIAS1J_2bkvPaBYDkqsWmJV0P1yg-h",
    currency: "USD",
    intent: "capture",
  };

  const decreaseQty = (id) => {
    dispatch({
      type: "DECREASE_QTY",
      payload: id,
    });
  };

  const subtotal = state.cart.reduce((total, item) => {
    const price = parseFloat(item.price?.toString().replace(",", ".")) || 0;
    const qty = parseInt(item.qty) || 0;
    return total + price * qty;
  }, 0);

  const validateForm = () => {
    let newErrors = {};
    if (!order.name.trim()) newErrors.name = "Name is required";
    if (!order.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(order.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!order.telephone.trim()) {
      newErrors.telephone = "Telephone is required";
    } else if (!/^\d{8,15}$/.test(order.telephone)) {
      newErrors.telephone = "Telephone must be 8-15 digits";
    }
    if (!order.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const create_order = async (value, actions) => {
    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        name: order.name,
        email: order.email,
        telephone: order.telephone,
        address: order.address,
        cart: state.cart,
      };

      const rs = await axios_instance.post(URL.CREATE_ORDER, payload);

      if (rs.data.status) {
        const newOrderId = rs.data.order_id;
        const grandTotal = rs.data.grand_total;

        setOrder((prev) => ({
          ...prev,
          id: newOrderId,
          grand_total: grandTotal,
        }));

        localStorage.setItem("last_order_id", newOrderId);

        return await actions.order.create({
          purchase_units: [
            {
              amount: {
                value: grandTotal,
              },
            },
          ],
        });
      } else {
        alert(`Create order failed: ${rs.data.message}`);
        return;
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order");
    }
  };

  const on_approve = async (data, actions) => {
    try {
      await actions.order.capture();

      if (!order.id) {
        console.error("No order ID found");
        return;
      }

      await axios_instance.get(URL.UPDATE_ORDER, {
        params: { order_id: order.id },
      });

      dispatch({ type: "CLEAR_CART" });
      navigate(`/order_detail/${order.id}`);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const inputHandle = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const lastOrderId = localStorage.getItem("last_order_id");

  return (
    <div
      style={{ justifyContent: state.cart.length !== 0 ? "start" : "center" }}
      className="cart-content"
    >
      {state.cart.length !== 0 ? (
        <>
          <div className="cart-container">
            <div className="cart-item-page">
              <div className="cart-list-item">
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="cart-item-start">
                      <img
                        className="cart-item-image"
                        src={item.image}
                        alt={item.name}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">${item.price}</div>
                      </div>
                    </div>
                    <div className="cart-item-total">
                      <div className="total">${item.total_price}</div>
                      <div className="cart-item-qty">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="button-qty"
                        >
                          -
                        </button>
                        <p style={{ fontSize: "1.25rem", color: "#78350F" }}>
                          {item.qty}
                        </p>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="button-qty"
                        >
                          +
                        </button>
                      </div>
                      <div
                        onClick={() =>
                          dispatch({ type: "REMOVE_CART", payload: item.id })
                        }
                      >
                        <FaRegTrashAlt
                          style={{
                            width: "1.25rem",
                            height: "1.25rem",
                            color: "red",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <button
                  className="clear-cart-btn"
                  onClick={() => dispatch({ type: "CLEAR_CART" })}
                >
                  Clear Cart
                </button>
                <div className="total-items">
                  Total Items:{" "}
                  {cartItems.reduce((total, item) => total + item.qty, 0)}
                </div>
              </div>
            </div>
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="cart-info">
                <h3>Order information :</h3>
                <div className="order-info-item">
                  <div className="order-item-name">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your name"
                      onChange={inputHandle}
                      value={order.name}
                      name="name"
                      className={errors.name ? "input-error" : ""}
                    />
                    {errors.name && (
                      <span className="error">{errors.name}</span>
                    )}
                  </div>

                  <div className="order-item-email">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your email"
                      onChange={inputHandle}
                      value={order.email}
                      name="email"
                      className={errors.email ? "input-error" : ""}
                    />
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>

                  <div className="order-item-telephone">
                    <label htmlFor="telephone">Telephone</label>
                    <input
                      type="number"
                      id="telephone"
                      placeholder="Your phone"
                      onChange={inputHandle}
                      value={order.telephone}
                      name="telephone"
                      className={errors.telephone ? "input-error" : ""}
                    />
                    {errors.telephone && (
                      <span className="error">{errors.telephone}</span>
                    )}
                  </div>

                  <div className="order-item-telephone">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      placeholder="Address"
                      onChange={inputHandle}
                      value={order.address}
                      name="address"
                      className={errors.address ? "input-error" : ""}
                    />
                    {errors.address && (
                      <span className="error">{errors.address}</span>
                    )}
                  </div>

                  <hr />
                  <div className="order-subtotal">
                    <p>Total: {subtotal}$</p>
                  </div>
                  <div className="order-checkout">
                    <PayPalScriptProvider options={options}>
                      <PayPalButtons
                        createOrder={create_order}
                        onApprove={on_approve}
                        onCancel={() => {
                          navigate(`/order_detail/${order.id}`);
                          dispatch({ type: "CLEAR_CART" });
                          setPopupOpen(true);
                        }}
                        onError={(err) => {
                          console.warn("PayPal error blocked:", err);
                        }}
                        style={{
                          layout: "horizontal",
                          tagline: false,
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                  {lastOrderId && (
                    <button
                      onClick={() => navigate(`/order_detail/${lastOrderId}`)}
                      style={{
                        margin: "10px auto",
                        padding: "10px 15px",
                        background: "var(--button-color)",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        maxWidth: "200px",
                        width: "100%",
                      }}
                    >
                      View Last Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <CiShoppingCart className="cart-icon" />
          </div>
          <div className="cart">
            <h1 className="cart-content-title">Your Cart Is Empty</h1>
            <p className="cart-content-des">
              Looks like you haven't added any delicious items to your cart yet.
            </p>
            <Link to="/">
              <button className="cart-content-btn">Continue shopping</button>
            </Link>
          </div>
          {lastOrderId && (
            <button
              onClick={() => navigate(`/order_detail/${lastOrderId}`)}
              style={{
                margin: "10px auto",
                padding: "10px 15px",
                background: "var(--button-color)",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                maxWidth: "200px",
              }}
            >
              View Last Order
            </button>
          )}
        </>
      )}
      <Popup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        title="Added to Cart Successfully"
        type="success"
      />
    </div>
  );
};

export default Cart;
