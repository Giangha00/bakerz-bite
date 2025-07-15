import {
  Home,
  AboutUs,
  Cart,
  ContactUs,
  Faq,
  FeedBack,
  Merchandise,
} from "./pages";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
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
        </Routes>
      </div>
    </>
  );
}

export default App;
