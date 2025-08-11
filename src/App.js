import {
  Home,
  AboutUs,
  Cart,
  ContactUs,
  Faq,
  FeedBack,
  Merchandise,
  Detail,
} from "./pages";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/context";
import { useEffect, useReducer, useRef, useState } from "react";
import STATE from "./context/initState";
import reducer from "./context/reducer";
import RunTime from "./components/RunTime";
import Footer from "./components/Footer";
import Favorite from "./pages/Favorite/Favorite";
import OrderDetail from "./pages/OrderDetail/OrderDetail";

function App() {
  let storage = localStorage.getItem("state");
  if (storage !== null) {
    storage = JSON.parse(storage);
  } else {
    storage = STATE;
  }
  const [state, dispatch] = useReducer(reducer, storage);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <div style={{ paddingBottom: 32 }}>
      <UserProvider value={{ state, dispatch }}>
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/merchandise" element={<Merchandise />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/contact_us" element={<ContactUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/feed_back" element={<FeedBack />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/order_detail/:order_id" element={<OrderDetail />} />
          </Routes>
        </div>
        <Footer />
        <RunTime />
      </UserProvider>
    </div>
  );
}

export default App;
