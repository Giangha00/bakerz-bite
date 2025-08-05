import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import "../Cart/Cart.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../context/context";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const Cart = () => {
  const { state, dispatch } = useContext(UserContext);
  const cartItems = state.cart;
  const increaseQty = (id) => {
    dispatch({
      type: "INCREASE_QTY",
      payload: id,
    });
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
                      <div>
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">${item.price}</div>
                      </div>
                    </div>
                    <div className="cart-item-total">
                      <div className="total">${item.total_price}</div>
                      <div className="cart-item-qty">
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="button-qty"
                        >
                          +
                        </button>
                        {item.qty}
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="button-qty"
                        >
                          -
                        </button>
                      </div>
                      <div
                        onClick={() =>
                          dispatch({ type: "REMOVE_CART", payload: item.id })
                        }
                      >
                        <MdOutlineRemoveShoppingCart
                          style={{
                            width: "25px",
                            height: "25px",
                            color: "red",
                            marginTop: "10px",
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
                      id="Name"
                      placeholder="Your name"
                      className="box"
                    ></input>
                  </p>
                  <p className="order-item-email">
                    Email
                    <input
                      type="text"
                      id="Email"
                      placeholder="Your email"
                      className="box"
                    ></input>
                  </p>
                  <p className="order-item-telephone">
                    Telephone
                    <input
                      type="text"
                      id="telephone"
                      placeholder="Your phone"
                      className="box"
                    ></input>
                  </p>
                  <p className="order-item-telephone">
                    Address
                    <input
                      type="text"
                      id="address"
                      placeholder="Address"
                      className="box"
                    ></input>
                  </p>
                  <hr />
                  <div className="order-subtotal">
                    <p>Subtotal : {subtotal}$</p>
                  </div>
                  <button className="order-checkout">
                    <MdOutlineShoppingCartCheckout
                      style={{ width: "20px", height: "20px" }}
                    />
                    Proceed to Checkout
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
