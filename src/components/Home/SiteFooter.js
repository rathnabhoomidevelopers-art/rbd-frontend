import { Link } from "react-router-dom";
import "./rbd.css";

function assetUrl(pathFromPublic = "") {
  const base =
    (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";
  return `${base.replace(/\/+$/, "")}/${String(pathFromPublic).replace(/^\/+/, "")}`;
}

export default function SiteFooter() {
  return (
    <footer>

      <div>
        <span className="footer-title">CONTACT US</span>

        <a
          href="tel:+919538752960"
          style={{ color: "white", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
          aria-label="Call us at +91 9538752960"
        >
          <i className="bi bi-telephone-fill fs-4" style={{ color: "goldenrod" }} aria-hidden="true"></i>
          +91&nbsp;9538752960
        </a>

        <a
          href="mailto:contact@rathnabhoomidevelopers.com"
          style={{ color: "white", textDecoration: "none", display: "block", marginTop: 8 }}
          aria-label="Email contact at rathnabhoomidevelopers.com"
        >
          <span style={{ display: "flex", gap: "10px" }}>
            <i className="bi bi-envelope fs-4" style={{ color: "goldenrod" }} aria-hidden="true"></i>
            contact@rathnabhoomidevelopers.com
          </span>
        </a>

        <address style={{ marginTop: 8, fontStyle: "normal", color: "white" }}>
          <i className="bi bi-geo-alt fs-4" style={{ color: "goldenrod" }} aria-hidden="true"></i>{" "}
          No.23, E-Block, 14th Main Rd, Sahakar Nagar, Bangalore
        </address>
      </div>

      <div
        className="d-none d-lg-block ps-lg-5 footer-divider-lr"
        style={{ color: "white" }}
        aria-label="Quick links"
      >
        <span className="footer-title">QUICK LINKS</span>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}><span>Home</span></Link>
        <Link to="/aboutus" style={{ color: "white", textDecoration: "none" }}><span>About Us</span></Link>
        <Link to="/ourprojects" style={{ color: "white", textDecoration: "none" }}><span>Our Projects</span></Link>
        <Link to="/ourservices" style={{ color: "white", textDecoration: "none" }}><span>Services</span></Link>
        <Link to="/blogs" style={{ color: "white", textDecoration: "none" }}><span>Blogs</span></Link>
        <Link to="/contactus" style={{ color: "white", textDecoration: "none" }}><span>Contact Us</span></Link>
      </div>

      <div className="footer-divider-r" style={{ height: "250px" }}>
        <span style={{ fontSize: "22px", fontWeight: "bold" }}>Follow us</span>
        <span style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
          <a
            href="https://www.facebook.com/profile.php?id=61576906319237"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
          >
            <span className="bi bi-facebook text-white" aria-hidden="true"></span>
          </a>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
          <a
            href="https://www.instagram.com/rathnabhoomidevelopers/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <span className="bi bi-instagram text-white" aria-hidden="true"></span>
          </a>
          <a
            href="https://wa.me/919538752960"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <span className="bi bi-whatsapp text-white" aria-hidden="true"></span>
          </a>
        </span>

        <span style={{ marginTop: 10, display: "inline-block" }}>Privacy Policy</span>
      </div>

      <div className="map-container">
        <iframe
          className="maps"
          title="Rathna Bhoomi Developers Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3694.334909405837!2d77.58983757484292!3d13.058396887265044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42d433ccbeaf935b%3A0x13b0bdc66c58e9dc!2sRathna%20Bhoomi%20Developers!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          style={{ minHeight: 280, border: 0, width: "100%" }}
        />
      </div>
    </footer>
  );
}
