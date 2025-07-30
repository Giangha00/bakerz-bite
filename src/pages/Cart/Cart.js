import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import "../Cart/Cart.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/context";

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
  return (
    <div className="cart-content">
      {state.cart.length !== 0 ? (
        <div>
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
                  <div
                    onClick={() =>
                      dispatch({ type: "REMOVE_CART", payload: item.id })
                    }
                  >
                    <MdOutlineRemoveShoppingCart
                      style={{ width: "25px", height: "25px", color: "red" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
