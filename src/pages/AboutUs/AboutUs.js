import './AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faHeart, faClock, faUsers } from '@fortawesome/free-solid-svg-icons';

const featureIcons = [
  <FontAwesomeIcon icon={faAward} style={{ color: '#e6a23c', fontSize: '2.1rem' }} />, // Premium Quality
  <FontAwesomeIcon icon={faHeart} style={{ color: '#e6a23c', fontSize: '2.1rem' }} />, // Made with Love
  <FontAwesomeIcon icon={faClock} style={{ color: '#e6a23c', fontSize: '2.1rem' }} />, // Fresh Daily
  <FontAwesomeIcon icon={faUsers} style={{ color: '#e6a23c', fontSize: '2.1rem' }} />, // Family Focused
];

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <section className="au-root">
        <h1 className="au-title">About Bakerz Bite</h1>
        <p className="au-subtitle">Learn about our passion for baking and commitment to quality</p>
        {/* Bỏ .au-story-card, chỉ giữ 2 cột story và ảnh */}
        <div className="au-main-row">
          <div className="au-story-col">
            <h2 className="au-story-title">Our Story</h2>
            <p className="au-story-text">
              Since its launch, "Bakerz Bite" has developed into a reputable bakery & café, specializing in baked goods, passionately made from the finest ingredients. We believe in delivering premium quality products and take pride in sourcing carefully selected ingredients.<br/><br/>
              Bakerz Bite offers a wide range of baked goods made fresh in-store every day. Our bakery chain offers more than 300 different kinds of baked goods, including artisan pastries, gourmet cakes and desserts, and handcrafted beverages.<br/><br/>
              We treat our customers as our family and will not use any ingredient which we wouldn’t want to feed our own families. That’s why we only use real butter, cream, and unbleached flour in all our products.
            </p>
          </div>
          <div className="au-img-col">
            <img className="au-main-img" src="https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Bakery Store" />
          </div>
        </div>
        <div className="au-features-row">
          <div className="au-feature-card">
            <div className="au-feature-icon">{featureIcons[0]}</div>
            <div className="au-feature-title">Premium Quality</div>
            <div className="au-feature-desc">Only the finest ingredients in every product</div>
          </div>
          <div className="au-feature-card">
            <div className="au-feature-icon">{featureIcons[1]}</div>
            <div className="au-feature-title">Made with Love</div>
            <div className="au-feature-desc">Passionate craftsmanship in every bite</div>
          </div>
          <div className="au-feature-card">
            <div className="au-feature-icon">{featureIcons[2]}</div>
            <div className="au-feature-title">Fresh Daily</div>
            <div className="au-feature-desc">Baked fresh every day in our stores</div>
          </div>
          <div className="au-feature-card">
            <div className="au-feature-icon">{featureIcons[3]}</div>
            <div className="au-feature-title">Family Focused</div>
            <div className="au-feature-desc">Treating customers like family since day one</div>
          </div>
        </div>
        <div className="au-commitment-row">
          <h2 className="au-commitment-title">Our Commitment</h2>
          <div className="au-commitment-cols">
            <div className="au-commitment-col">
              <div className="au-commitment-col-title">Quality Ingredients</div>
              <div className="au-commitment-col-desc">We source only the finest ingredients, including real butter, fresh cream, and unbleached flour for exceptional taste and quality.</div>
            </div>
            <div className="au-commitment-col">
              <div className="au-commitment-col-title">Freshness Promise</div>
              <div className="au-commitment-col-desc">All our products are made fresh daily in-store, ensuring you get the best taste and quality with every visit.</div>
            </div>
            <div className="au-commitment-col">
              <div className="au-commitment-col-title">Customer Care</div>
              <div className="au-commitment-col-desc">We treat every customer like family and are committed to providing exceptional service and products you can trust.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
