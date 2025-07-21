import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RunTime.css";
import {
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const RunTime = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="run-time-container">
      <div className="run-time">
        <p>
          <FontAwesomeIcon
            icon={faCalendarDays}
            color="#FDE68A"
            style={{ width: "1rem", height: "1rem" }}
          />{" "}
          {formattedDate}
        </p>
        <p>
          <FontAwesomeIcon
            icon={faClock}
            color="#FDE68A"
            style={{ width: "1rem", height: "1rem" }}
          />{" "}
          {formattedTime}
        </p>
        <p>
          <FontAwesomeIcon
            icon={faLocationDot}
            color="#FDE68A"
            style={{ width: "1rem", height: "1rem" }}
          />{" "}
          13 Trinh Van Bo
        </p>
        <p>🎉 Weekend Special: 20% off all cakes & pastries!</p>
        <p>☕ Happy Hour: Buy 2 coffee, get 1 free (2-4 PM daily)</p>
        <p>🍰 Custom cakes available - Order 48 hours in advance</p>
      </div>
    </div>
  );
};

export default RunTime;
