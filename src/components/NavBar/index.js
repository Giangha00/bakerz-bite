import React, { useState } from "react";
import "./NavBar.css";
import logo from "../../assets/logo.svg";
import visitor from "../../assets/visitor.svg";
import cart from "../../assets/cart.svg";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/merchandise">Merchandise</NavLink>
          </li>
          <li>
            <NavLink to="/about_us">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/contact_us">Contact Us</NavLink>
          </li>
          <li>
            <NavLink to="/faq">FAQ</NavLink>
          </li>
          <li>
            <NavLink to="/feed_back">Feedback</NavLink>
          </li>
        </ul>
        <div className="navbar-right">
          <div className="navbar-cart">
            <NavLink to="/cart">
              <img src={cart} alt="cart" />
            </NavLink>
          </div>
          <div className="navbar-visitors">
            <img src={visitor} alt="visitor" />4
          </div>
          <button
            className="navbar-hamburger"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            ≡
          </button>
        </div>
      </div>
    </nav>
  );
}
