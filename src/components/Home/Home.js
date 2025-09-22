import "./rbd.css";
import { useState, useEffect } from "react";
import ScrollAnimateRight from "./ScrollAnimateRight";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import RealEstate from "./RealEstate";
import { Link } from "react-router-dom";
/* === URL HELPERS (dev-aware) === */

/* API base:
   - If Vite/CRA env is set, use it.
   - Else: in dev (ports 3000/5173) point to http://127.0.0.1:8080.
   - Else: same-origin (for prod behind a reverse proxy).
*/

const API_BASE = (() => {
  const pick = v => (typeof v === "string" && v.trim() ? v.trim().replace(/\/+$/g, "") : null);
  const fromVite = typeof import.meta !== "undefined" ? import.meta.env?.VITE_API_URL : undefined;
  const fromCRA  = typeof process !== "undefined" ? process.env?.REACT_APP_API_URL : undefined;
  const env = pick(fromVite) || pick(fromCRA);

  if (env) return env; // prefer env when available

  // Dev-only fallbacks
  if (typeof window !== "undefined" && window.location) {
    const { protocol, hostname, port } = window.location;
    const isDevPort = port === "3000" || port === "5173";
    if (isDevPort) {
      const devHost = (hostname === "localhost" || hostname === "127.0.0.1") ? "127.0.0.1" : hostname;
      return `${protocol}//${devHost}:8080`;
    }
  }

  // Final guard for production (no same-origin fallback)
  return "https://vercel-backend-three-rouge.vercel.app";
})();

/* Asset URL (subpath-safe, works on GitHub Pages / Vite base) */
const assetUrl = (pathFromPublic) => {
  const p = typeof pathFromPublic === "string" ? pathFromPublic : String(pathFromPublic ?? "");
  const baseRaw =
    typeof import.meta !== "undefined" ? import.meta.env?.BASE_URL : undefined;
  const base = typeof baseRaw === "string" && baseRaw ? baseRaw : "/";
  return `${base.replace(/\/+$/g, "")}/${p.replace(/^\/+/, "")}`;
};


