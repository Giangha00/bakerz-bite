import "./Footer.css";
import logo from "../../assets/logo.svg";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbBrandFacebook } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

const Footer = () => {
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
              <li>Home</li>
              <li>Merchandise</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Feedback</li>
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
