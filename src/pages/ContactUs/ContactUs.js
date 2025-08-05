import "./ContactUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  return (
    <div className="contactus-container">
      <section className="cu-root">
        <h1 className="cu-title">Contact Us</h1>
        <p className="cu-subtitle">
          Get in touch with us for any inquiries or to place special orders
        </p>

        <div className="cu-main-row">
          <div className="cu-left-col">
            <div className="cu-card cu-equal-card">
              <h2 className="cu-card-title">Get in Touch</h2>

              <div className="cu-info-row">
                <div className="cu-icon-box">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <strong>Phone</strong>
                  <p>+1 (800) 555‑0199</p>
                </div>
              </div>

              <div className="cu-info-row">
                <div className="cu-icon-box">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <strong>Email</strong>
                  <p>hello@bakerzbite.com</p>
                </div>
              </div>

              <div className="cu-info-row">
                <div className="cu-icon-box">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div>
                  <strong>Address</strong>
                  <p>
                    742 Evergreen Terrace
                    <br />
                    Springfield, USA
                  </p>
                </div>
              </div>

              <div className="cu-info-row">
                <div className="cu-icon-box">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div>
                  <strong>Hours</strong>
                  <p>
                    Mon–Sat: 7:00 AM - 9:00 PM
                    <br />
                    Sun: 8:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="cu-card cu-map-card cu-equal-card">
              <h2 className="cu-card-title">Find Us</h2>
              <div className="cu-map-box">
                {/* <FontAwesomeIcon icon={faMapMarkerAlt} className="cu-map-icon" />
                <p className="cu-map-text">
                  Interactive Map
                  <br />
                  742 Evergreen Terrace, Springfield
                </p> */}
                <iframe
                  title="Bakerz Bite Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8050743583894!2d105.73617257516501!3d21.04048408061183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134550ab1db2433%3A0x9febb50e17509deb!2zMTMgUC4gVHLhu4tuaCBWxINuIELDtCwgWHXDom4gUGjGsMahbmcsIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1754113808944!5m2!1svi!2s"
                  style={{ border: 0, width: "100%", height: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="cu-right-col">
            <div className="cu-card cu-full-height">
              <h2 className="cu-card-title">Send us a Message</h2>
              <form className="cu-form">
                <div className="cu-form-row">
                  <div className="cu-form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="John" />
                  </div>
                  <div className="cu-form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" />
                  </div>
                </div>
                <div className="cu-form-group">
                  <label>Email</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
                <div className="cu-form-group">
                  <label>Phone</label>
                  <input type="text" placeholder="123-456-7890" />
                </div>
                <div className="cu-form-group">
                  <label>Subject</label>
                  <select>
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className="cu-form-group">
                  <label>Message</label>
                  <textarea placeholder="Write your message here..." />
                </div>
                <div className="cu-btn-wrapper">
                  <button type="submit" className="cu-btn">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
