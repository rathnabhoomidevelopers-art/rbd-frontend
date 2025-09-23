import "./rbd.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useRef, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  MapPin,
  Phone as PhoneIcon,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Home,
  Star,
  MessageSquare,
  MessageCircle,
} from "lucide-react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const joinUrl = (base, path) =>
  `${(base || "").replace(/\/+$/g, "")}${path.startsWith("/") ? "" : "/"}${path}`;

async function postJson({ base, path, body, timeoutMs = 12000 }) {
  const url = joinUrl(base, path);
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
    try {
      data = await res.json();
    } catch {
    }
    if (!res.ok || (data && data.ok === false)) {
      throw new Error(data?.message || `HTTP ${res.status}`);
    }
    return data || { ok: true };
  } finally {
    clearTimeout(t);
  }
}

const Badge = ({ className = "", children }) => (
  <span className={`badge rounded-pill fw-semibold ${className}`} style={{ padding: "8px 12px" }}>
    {children}
  </span>
);
const Card = ({ className = "", children, style }) => (
  <div
    className={`rounded-4 shadow-lg border-0 ${className}`}
    style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(6px)", ...style }}
  >
    {children}
  </div>
);
const CardContent = ({ className = "", children }) => (
  <div className={`p-4 p-md-5 ${className}`}>{children}</div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const containerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const floatLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4 } },
};
const floatRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.6 } },
};

