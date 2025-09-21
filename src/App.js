import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/Home/Home";
import AboutUS from "./components/Home/AboutUs";
import { OurServices } from "./components/Home/OurServices";
import ContactUs from "./components/Home/ContactUs";
import Blogs from "./components/Home/Blogs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import ScrollToTop from "./components/Home/scrollToTop";
import OurProjects from "./components/Home/OurProjects";

function App() {
  return (
    <Router>
   
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUS />} />
        <Route path="/ourservices" element={<OurServices />} />
        <Route path="/ourprojects" element={<OurProjects />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
