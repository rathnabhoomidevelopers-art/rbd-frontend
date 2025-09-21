import "./rbd.css";
import { useMemo } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { motion } from "framer-motion";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const assetUrl = (pathFromPublic) =>
  (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL)
    ? `${import.meta.env.BASE_URL.replace(/\/+$/, "")}/${pathFromPublic.replace(/^\/+/, "")}`
    : `/${pathFromPublic.replace(/^\/+/, "")}`;

export function OurServices() {
  const supportsIO = useMemo(
    () => typeof window !== "undefined" && "IntersectionObserver" in window,
    []
  );

  const variants = {
    fadeUpContainer: {
      hidden: { opacity: 0, y: 50 },
      show: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.2, duration: 0.6, ease: "easeOut" },
      },
    },
    fadeUpItem: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    },
  };

  const ivProps = supportsIO
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.2 } }
    : { initial: "hidden", animate: "show" };

  const imgIvProps = supportsIO
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" },
      }
    : {
        initial: { opacity: 0, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.01 },
      };

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <div className="services2" id="service" style={{ marginTop: "150px" }}>
        <div className="sub-service1">S E R V I C E S</div>
        <div className="sub-service2">What We Do</div>
      </div>

      <motion.div className="services" variants={variants.fadeUpContainer} {...ivProps}>

        <motion.div
          className="service-card card1"
          style={{ height: "100%", overflow: "hidden" }}
          variants={variants.fadeUpItem}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          initial="rest"
          animate="rest"
        >
          <div className="card-media">
            <motion.img
              className="media-img"
              src={assetUrl("images/ourservicesapartments.png")}
              alt="Apartment Sales"
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.08 }}
              {...imgIvProps}
            />
          </div>
          <div className="card-content">
            <div className="card-title fw-bold fs-5">Apartment Sales (Flats)</div>
            <span className="accent-bar" aria-hidden="true" />
          </div>
        </motion.div>

        <motion.div
          className="service-card card2"
          style={{ height: "100%", overflow: "hidden" }}
          variants={variants.fadeUpItem}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          initial="rest"
          animate="rest"
        >
          <div className="card-media">
            <motion.img
              className="media-img"
              src={assetUrl("images/ourservicesfarmland.png")}
              alt="Farm Land Sales"
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.08 }}
              {...imgIvProps}
            />
          </div>
          <div className="card-content">
            <div className="card-title fw-bold fs-5">Farm Land Sales</div>
            <span className="accent-bar" aria-hidden="true" />
          </div>
        </motion.div>

        <motion.div
          className="service-card card3"
          style={{ height: "100%", overflow: "hidden" }}
          variants={variants.fadeUpItem}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          initial="rest"
          animate="rest"
        >
          <div className="card-media">
            <motion.img
              className="media-img"
              src={assetUrl("images/ourservicereadytoregisterplots.png")}
              alt="Ready-to-Register Plots"
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.08 }}
              {...imgIvProps}
            />
          </div>
          <div className="card-content">
            <div className="card-title fw-bold fs-5">Ready-to-Register Plots</div>
            <span className="accent-bar" aria-hidden="true" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="services" variants={variants.fadeUpContainer} {...ivProps}>

        <motion.div
          className="service-card card1"
          style={{ height: "100%", overflow: "hidden" }}
          variants={variants.fadeUpItem}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          initial="rest"
          animate="rest"
        >
          <div className="card-media">
            <motion.img
              className="media-img"
              src={assetUrl("images/plantation.png")}
              alt="Plantation Ideas"
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.08 }}
              {...imgIvProps}
            />
          </div>
          <div className="card-content">
            <div className="card-title fw-bold fs-5">Plantation Ideas</div>
            <span className="accent-bar" aria-hidden="true" />
          </div>
        </motion.div>

        <motion.div
          className="service-card card2"
          style={{ height: "100%", overflow: "hidden" }}
          variants={variants.fadeUpItem}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          initial="rest"
          animate="rest"
        >
          <div className="card-media">
            <motion.img
              className="media-img"
              src={assetUrl("images/apartmentcontruction.jpg")}
              alt="Apartment Construction"
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.08 }}
              {...imgIvProps}
            />
          </div>
          <div className="card-content">
            <div className="card-title fw-bold fs-5">Apartment Construction</div>
            <span className="accent-bar" aria-hidden="true" />
          </div>
        </motion.div>

        <motion.div
          className="service-card card3"
          style={{ height: "100%", overflow: "hidden" }}
          variants={variants.fadeUpItem}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          initial="rest"
          animate="rest"
        >
          <div className="card-media">
            <motion.img
              className="media-img"
              src={assetUrl("images/homeconstruction.jpg")}
              alt="Home Construction"
              loading="lazy"
              decoding="async"
              whileHover={{ scale: 1.08 }}
              {...imgIvProps}
            />
          </div>
          <div className="card-content">
            <div className="card-title fw-bold fs-5">Home Construction</div>
            <span className="accent-bar" aria-hidden="true" />
          </div>
        </motion.div>
      </motion.div>
      
      {/* whatsapp and call Stickers */}
      <div className="sticker p-3">
        <a href="https://wa.me/917483060728" target="_blank" rel="noopener noreferrer">
          <div className="wp-sticker p-2 text-white rounded rounded-circle">
            <i className="bi bi-whatsapp" />
          </div>
        </a>
        <br />
        <a href="tel:+917483060728">
          <div className="contact-sticker bg-secondary p-2 text-white rounded rounded-circle">
            <i className="bi bi-telephone" />
          </div>
        </a>
      </div>
      <div className="mt-lg-5">
        <SiteFooter />
      </div>
    </div>
  );
}

export default OurServices;
