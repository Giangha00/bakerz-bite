import { CiShoppingCart } from "react-icons/ci";
import "../Cart/Cart.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/context";

const Cart = () => {
  // const cartData = localStorage.getItem("state");
  // console.log("cartData", cartData);

  const { state, dispatch } = useContext(UserContext);
  console.log(state.cart);
  return (
    <div className="cart-content">
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
        {state.cart.map((e, k) => {
          return (
            <tr key={k}>
              <td>#{k + 1}</td>
              <td>
                <img src={e.thumbnail} width={80} />
              </td>
              <td>{e.name}</td>
              <td>{e.price}</td>
              <td>{e.buyQty}</td>
              <td>{e.buyQty * e.price}</td>
            </tr>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
