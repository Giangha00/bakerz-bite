import { CiShoppingCart } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import "../Cart/Cart.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../context/context";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";

const Cart = () => {
  const { state, dispatch } = useContext(UserContext);
  const [order, setOrder] = useState({
    id: null,
    name: "",
    email: "",
    telephone: "",
    address: "",
    cart: state.cart,
  });

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

  const create_order = async (value, actions) => {
    // call api create order
    const rs = await axios_instance.post(URL.CREATE_ORDER, { order: order });
    const data = rs.data.data; // order_id. grand_total
    setOrder({ ...order, id: data.order_id, grand_total: data.grand_total });

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: data.grand_total,
          },
        },
      ],
    });
  };

  const on_approve = async (data, actions) => {
    const rs = await axios_instance.get(URL.UPDATE_ORDER, {
      params: { order_id: order.id },
    });
    return actions.order.capture().then(function (details) {
      dispatch({ type: "UPDATE_CART", payload: [] });
    });
  };

  const inputHandle = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

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
              <div className="order-info">
                <h3>Order information :</h3>
                <div className="order-info-item">
                  <p className="order-item-name">
                    Name
                    <input
                      type="text"
                      id="name"
                      placeholder="Your name"
                      onChange={inputHandle}
                      value={order.name}
                      name="name"
                    ></input>
                  </p>
                  <p className="order-item-email">
                    Email
                    <input
                      type="email"
                      id="email"
                      placeholder="Your email"
                      onChange={inputHandle}
                      value={order.email}
                      name="email"
                    ></input>
                  </p>
                  <p className="order-item-telephone">
                    Telephone
                    <input
                      type="text"
                      id="telephone"
                      placeholder="Your phone"
                      onChange={inputHandle}
                      value={order.telephone}
                      name="telephone"
                    ></input>
                  </p>
                  <p className="order-item-telephone">
                    Address
                    <input
                      type="text"
                      id="address"
                      placeholder="Address"
                      onChange={inputHandle}
                      value={order.address}
                      name="address"
                    ></input>
                  </p>
                  <hr />
                  <div className="order-subtotal">
                    <p>Total: {subtotal}$</p>
                  </div>
                  <button className="order-checkout">
                    <PayPalScriptProvider options={options}>
                      <PayPalButtons
                        createOrder={create_order}
                        onApprove={on_approve}
                        style={{ layout: "horizontal", tagline: false }}
                      />
                    </PayPalScriptProvider>
                  </button>
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
        </>
      )}
    </div>
  );
};

export default Cart;
