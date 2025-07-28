import "./Footer.css";
import logo from "../../assets/logo.svg";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbBrandFacebook } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const onScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-row">
          <div className="footer-column">
            <img src={logo} alt="logo" />
            <p>
              Premium bakery & café specializing in artisan baked goods, made
              with passion from the finest ingredients.
            </p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <NavLink to="/" onClick={onScroll}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/merchandise" onClick={onScroll}>
                  Merchandise
                </NavLink>
              </li>
              <li>
                <NavLink to="/about_us" onClick={onScroll}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact_us" onClick={onScroll}>
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" onClick={onScroll}>
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink to="/feed_back" onClick={onScroll}>
                  FeedBack
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Info</h3>
            <ul>
              <li>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ color: "#fde68a", marginRight: 8 }}
                />
                <p>13 Trinh Van Bo</p>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ color: "#fde68a", marginRight: 8 }}
                />
                <p>+1 (555) 123-4567</p>
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ color: "#fde68a", marginRight: 8 }}
                />
                <p>info@bakerzbite.com</p>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Follow Us</h3>
            <div className="social-media">
              <div className="social-icon">
                <FaInstagram
                  style={{
                    color: "#FDE68A",
                    width: "1.25rem",
                    height: "1.25rem",
                  }}
                />
              </div>
              <div className="social-icon">
                <TbBrandFacebook
                  style={{
                    color: "#FDE68A",
                    width: "1.25rem",
                    height: "1.25rem",
                  }}
                />
              </div>
              <div className="social-icon">
                <FiTwitter
                  style={{
                    color: "#FDE68A",
                    width: "1.25rem",
                    height: "1.25rem",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-divider">
          <p>© 2025 Bakerz Bite. All rights reserved.</p>
          <div className="footer-divider-policy">
            <p>Privacy Policy</p>
            <p>Terms of Services</p>
            <p>Sitemap</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
