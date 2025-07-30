import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import logo from "../../assets/logo.svg";
import visitor from "../../assets/visitor.svg";
import cart from "../../assets/cart.svg";
import { NavLink } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../../context/context";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { state, dispath } = useContext(UserContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0 auto",
          justifyContent: "space-between",
        }}
        className="navbar-container"
      >
        <div className="navbar-left">
          <img src={logo} alt="logo" className="navbar-logo" />
        </div>
        <ul className={`navbar-links${open ? " open" : ""}`}>
          <li>
            <NavLink to="/" onClick={handleClose} end>
              {/* <FontAwesomeIcon
                icon={faHome}
                style={{ width: "20px", height: "20px" }}
              />{" "} */}
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/merchandise" onClick={handleClose}>
              {/* <FontAwesomeIcon
                icon={faHome}
                style={{ width: "20px", height: "20px" }}
              />{" "} */}
              Merchandise
            </NavLink>
          </li>
          <li>
            <NavLink to="/about_us" onClick={handleClose}>
              {/* <FontAwesomeIcon
                icon={faHome}
                style={{ width: "20px", height: "20px" }}
              />{" "} */}
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact_us" onClick={handleClose}>
              {/* <FontAwesomeIcon
                icon={faHome}
                style={{ width: "20px", height: "20px" }}
              />{" "} */}
              Contact Us
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/faq" onClick={handleClose}>
              FAQ
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink to="/feed_back" onClick={handleClose}>
              Feedback
            </NavLink>
          </li> */}
        </ul>
        <div className="navbar-right">
          <div className="navbar-cart">
            <NavLink to="/cart">
              <img src={cart} alt="cart" />
            </NavLink>
            {state.cart.length !== 0 && <span>{state.cart.length}</span>}
          </div>
          <button
            className="navbar-hamburger"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon
              icon={faBars}
              style={{ width: "1rem", height: "1rem" }}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
