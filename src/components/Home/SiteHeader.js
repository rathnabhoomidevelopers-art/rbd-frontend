import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import "./rbd.css";

function assetUrl(pathFromPublic = "") {
  const base =
    (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";
  return `${base.replace(/\/+$/, "")}/${String(pathFromPublic).replace(/^\/+/, "")}`;
}

export default function SiteHeader() {
  const [sticky, setSticky] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 992) setNavOpen(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize, { passive: true });

    const prev = document.body.style.overflow;
    if (navOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev || "";

    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = prev || "";
    };
  }, [navOpen]);

  return (
    <motion.header
      className={sticky ? "sticky-header" : ""}
      style={{ backgroundColor: "rgb(255,216,157)" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="header-bar">

        <Link to="/" className="brand" aria-label="Rathna Bhoomi Developers">
          <img
            src={assetUrl("images/rathnabhoomi-logo-cutted.png")}
            alt="Rathna Bhoomi Developers"
            className="brand-logo"
            width={160}
            height={46}
            loading="eager"
            decoding="async"
          />
        </Link>

        <nav className="main-nav desktop-only" aria-label="Primary">
          <Link to="/"><span>Home</span></Link>
          <Link to="/aboutus"><span>About Us</span></Link>
          <Link to="/ourprojects"><span>Projects</span></Link>
          <Link to="/ourservices"><span>Services</span></Link>
          <Link to="/blogs"><span>Blogs</span></Link>
          <Link to="/contactus"><span>Contact Us</span></Link>
        </nav>

        <button
          type="button"
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={navOpen}
          aria-controls="mobile-primary-nav"
          onClick={() => setNavOpen((v) => !v)}
        >
          <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
        </button>
      </div>

      <nav
        id="mobile-primary-nav"
        className={`mobile-drawer ${navOpen ? "open" : ""}`}
        aria-label="Mobile Primary"
      >
        <Link to="/" onClick={() => setNavOpen(false)}>Home</Link>
        <Link to="/aboutus" onClick={() => setNavOpen(false)}>About Us</Link>
        <Link to="/ourprojects" onClick={() => setNavOpen(false)}>Our Projects</Link>
        <Link to="/ourservices" onClick={() => setNavOpen(false)}>Services</Link>
        <Link to="/blogs" onClick={() => setNavOpen(false)}>Blogs</Link>
        <Link to="/contactus" onClick={() => setNavOpen(false)}>Contact Us</Link>
      </nav>
    </motion.header>
  );
}
