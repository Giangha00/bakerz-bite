import React, { useEffect } from "react";
import "./Popup.css";

const Popup = ({ open, onClose, title, type = "success", duration = 2000 }) => {
  useEffect(() => {
    if (open && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!open) return null;
  return (
    <div className={`popup-topbar popup-${type}`}>
      <div className="popup-topbar-content">
        {title && <span className="popup-topbar-title">{title}</span>}
      </div>
    </div>
  );
};

export default Popup;
