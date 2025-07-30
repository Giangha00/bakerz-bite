import { CiShoppingCart } from "react-icons/ci";
import "../Cart/Cart.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/context";

const Cart = () => {
  const { state, dispatch } = useContext(UserContext);

  return (
    <div className="cart-content">
      {state.cart.length !== 0 ? (
        <div>new view</div>
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
              <button className="cart-content-btn">Start shopping</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
