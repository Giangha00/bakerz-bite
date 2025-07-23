import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane as faPlane } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import "./FeedBack.css";
import { useEffect, useState } from "react";
import URL from "../../ult/url";
import axios_instance from "../../ult/axios_instance";

const FeedBack = () => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    rate: selected,
    message: "",
  });
  const [reviews, setReviews] = useState([]);

  const stars = [1, 2, 3, 4, 5];

  const createReview = async () => {
    const rs = await axios_instance.post(URL.CREATE_FEED_BACK, {
      feedback: feedback,
    });
    const data = rs.data.data;
    setFeedback({
      name: data.name,
      email: data.email,
      rate: data.rate,
      message: data.message,
    });
  };

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const getFeedback = async () => {
    try {
      const rs = await axios_instance.get(URL.FEED_BACK);
      const data = rs.data.data;
      if (Array.isArray(data)) {
        setReviews(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <div className="feedback-container">
      <p className="feedback-title">Customer Feedback</p>
      <p className="feedback-subtitle">
        Share your experience and read what our customers have to say
      </p>
      <div className="feedback-content">
        <form onSubmit={createReview}>
          <div className="feedback-typing">
            <div className="typing-content">
              <p className="typing-title">Leave Your Feedback</p>
              <div className="typing-input">
                <div className="feedback-input-text">
                  <p>Name</p>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="feedback-input-name"
                    name="name"
                    onChange={inputHandle}
                  />
                </div>
                <div className="feedback-input-text">
                  <p>Email</p>
                  <input
                    type="text"
                    placeholder="Your Email"
                    className="feedback-input-email"
                    name="email"
                    onChange={inputHandle}
                  />
                </div>
              </div>
              <div className="feedback-rate">
                <p className="feedback-rate-title">Rate Us</p>
                <div className="feedback-rate-stars">
                  {stars.map((star) => {
                    return (
                      <span
                        key={star}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => {
                          setSelected(star);
                          setFeedback({ ...feedback, rate: star });
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon
                          icon={
                            star <= (hovered || selected)
                              ? faSolidStar
                              : faRegularStar
                          }
                          style={{
                            color:
                              star <= (hovered || selected)
                                ? "#facd12"
                                : "#d6d8dc",
                            width: "2rem",
                            height: "2rem",
                            transition: "color 0.2s",
                          }}
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="feedback-input-area">
                <p>Your Review</p>
                <textarea
                  cols="40"
                  rows="5"
                  type="text"
                  placeholder="Tell us about your experience"
                  name="message"
                  onChange={inputHandle}
                />
              </div>
              <button
                className="feedback-submit"
                type="submit"
                disabled={!feedback.name || !feedback.email}
              >
                <FontAwesomeIcon
                  icon={faPlane}
                  style={{
                    color: "#fff",
                    width: "1.4rem",
                    height: "1.4rem",
                    marginRight: "0.5rem",
                  }}
                />
                Submit Review
              </button>
            </div>
          </div>
        </form>
        <div className="feedback-review">
          <p className="feedback-review-title">
            <FontAwesomeIcon
              icon={faThumbsUp}
              style={{
                color: "#78350F",
                width: "1.4rem",
                height: "1.4rem",
                marginRight: "0.5rem",
              }}
            />
            Customer Reviews
          </p>
          <div className="feedback-review-content">
            {Array.isArray(reviews) &&
              reviews.map((review, index) => {
                return (
                  <div className="feedback-review-item" key={index}>
                    <div className="feedback-review-item-info">
                      <img src="" alt="" />
                      <div className="feedback-review-item-name">
                        <p>{review.name}</p>
                        <div className="feedback-review-item-rate">
                          {stars.map((star, index) => {
                            return (
                              <FontAwesomeIcon
                                key={index}
                                icon={
                                  star <= review.rate
                                    ? faSolidStar
                                    : faRegularStar
                                }
                                style={{
                                  color:
                                    star <= review.rate ? "#F7DC6F" : "#d6d8dc",
                                  width: "1rem",
                                  height: "1rem",
                                }}
                              />
                            );
                          })}
                          <p>{timeAgo(review.create_at)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="feedback-review-item-review">
                      <p>{review.message}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