export default function ContactUs({

  onSubmit,
  apiBase = import.meta?.env?.VITE_API_URL || "http://localhost:8080",
}) {
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  const isTest =
    typeof process !== "undefined" && process.env && process.env.NODE_ENV === "test";
  const supportsIO = useMemo(
    () => typeof window !== "undefined" && "IntersectionObserver" in window,
    []
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const name = e.target.firstName.value.trim();
    const email = e.target.emailTxt.value.trim();
    const phone = e.target.phone.value.replace(/[^\d]/g, "");
    const message = e.target.message.value.trim();

    if (!name || !email || !phone || !message) {
      setFormMessage("Please fill in all fields.");
      return;
    }
    if (!/^[A-Za-z\s]{5,}$/.test(name)) {
      setFormMessage("Fullname: Min 5 letters.");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/.test(email)) {
      setFormMessage("Enter a valid email address.");
      return;
    }
    if (!/^(?:\+91|0)?[6-9]\d{9}$/.test(phone.replace(/[^\d+]/g, ""))) {
      setFormMessage("Enter a valid mobile number");
      return;
    }


    try {
      setIsSubmitting(true);
      if (typeof onSubmit === "function") {
        const data = await onSubmit({
          firstName: name,
          emailTxt: email,
          phone,
          message,
          source: "contactus",
        });
        if (!data?.ok) throw new Error(data?.message || "Failed to submit");
      } else {
        await postJson({
          base: apiBase,
          path: "/api/contact",
          body: { firstName: name, emailTxt: email, phone, message, source: "contactus" },
        });
      }
      setFormMessage("✅ Thank you, we’ll reach out soon!");
      e.target.reset();
      setTimeout(() => setFormMessage(""), 2500);
    } catch (err) {
      console.error(err);
      setFormMessage("❌ Failed to submit. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const iv = supportsIO
    ? { whileInView: "show", initial: "hidden", viewport: { once: true, amount: 0.2 } }
    : { animate: "show", initial: "hidden" };

  return (
    <div className="min-h-screen bg-white">
      {!isTest && (
        <motion.div
          style={{
            scaleX,
            transformOrigin: "0% 50%",
            height: 3,
            background: "linear-gradient(90deg,#D97706,#EA580C)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
          }}
        />
      )}

      <SiteHeader />

      <section
        className="position-relative d-flex align-items-center justify-content-center overflow-hidden"
        style={{ height: "60vh", marginTop: "0" }}
      >
        <motion.div
          className="position-absolute top-0 bottom-0 start-0 end-0"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/828895/pexels-photo-828895.jpeg?auto=compress&cs=tinysrgb&h=1400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ scale: 1.06, opacity: 0.9 }}
          {...(isTest
            ? { animate: { scale: 1.06 } }
            : {
                animate: { scale: [1.06, 1.1, 1.06] },
                transition: { duration: 18, repeat: Infinity, ease: "easeInOut" },
              })}
        />

        <motion.div
          className="position-absolute top-0 bottom-0 start-0 end-0"
          initial={{ opacity: 0.7 }}
          {...(isTest
            ? { animate: { opacity: 0.75 } }
            : {
                animate: { opacity: [0.7, 0.85, 0.7] },
                transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              })}
          style={{
            background: "linear-gradient(90deg, rgba(180,83,9,0.85), rgba(234,88,12,0.75))",
          }}
        />

        <motion.div
          {...iv}
          variants={containerStagger}
          className="position-relative text-center text-white px-3"
          style={{ zIndex: 1, maxWidth: 880 }}
        >
          <motion.div variants={fadeUp}>
            <Badge className="bg-white text-dark border-0 mb-3">Trusted Property Advisors</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="fw-bold"
            style={{ fontSize: "clamp(32px, 6vw, 56px)", lineHeight: 1.1 }}
          >
            Find a{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(90deg,#fff,#ffe2b7)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Home You Love
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="lead mt-3 mb-4"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Talk to our local experts and explore hand-picked properties that fit your plans.
          </motion.p>

          <motion.div variants={fadeUp} className="d-flex flex-wrap justify-content-center gap-3">
            <a href="tel:+919538752960">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn d-inline-flex align-items-center justify-content-center gap-2 text-white px-5 py-5 fw-semibold shadow"
                style={{
                  borderRadius: 9999,
                  backgroundImage: "linear-gradient(to right, #D97706, #EA580C)",
                  border: "none",
                  width: "150px",
                }}
                aria-label="Call now"
              >
                <PhoneIcon size={18} />
                <span>Call Now</span>
              </motion.button>
            </a>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToForm}
              className="btn d-inline-flex align-items-center justify-content-center gap-2 text-white px-4 py-2 fw-semibold"
              style={{
                borderRadius: 9999,
                border: "2px solid rgba(255,255,255,0.5)",
                background: "transparent",
                lineHeight: 1,
              }}
              aria-label="Book a visit"
            >
              <MessageSquare size={18} />
              <span>Book a Visit</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          {...iv}
          variants={floatLeft}
          className="position-absolute d-none d-lg-block"
          style={{ left: 24, top: "45%" }}
        >
          <Card>
            <CardContent className="py-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 48, height: 48, background: "#22c55e" }}
                >
                  <Home size={22} color="#fff" />
                </div>
                <div>
                  <div className="fw-semibold text-dark">1,200+ </div>
                  <div className="text-muted small">Homes Matched</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          {...iv}
          variants={floatRight}
          className="position-absolute d-none d-lg-block"
          style={{ right: 24, top: "28%" }}
        >
          <Card>
            <CardContent className="py-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 48, height: 48, background: "#3b82f6" }}
                >
                  <Star size={22} color="#fff" />
                </div>
                <div>
                  <div className="fw-semibold text-dark">4.9/5</div>
                  <div className="text-muted small">Customer Satisfaction</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className="py-5 py-md-5 px-3">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            {...(supportsIO
              ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
              : { animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.6 }}
            className="text-center mb-4 mb-md-5"
          >
            <Badge className="bg-warning-subtle text-dark border-0 mb-3">Talk to Our Team</Badge>
            <h2 className="fw-bold" style={{ fontSize: "clamp(26px, 4.5vw, 40px)" }}>
              Ready to Take the Next Step?
            </h2>
            <p className="text-muted lead" style={{ maxWidth: 860, margin: "10px auto 0" }}>
              Buying, selling, or investing—we’ll guide you from first call to closing.
            </p>
          </motion.div>

          <div className="row g-4">
            <div className="col-lg-7 mt-lg-5" ref={formRef}>
              <motion.div {...iv} variants={containerStagger}>
                <Card>
                  <CardContent>
                    <motion.div
                      variants={fadeUp}
                      className="d-flex align-items-center gap-3 mb-2"
                    >
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: 40, height: 40, background: "#2563eb" }}
                      >
                        <Send size={18} color="#fff" />
                      </div>
                      <h3 className="fw-bold fs-4 m-0" style={{ color: "#111827" }}>
                        Contact Our Team
                      </h3>
                    </motion.div>
                    <motion.p variants={fadeUp} className="text-muted mb-4">
                      Share a few details and we’ll reach out shortly.
                    </motion.p>

                    <motion.form
                      variants={fadeUp}
                      className="form02"
                      onSubmit={handleSubmit}
                      aria-label="contact form"
                    >
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="firstName" className="form-label text-muted">
                            Full Name *
                          </label>
                          <div className="position-relative">
                            <i
                              className="bi bi-person position-absolute"
                              style={{
                                left: 12,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#9CA3AF",
                              }}
                              aria-hidden="true"
                            />
                            <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              placeholder="Enter your Fullname"
                              autoComplete="name"
                              required
                              className="form-control w-75"
                              style={{
                                height: 48,
                                paddingLeft: 38,
                                borderColor: "#E5E7EB",
                                background: "rgba(255,255,255,0.9)",
                                borderRadius: 12,
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="emailTxt" className="form-label text-muted">
                            Email *
                          </label>
                          <div className="position-relative">
                            <i
                              className="bi bi-envelope position-absolute"
                              style={{
                                left: 12,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#9CA3AF",
                              }}
                              aria-hidden="true"
                            />
                            <input
                              id="emailTxt"
                              name="emailTxt"
                              type="email"
                              placeholder="Enter your Email"
                              autoComplete="email"
                              required
                              className="form-control w-75"
                              style={{
                                height: 48,
                                paddingLeft: 38,
                                borderColor: "#E5E7EB",
                                background: "rgba(255,255,255,0.9)",
                                borderRadius: 12,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <label htmlFor="phone" className="form-label text-muted">
                          Phone *
                        </label>
                        <div className="position-relative">
                          <PhoneIcon
                            size={16}
                            className="position-absolute"
                            style={{
                              left: 12,
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "#9CA3AF",
                            }}
                            aria-hidden="true"
                          />
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Mobile_no:[eg: 9876XXXXXX]"
                            autoComplete="tel"
                            inputMode="numeric"
                            required
                            className="form-control w-75"
                            style={{
                              height: 48,
                              paddingLeft: 38,
                              borderColor: "#E5E7EB",
                              background: "rgba(255,255,255,0.9)",
                              borderRadius: 12,
                            }}
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label htmlFor="message" className="form-label text-muted">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          maxLength={100}
                          rows={3}
                          placeholder="Tell us a bit about your request…"
                          className="form-control"
                          style={{
                            borderColor: "#E5E7EB",
                            background: "rgba(255,255,255,0.9)",
                            borderRadius: 12,
                          }}
                        />
                      </div>

                      <p
                        style={{ color: formMessage.startsWith("✅") ? "green" : "red" }}
                        className="mt-2 mb-1"
                        role="status"
                        aria-live="polite"
                      >
                        {formMessage}
                      </p>

                      <div className="mt-3 d-flex justify-content-center">
                        <motion.button
                          type="submit"
                          whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -1 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-25 fs-5 text-white fw-semibold shadow"
                          disabled={isSubmitting}
                          aria-busy={isSubmitting}
                          style={{
                            height: 48,
                            borderRadius: 9999,
                            backgroundImage: "linear-gradient(to right, #D97706, #EA580C)",
                            border: "none",
                            opacity: isSubmitting ? 0.75 : 1,
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                          }}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </motion.button>
                      </div>

                      <div className="text-center text-muted" style={{ fontSize: 12, marginTop: 8 }}>
                        We respect your privacy. Your details stay with us.
                      </div>
                    </motion.form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="col-lg-5 mt-lg-5">
              <motion.div {...iv} variants={containerStagger}>
                <motion.div variants={fadeUp}>
                  <Card>
                    <CardContent>
                      <h4 className="fw-bold fs-4 mb-3" style={{ color: "#111827" }}>
                        Contact Options
                      </h4>
                      <div className="d-grid gap-3">
                        <a href="tel:+919538752960" className="text-decoration-none">
                          <motion.div
                            whileHover={{ y: -2 }}
                            className="d-flex align-items-start gap-3 p-3 rounded-3"
                            style={{ background: "#f8fafc" }}
                          >
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{ width: 40, height: 40, background: "#22c55e" }}
                            >
                              <PhoneIcon size={18} color="#fff" />
                            </div>
                            <div className="flex-grow-1">
                              <div className="fw-semibold text-dark">Phone Support</div>
                              <div className="text-dark">+91 9538752960</div>
                              <div className="text-muted small">7 days a week</div>
                            </div>
                            <i className="bi bi-box-arrow-up-right text-muted" aria-hidden="true" />
                          </motion.div>
                        </a>
                        <a
                          href="mailto:contact@rathnabhoomidevelopers.com"
                          className="text-decoration-none"
                        >
                          <motion.div
                            whileHover={{ y: -2 }}
                            className="d-flex align-items-start gap-3 p-3 rounded-3"
                            style={{ background: "#f8fafc" }}
                          >
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{ width: 40, height: 40, background: "#3b82f6" }}
                            >
                              <Mail size={18} color="#fff" />
                            </div>
                            <div className="flex-grow-1">
                              <div className="fw-semibold text-dark">Email Support</div>
                              <div className="text-dark">
                                contact@rathnabhoomidevelopers.com
                              </div>
                              <div className="text-muted small">Typical reply within: 24 hours</div>
                            </div>
                            <i className="bi bi-box-arrow-up-right text-muted" aria-hidden="true" />
                          </motion.div>
                        </a>
                        <a
                          href="https://wa.me/919538752960"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          <motion.div
                            whileHover={{ y: -2 }}
                            className="d-flex align-items-start gap-3 p-3 rounded-3"
                            style={{ background: "#f8fafc" }}
                          >
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{ width: 40, height: 40, background: "#a855f7" }}
                            >
                              <MessageCircle size={18} color="#fff" />
                            </div>
                            <div className="flex-grow-1">
                              <div className="fw-semibold text-dark">WhatsApp Chat</div>
                              <div className="text-dark">Instant support</div>
                              <div className="text-muted small">9 AM – 9 PM</div>
                            </div>
                            <i className="bi bi-box-arrow-up-right text-muted" aria-hidden="true" />
                          </motion.div>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-3">
                  <Card>
                    <CardContent>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Clock size={18} className="text-primary" />
                        <h5 className="fw-bold m-0" style={{ color: "#111827" }}>
                          Business Hours
                        </h5>
                      </div>
                      <div className="d-grid gap-2">
                        <div className="d-flex justify-content-between border-bottom pb-2">
                          <span className="fw-medium text-dark">Mon – Fri</span>
                          <span className="text-muted">9:30 AM – 5:30 PM</span>
                        </div>
                        <div className="d-flex justify-content-between border-bottom pb-2">
                          <span className="fw-medium text-dark">Saturday</span>
                          <span className="text-muted">9:30 AM – 5:30 PM</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span className="fw-medium text-dark">Sunday</span>
                          <span className="text-muted">9:30 AM – 5:30 PM</span>
                        </div>
                      </div>
                      <div className="mt-3 p-3 rounded-3" style={{ background: "#eff6ff" }}>
                        <span className="small" style={{ color: "#1d4ed8" }}>
                          <strong>Emergency Service:</strong> Urgent help available 24/7
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-3">
                  <Card>
                    <CardContent>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <MapPin size={18} className="text-danger" />
                        <h5 className="fw-bold m-0" style={{ color: "#111827" }}>
                          Find Us
                        </h5>
                      </div>
                      <div className="mb-3">
                        <div className="text-dark fw-semibold">Rathna Bhoomi Developers</div>
                        <div className="text-muted">
                          No.23, E-Block, 14th main Rd, Sahakar Nagar, Bangalore
                        </div>
                      </div>
                      <a
                        href="https://maps.app.goo.gl/GDwa6qFt5LvKYcTq5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn w-100 fw-semibold"
                        style={{ background: "#f3f4f6", borderRadius: 12 }}
                      >
                        Open in Google Maps
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {formMessage.startsWith("✅") && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="position-fixed top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}
          role="alertdialog"
          aria-label="Submission success"
          aria-modal="true"
        >
          <Card style={{ maxWidth: 420 }}>
            <CardContent className="text-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: 64, height: 64, background: "#22c55e" }}
              >
                <CheckCircle size={32} color="#fff" />
              </div>
              <h4 className="fw-bold text-dark mb-2">Thanks for reaching out!</h4>
              <div className="text-muted">
                We’ve received your message. Our team will contact you within 24 hours.
              </div>
              <div className="mt-3">
                <Badge className="bg-success-subtle text-success-emphasis border-0">
                  Reply in 24 hours
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* whatsapp and call Stickers */}
      <div className="sticker p-3">
        <a href="https://wa.me/917483060728" target="_blank" rel="noopener noreferrer">
          <div className="wp-sticker p-2 text-white rounded rounded-circle">
            <i className="bi bi-whatsapp" aria-hidden="true"></i>
          </div>
        </a>
        <br />
        <a href="tel:+917483060728">
          <div className="contact-sticker bg-secondary p-2 text-white rounded rounded-circle">
            <i className="bi bi-telephone" aria-hidden="true"></i>
          </div>
        </a>
      </div>
      <SiteFooter />
    </div>
  );
}
