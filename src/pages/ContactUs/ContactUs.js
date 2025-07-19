import './ContactUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const iconStyle = { color: '#e6a23c', fontSize: '1.5rem' };
const mapIconStyle = { color: '#e6a23c', fontSize: '2.2rem' };

const ContactUs = () => {
  return (
    <section className="cu-root">
      <h1 className="cu-title">Contact Us</h1>
      <p className="cu-subtitle">Get in touch with us for any inquiries or to place special orders</p>
      <div className="cu-main-row cu-main-center">
        <div className="cu-left-col cu-center-col">
          <div className="cu-card cu-contact-card">
            <h2 className="cu-card-title">Get in Touch</h2>
            <div className="cu-info-row">
              <span className="cu-icon-box"><FontAwesomeIcon icon={faPhone} style={iconStyle} /></span>
              <div>
                <span className="cu-info-label">Phone</span><br/>
                <span className="cu-info-value">+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="cu-info-row">
              <span className="cu-icon-box"><FontAwesomeIcon icon={faEnvelope} style={iconStyle} /></span>
              <div>
                <span className="cu-info-label">Email</span><br/>
                <span className="cu-info-value">info@bakerzbite.com</span>
              </div>
            </div>
            <div className="cu-info-row">
              <span className="cu-icon-box"><FontAwesomeIcon icon={faMapMarkerAlt} style={iconStyle} /></span>
              <div>
                <span className="cu-info-label">Address</span><br/>
                <span className="cu-info-value">123 Bakery Street<br/>Downtown, NY 10001</span>
              </div>
            </div>
            <div className="cu-info-row">
              <span className="cu-icon-box"><FontAwesomeIcon icon={faClock} style={iconStyle} /></span>
              <div>
                <span className="cu-info-label">Hours</span><br/>
                <span className="cu-info-value">Mon–Sat: 6:00 AM - 9:00 PM<br/>Sunday: 7:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
          <div className="cu-card cu-map-card">
            <h2 className="cu-card-title">Find Us</h2>
            <div className="cu-map-box">
              <span className="cu-map-icon"><FontAwesomeIcon icon={faMapMarkerAlt} style={mapIconStyle} /></span>
              <div className="cu-map-desc">Interactive Map<br/>123 Bakery Street, Downtown, NY</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
