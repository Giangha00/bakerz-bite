import axios_instance from "../../ult/axios_instance";
import URL from "../../ult/url";
import "../Merchandise/Merchandise.css";
import React, { useEffect, useState } from "react";

const Merchandise = () => {
  const [state, setState] = useState([]);

  const getMerchandise = async () => {
    const rs = await axios_instance.get(URL.MERCHANDISE_LIST);
    const data = rs.data.data;
    setState(data);
  };

  useEffect(() => {
    getMerchandise();
  }, []);

  return (
    <div className="merchandise-content">
      <div className="merchandise-title">
        <h1>Merchandise</h1>
        <p>
          Take home a piece of Bakerz Bite with our branded merchandise
          collection
        </p>
      </div>
      <div className="merchandise-cart">
        {state.map((p) => (
          <div key={p.id} className="merchandise-cart-content">
            <img
              src={p.image}
              alt={p.title}
              className="merchandise-cart-image"
            />
            <p className="merchandise-cart-price">{p.price}$</p>
            <p className="merchandise-cart-name">{p.name}</p>
            <p className="merchandise-cart-des">{p.description}</p>
            <button className="merchandise-cart-btn">Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Merchandise;
//TamNguyen
