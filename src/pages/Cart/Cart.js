import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Cart/Cart.css";
const Cart = () => {
  return (
    <div className="cart-content">
      <div className="cart-header">
        <FontAwesomeIcon
          icon="fa-solid fa-cart-shopping"
          className="cart-icon"
        />
      </div>
      <h1>Your Cart Is Empty</h1>
    </div>
  );
};

export default Cart;