/* POST helper with timeout + production-safe errors */
async function postJson(path, body, { timeoutMs = 12000 } = {}) {
  const isAbsolute = /^https?:\/\//i.test(path);
  const url = isAbsolute ? path : `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ac.signal,
    });
    let data = null;
    try { data = await res.json(); } catch {}
    if (!res.ok || (data && data.ok === false)) {
      throw new Error(data?.message || `HTTP ${res.status}`);
    }
    return data || { ok: true };
  } catch (e) {
    if (e?.name === "AbortError") throw new Error("Request timed out. Please retry.");
    throw e;
  } finally {
    clearTimeout(t);
  }
}

// optional: quick health check in dev to warn clearly in the console
if (typeof window !== "undefined") {
  fetch(`${API_BASE}/api/health`, { cache: "no-store" })
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(() => console.info("[API] reachable at", API_BASE))
    .catch(err => console.warn("[API] not reachable at", API_BASE, "-", err?.message || err));
}


const variants = {
  fadeUpContainer: { hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } },
  fadeUpItem: { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } },
  fadeIn: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } },
};

function Reveal({ as = "div", children, variant = "fadeUpItem", ...rest }) {
  const Comp = motion[as] ?? motion.div;
  const selected = variants[variant] ?? variants.fadeUpItem;
  const reduced = useReducedMotion();
  const viewport = reduced ? { amount: 0.2, once: true, margin: "0px 0px -20% 0px" } : { amount: 0.2, once: true };
  return (
    <Comp variants={selected} initial="hidden" whileInView="show" viewport={viewport} {...rest}>
      {children}
    </Comp>
  );
}

/* Testimonials data */
const testimonials = [
  { id: 1, name: "Ravi Kumar", role: "First-Time Homebuyer", location: "Bengaluru", text: "Buying a home can be stressful, but the team made the entire process smooth and transparent. From property visits to paperwork, everything was handled with professionalism. I’m now happily settled in my dream home!", rating: 5 },
  { id: 2, name: "Neha Sharma", role: "Property Investor", location: "Bengaluru", text: "What impressed me most was the honesty and clarity. They explained every detail about the property and guided me through financing options as well. I felt very secure making this investment.", rating: 5 },
  { id: 3, name: "Suresh Reddy", role: "IT Professional", location: "Bengaluru", text: "Excellent service! The staff understood my requirements perfectly and showed me properties within my budget and preferences. I found the right property in just two weeks.", rating: 5 },
  { id: 4, name: "Priya Mehta", role: "Homemaker", location: "Delhi", text: "I was new to the city and had no idea where to start. Their team not only helped me find a house but also guided me about the best localities, schools, and amenities. Truly customer-focused!", rating: 5 },
  { id: 5, name: "Arun Joshi", role: "Business Owner", location: "Bengaluru", text: "Highly reliable and trustworthy. The property I bought was exactly as promised—no hidden charges or surprises. I would definitely recommend them to anyone looking for real estate solutions.", rating: 5 },
];

export function HomePage() {
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MotionLink = motion(Link);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const name = e.target.firstName.value.trim();
    const email = e.target.emailTxt.value.trim();
    const phone = e.target.phone.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !phone || !message) {
      setFormMessage("Please fill in all fields.");
      return;
    }
    if (!/^[A-Za-z\s]{5,}$/.test(name)) {
      setFormMessage("Full name: Min 5 letters.");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/.test(email)) {
      setFormMessage("Enter a valid email address.");
      return;
    }
    if (!/^\+?\d{10,15}$/.test(phone)) {
      setFormMessage("Enter a valid mobile number (10–15 digits, optional +).");
      return;
    }

    try {
      setIsSubmitting(true);
      await postJson("/api/contact", {
        firstName: name,
        emailTxt: email,
        phone,
        message,
        source: "home",
      });
      setFormMessage("✅ Thank you, we’ll reach out soon!");
      e.target.reset();
    } catch (err) {
      setFormMessage(err?.message || "❌ Failed to submit. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App home-page">
      {/* Header */}
      <SiteHeader />

      {/* Contact/Hero */}
      <section
        className="element-contact-us"
        id="contact-us32"
        style={{
          backgroundImage: `url("${assetUrl("images/homebannerrbd.png")}")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Reveal>
          <motion.div className="hero-title" initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <h1>Experience Comfort Like Never Before</h1>
          </motion.div>

          <motion.div className="hero-subtitle mt-3" initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: "easeOut" }}>
            <h5>Homes designed for your lifestyle — where elegance meets everyday living.</h5>
          </motion.div>
        </Reveal>

        <Reveal variant="fadeIn">
          <motion.form
            className="form01 me-3"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            noValidate
          >
            <h5 className="fs-3 my-3 fw-bold">Get in Touch</h5>
            <div className="form-group">
              <input type="text" name="firstName" placeholder="Enter your Full Name" autoComplete="name" required />
            </div>
            <div className="form-group">
              <input type="email" name="emailTxt" placeholder="Enter your Email" autoComplete="email" required />
            </div>
            <div className="form-group">
              <input type="tel" name="phone" placeholder="Mobile No: [eg: 9876XXXXXX]" autoComplete="tel" inputMode="numeric" required />
            </div>
            <div className="form-group">
              <textarea name="message" maxLength={100} rows={2} placeholder="Write your message here..." />
            </div>

            <p aria-live="polite" style={{ color: formMessage.startsWith("✅") ? "green" : "red" }}>{formMessage}</p>

            <div className="form-submit mt-4">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                transition={{ duration: 0.15 }}
                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </motion.button>
            </div>
          </motion.form>
        </Reveal>
      </section>

      {/* ...rest unchanged (projects, carousel, sections, footer) ... */}

      {/* Projects (kept as-is) */}
      <section className="projects" style={{ color: "lightgray" }}>
        <Reveal as="h3" variant="fadeIn">
          <span style={{ fontSize: "45px", fontWeight: "bold" }}>EXPLORE OUR PROJECTS</span>
        </Reveal>

        <motion.div className="powercity" variants={variants.fadeUpContainer} initial="hidden" whileInView="show" viewport={{ amount: 0.2, once: true }}>
          <Reveal>
            <motion.div className="media-card" variants={variants.fadeUpItem} whileHover={{ y: -8 }} whileTap={{ scale: 0.98 }}>
              <div className="media-box">
                <motion.img
                  className="media-element"
                  src={assetUrl("images/aboutusrbd1.png")}
                  alt="Project image 1"
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.04 }}
                />
              </div>
              <div className="media-caption">Premium Apartments</div>
            </motion.div>
          </Reveal>

          <Reveal>
            <motion.div className="media-card" variants={variants.fadeUpItem} whileHover={{ y: -8 }} whileTap={{ scale: 0.98 }}>
              <div className="media-box">
                <motion.img
                  className="media-element"
                  src={assetUrl("images/ourservicereadytoregisterplots.png")}
                  alt="Project image 2"
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.04 }}
                />
              </div>
              <div className="media-caption">Ready-to-Register Plots</div>
            </motion.div>
          </Reveal>

          <Reveal>
            <motion.div className="media-card" variants={variants.fadeUpItem} whileHover={{ y: -8 }} whileTap={{ scale: 0.98 }}>
              <div className="media-box">
                
                <motion.img
                  className="media-element"
                  src={assetUrl("images/ourservicesfarmland.png")}
                  alt="Project image 2"
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.04 }}
                />  
              </div>
              <div className="media-caption">Walkthrough & Highlights</div>
            </motion.div>
          </Reveal>
        </motion.div>
      </section>

      <Reveal variant="fadeIn">
        <motion.div>
          <RealEstate />
        </motion.div>
      </Reveal>
      {/* Northern Lights */}
      <Reveal>
        <div className="element" id="our-project">
          <Reveal>
            <div className="element-1">
              <div style={{ fontSize: "40px" }}>
                <span style={{ fontWeight: "bold", fontSize: "45px", color: "goldenrod" }}>
                  Northern Lights
                </span>
              </div>
              <div className="fw-bold fs-5">Ready to Register Plots</div>
              <br />
              <div className="description">
                A premium plotted development offering A-Khata plots and BIAAPA approved layouts. Designed for those who
                value trust, transparency, and future growth, these ready-to-register plots ensure hassle-free ownership
                and promising returns. Secure your dream investment today at Northern Lights – where opportunity meets
                peace of mind.
              </div>
              <div className="mt-3">
                <ul>
                  <li>
                    <b>Plots&nbsp;:</b>&nbsp;30*40,&nbsp;30*50,&nbsp;40*60,&nbsp;50*60.
                  </li>
                  <li>
                    <b>Status&nbsp;:</b>&nbsp;On Going
                  </li>
                  <li>
                    <b>Price&nbsp;:</b>&nbsp;72,00,000₹&nbsp;Onwards
                  </li>
                </ul>
              </div>
              <div>
                <MotionLink
                  to="/ourprojects"
                  className="knowmore inline-block"
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                >
                  KNOW MORE
                </MotionLink>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="element-2 clip-frame">
              <motion.img
                className="clip-img"
                src={assetUrl("images/aboutustopimg.png")}
                alt="Developed Plots"
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.1 }}
              />
            </div>
          </Reveal>
        </div>
      </Reveal>

      {/* Know Us */}
      <div className="know-us">
        <Reveal>
          <div className="know-us1" style={{ maxWidth: 520, width: "100%", overflow: "hidden" }}>
            <motion.img
              style={{ marginRight: 0, width: "100%", height: "auto" }}
              className="animate"
              src={assetUrl("images/aboutusrbd1.png")}
              alt="Know Us"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.1 }}
            />
          </div>
        </Reveal>

        <ScrollAnimateRight className="scroll-from-right">
          <div className="know-us2" id="about-us">
            <div className="k-us1">KNOW US</div>
            <div className="k-us2">About Rathna Bhoomi</div>
            <div>
              At Rathna Bhoomi Developers, we believe that a home is more than just a structure it’s the foundation of
              dreams, security, and a better future. With a strong commitment to quality and transparency, we have been
              serving customers by providing ready-to-register plots, modern flats, and complete home construction
              solutions tailored to their needs.
            </div>
            <div>
              Our projects are built on the values of trust, customer satisfaction, and long-term value creation. Every
              development we undertake—be it premium residential plots, apartments, or custom home construction—is
              carefully planned, legally verified, and executed to the highest standards. We take pride in being a
              customer-centric real estate developer where every detail is handled with care, ensuring a smooth,
              hassle-free experience from start to finish.
            </div>
            <div>
              <Link to="/aboutus">
                <button
                  style={{ color: "goldenrod" }}
                  className="k-us3 fs-5 bg-transparent border border-0 btn bi bi-arrow-right"
                ></button>
              </Link>
            </div>
          </div>
        </ScrollAnimateRight>
      </div>

      {/* Services header */}
      <Reveal>
        <div className="services2" id="service">
          <Reveal as="div" variant="fadeIn" className="sub-service1">
            S E R V I C E S
          </Reveal>
          <Reveal as="div" variant="fadeIn" className="sub-service2">
            What We Do
          </Reveal>
        </div>
      </Reveal>

      {/* Services grid */}
      <motion.div
        className="services"
        variants={variants.fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Card 1 */}
        <Reveal>
          <motion.div
            className="service-card card1"

            variants={variants.fadeUpItem}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-media">
              <motion.img
                className="media-img"
                src={assetUrl("images/ourservicesapartments.png")}
                alt="Apartment Sales"
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.08 }}
              />
            </div>
            <div className="card-content">
              <div className="card-title fw-bold fs-5">Apartment Sales (Flats)</div>
              <span className="accent-bar" />
            </div>
          </motion.div>
        </Reveal>

        {/* Card 2 */}
        <Reveal>
          <motion.div
            className="service-card card2"
          
            variants={variants.fadeUpItem}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-media">
              <motion.img
                className="media-img"
                src={assetUrl("images/ourservicesfarmland.png")}
                alt="Farm Land Sales"
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.08 }}
              />
            </div>
            <div className="card-content">
              <div className="card-title fw-bold fs-5">Farm Land Sales</div>
              <span className="accent-bar" />
            </div>
          </motion.div>
        </Reveal>

        {/* Card 3 */}
        <Reveal>
          <motion.div
            className="service-card card3"
            
            variants={variants.fadeUpItem}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-media">
              <motion.img
                className="media-img"
                src={assetUrl("images/ourservicereadytoregisterplots.png")}
                alt="Ready-to-Register Plots"
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.08 }}
              />
            </div>
            <div className="card-content">
              <div className="card-title fw-bold fs-5">Ready-to-Register Plots</div>
              <span className="accent-bar" />
            </div>
          </motion.div>
        </Reveal>
      </motion.div>

      {/* View All CTA */}
      <Reveal>
        <div className="view1 mt-6">
          <MotionLink
            to="/ourservices"
            className="btn"
            style={{
              backgroundColor: "rgb(218, 110, 16)",
              color: "white",
              width: "160px",
              padding: "7px",
              fontSize: "20px",
              borderRadius: "20px",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            View All
          </MotionLink>
        </div>
      </Reveal>

      {/* Free Advisor / Investor Resources */}
      <Reveal>
        <div className="sass3">
          <div className="sass" style={{ marginTop: "130px" }}>
            <Reveal>
              <motion.div
                style={{ zIndex: "1", position: "relative" }}
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <motion.img
                  className="freeadvisor"
                  src={assetUrl("images/freeadvisor.jpg")}
                  alt="Property Advisor"
                  width="500"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  style={{ borderRadius: "20px", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
                />
              </motion.div>
            </Reveal>

            <Reveal>
              <motion.div
                className="sass2"
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div style={{ fontWeight: 800, fontSize: "40px", lineHeight: "45px" }}>
                  Free Investor Resources
                </div>
                <br />
                <div style={{ fontWeight: 700, fontSize: "18px", color: "orange" }}>
                  Are you risking your investment by not analyzing the area's profit potential?
                </div>
                <br />
                <div style={{ fontSize: "16px", color: "#444" }}>
                  We've got you covered. Get guidance from our most experienced property management
                  experts to support you every step of the way.
                </div>
                <div className="view-3 mt-4">
                  <motion.button
                    className="btn"
                    style={{
                      backgroundColor: "rgb(218, 110, 16)",
                      color: "white",
                      width: "250px",
                      padding: "10px 20px",
                      fontSize: "18px",
                      fontWeight: "600",
                      borderRadius: "30px",
                      boxShadow: "0 4px 12px rgba(218, 110, 16, 0.5)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Get Guidance Now
                  </motion.button>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </Reveal>

      {/* Guarantee header */}
      <Reveal variant="fadeIn">
        <div className="element-service">
          <span style={{ color: "orange", fontSize: "16px", letterSpacing: "5px" }}>
            OUR GUARANTEE
          </span>
          <span className="fs-1" style={{ fontWeight: 800 }}>
            We stand by our service
          </span>
          <span style={{ fontSize: "20px" }}>We back our words with action!</span>
        </div>
      </Reveal>

      {/* Guarantee cards */}
      <motion.div
        className="element-service-guarantee"
        variants={variants.fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="element-service-guarantee1">
          <Reveal>
            <motion.div className="element-service-guarantee-card1" variants={variants.fadeUpItem}>
              <div className="card-header">
                <img
                  src={assetUrl("images/client-satisfaction.png")}
                  alt="Client Satisfaction"
                  width="80"
                  height="80"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="card-body">
                <span className="fw-bold fs-5">Client Satisfaction Guarantee</span>
                <br />
                <br />
                <span>
                  We ensure client satisfaction through transparent dealings, legal clarity, premium quality
                  developments, timely delivery, and personalized support—building trust, value, and lifelong
                  relationships in every real estate transaction we undertake.
                </span>
              </div>
            </motion.div>
          </Reveal>

          <Reveal>
            <motion.div className="element-service-guarantee-card2" variants={variants.fadeUpItem}>
              <div className="card-header">
                <img
                  src={assetUrl("images/messages.png")}
                  alt="Communication Guarantee"
                  width="80"
                  height="80"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="card-body">
                <span className="fw-bold fs-5" style={{ marginLeft: "20px" }}>
                  Communication Guarantee
                </span>
                <br />
                <br />
                <span>
                  We guarantee clear, timely, and transparent communication at every stage of your real estate journey,
                  ensuring clients stay informed, confident, and supported from enquiry to registration and beyond,
                  building trust that lasts forever.
                </span>
              </div>
            </motion.div>
          </Reveal>

          <Reveal>
            <motion.div className="element-service-guarantee-card3" variants={variants.fadeUpItem}>
              <div className="card-header">
                <img
                  src={assetUrl("images/calender-done.png")}
                  alt="Register Now"
                  width="80"
                  height="80"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="card-body">
                <span className="fw-bold fs-5" style={{ marginLeft: "70px" }}>
                  Register Now
                </span>
                <br />
                <br />
                <span>
                  Register now to secure your dream plot or home with guaranteed legal approval, transparent process, and
                  premium locations—ensuring lasting value, timely ownership, and peace of mind for every client.
                </span>
              </div>
            </motion.div>
          </Reveal>
        </div>

        <div className="element-service-guarantee2">
          <Reveal>
            <motion.div className="element-service-guarantee-card4" variants={variants.fadeUpItem}>
              <div className="card-header">
                <img
                  src={assetUrl("images/cancellation.png")}
                  alt="Cancellation Guarantee"
                  width="80"
                  height="80"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="card-body">
                <span className="fw-bold fs-5" style={{ marginLeft: "30px" }}>
                  Cancellation Guarantee
                </span>
                <br />
                <br />
                <span>
                  We provide a fair and transparent cancellation guarantee, ensuring clients experience hassle-free
                  processes, clear refund policies, and peace of mind while securing their dream property with complete
                  confidence.
                </span>
              </div>
            </motion.div>
          </Reveal>

          <Reveal>
            <motion.div className="element-service-guarantee-card5" variants={variants.fadeUpItem}>
              <div className="card-header">
                <img
                  src={assetUrl("images/timericons.png")}
                  alt="Timely delivery"
                  width="100"
                  height="80"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="card-body">
                <span className="fw-bold fs-5" style={{ marginLeft: "70px" }}>
                  Timely delivery
                </span>
                <br />
                <br />
                <span>
                  We are committed to timely delivery of every project, ensuring clients receive their plots, flats, or
                  homes as promised, with transparency, reliability, and trust guiding every step of the process.
                </span>
              </div>
            </motion.div>
          </Reveal>

          <Reveal>
            <motion.div className="element-service-guarantee-card6" variants={variants.fadeUpItem}>
              <div className="card-header">
                <img
                  src={assetUrl("images/support.png")}
                  alt="24/7 Support"
                  width="80"
                  height="80"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="card-body">
                <span className="fw-bold fs-5" style={{ marginLeft: "70px" }}>
                  24/7 Support
                </span>
                <br />
                <br />
                <span>
                  We offer 24/7 dedicated support, ensuring clients receive prompt assistance, clear guidance, and
                  reliable solutions at any time—making every step of their real estate journey smooth and stress-free
                </span>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </motion.div>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="position-relative overflow-hidden py-4 mt-lg-5"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        style={{ background: "linear-gradient(180deg, rgba(246,250,255,1) 0%, rgba(255,255,255,1) 100%)" }}
      >
        {/* Floating backgrounds */}
        <div className="position-absolute top-0 end-0 w-100 h-100" style={{ pointerEvents: "none" }}>
          <motion.div
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 15, 0] }}
            transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="position-absolute rounded-circle"
            style={{
              top: -110,
              right: -90,
              width: 240,
              height: 240,
              background: "radial-gradient(closest-side, rgba(99,102,241,0.18), rgba(99,102,241,0.0))",
              filter: "blur(50px)",
            }}
          />
          <motion.div
            animate={{ x: [0, -35, 20, 0], y: [0, 25, -10, 0] }}
            transition={{ duration: 26, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="position-absolute rounded-circle"
            style={{
              bottom: -110,
              left: -90,
              width: 260,
              height: 260,
              background: "radial-gradient(closest-side, rgba(16,185,129,0.18), rgba(16,185,129,0.0))",
              filter: "blur(52px)",
            }}
          />
        </div>

        <div className="position-relative container-fluid">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2"
              style={{ background: "#eef7ff", color: "#0b5ed7", fontWeight: 600, fontSize: 13 }}
            >
              <Star className="me-1" size={14} />
              Real Client Voices
            </div>
            <h2 className="fw-bold" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#0f172a" }}>
              Our Testimonials
            </h2>
            <p className="mx-auto mt-2" style={{ maxWidth: 640, fontSize: 16, color: "#475569" }}>
              Our commitment to quality living reflects in the voices of our residents. Read their experiences and
              discover why our community stands apart.
            </p>
          </motion.div>

          <div className="position-relative">
            <div className="position-relative mb-3 testimonials-stage">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                >
                  <div className="testimonial-wrap">
                    <div className="bg-white rounded-4 shadow-sm border border-light p-3 p-sm-4 position-relative overflow-hidden">
                      <div
                        className="position-absolute"
                        style={{ top: 8, right: 12, color: "rgba(15, 23, 42, 0.08)", pointerEvents: "none" }}
                        aria-hidden="true"
                      >
                        <Quote size={64} />
                      </div>

                      <div className="d-flex gap-1 mt-5">
                        {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                          <Star key={i} size={16} style={{ color: "#f59e0b" }} />
                        ))}
                      </div>

                      <blockquote
                        className="mb-3 my-lg-4"
                        style={{ fontSize: 18, lineHeight: 1.55, color: "#1f2937", fontWeight: 500 }}
                      >
                        “{testimonials[currentIndex].text}”
                      </blockquote>

                      <div className="border-top pt-2">
                        <h4 className="h6 fw-bold mb-1" style={{ color: "#0f172a" }}>
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="mb-1" style={{ color: "#64748b", fontSize: 14 }}>
                          {testimonials[currentIndex].role}
                        </p>
                        <p className="mb-0 small" style={{ color: "#94a3b8" }}>
                          {testimonials[currentIndex].location}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-2">
              <button
                onClick={(() => () => setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length))()}
                className="btn btn-outline-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40, borderWidth: 2 }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="d-flex gap-2">
                {testimonials.map((_, index) => {
                  const active = index === currentIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className="border-0"
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 2,
                        transform: active ? "scale(1.6)" : "scale(1)",
                        background: active ? "#0b5ed7" : "#cbd5e1",
                        transition: "transform 220ms, background 220ms",
                      }}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  );
                })}
              </div>

              <button
                onClick={(() => () => setCurrentIndex((p) => (p + 1) % testimonials.length))()}
                className="btn btn-outline-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40, borderWidth: 2 }}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="mt-2">
              <div className="w-100 d-flex align-items-center gap-1">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 3,
                      background:
                        i <= currentIndex
                          ? "linear-gradient(90deg, #0b5ed7 0%, #3b82f6 100%)"
                          : "#e2e8f0",
                      borderRadius: 2,
                      transition: "background 300ms",
                    }}
                  />
                ))}
              </div>
              <div className="d-flex justify-content-between mt-2 small" style={{ color: "#6b7280" }}>
                <span>Client highlights</span>
                <span>
                  {currentIndex + 1} of {testimonials.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp + Contact Stickers */}
      <div className="sticker p-3">
        <a href="https://wa.me/919538752960" target="_blank" rel="noopener noreferrer">
          <div className="wp-sticker p-2 text-white rounded rounded-circle">
            <i className="bi bi-whatsapp"></i>
          </div>
        </a>
        <br />
        <a href="tel:+919538752960">
          <div className="contact-sticker bg-secondary p-2 text-white rounded rounded-circle">
            <i className="bi bi-telephone"></i>
          </div>
        </a>
      </div>

      {/* Footer */}
      <Reveal variant="fadeIn">
        <SiteFooter />
      </Reveal>
    </div>
  );
}
