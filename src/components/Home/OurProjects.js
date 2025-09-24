import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./rbd.css";
import {
  MapPin, Users, Zap, Square, IndianRupee, CheckCircle, X, Car,
  Dumbbell, ShieldCheck, Building2, Baby, CloudRain, Leaf, PlugZap,
  Music, Factory, Home, Trophy, Waves
} from "lucide-react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import RealEstate from "./RealEstate";

/* === URL HELPERS (dev-aware) === */

/* Asset URL (subpath-safe, works with Vite base) */
const assetUrl = (pathFromPublic) => {
  const p = typeof pathFromPublic === "string" ? pathFromPublic : String(pathFromPublic ?? "");
  const baseRaw =
    typeof import.meta !== "undefined" ? import.meta.env?.BASE_URL : undefined;
  const base = typeof baseRaw === "string" && baseRaw ? baseRaw : "/";
  return `${base.replace(/\/+$/g, "")}/${p.replace(/^\/+/, "")}`;
};
/* API base:
   - If Vite/CRA env is set, use it.
   - Else: in dev (ports 3000/5173) point to http://127.0.0.1:8080.
   - Else: same-origin (for prod).
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


/* POST helper with timeout */
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
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data?.ok === false) {
      throw new Error(data?.message || data?.error || `HTTP ${res.status}`);
    }
    return data;
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

/* Brochure path (respect Vite base) */
const APP_BASE =
  typeof import.meta !== "undefined" && typeof import.meta.env?.BASE_URL === "string"
    ? import.meta.env.BASE_URL
    : "/";
const BROCHURE_URL = `${APP_BASE.replace(/\/+$/g, "")}/docs/NorthernLights.pdf`;

const galleryItems = [
  { image_url: assetUrl("images/aboutustopimg.png") },
  { image_url: assetUrl("images/readytoregisterplots.png") },
  { image_url: assetUrl("images/entranceofnortern.jpg") },
  { image_url: assetUrl("images/clubhouse.png") },
];

const cn = (...c) => c.filter(Boolean).join(" ");

const Button = ({ className = "", variant = "default", size = "md", children, ...props }) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  const sizes = { sm: "h-9 px-4 text-sm", md: "h-11 px-5", lg: "h-12 px-6 text-lg" };
  const variants = {
    default:
      "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 focus:ring-amber-500",
    outline: "border-2 border-amber-600 text-amber-700 hover:bg-amber-50 focus:ring-amber-400",
    ghost: "text-gray-700 hover:bg-gray-100",
  };
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ className = "", children }) => (
  <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", className)}>
    {children}
  </span>
);
const Card = ({ className = "", children }) => (
  <div className={cn("bg-white rounded-2xl border border-gray-200", className)}>{children}</div>
);
const CardHeader = ({ className = "", children }) => <div className={cn("px-6 pt-6", className)}>{children}</div>;
const CardContent = ({ className = "", children }) => <div className={cn("px-6 pb-6", className)}>{children}</div>;
const CardTitle = ({ className = "", children }) => (
  <h3 className={cn("text-xl font-bold text-gray-900", className)}>{children}</h3>
);

const Input = (props) => (
  <input
    {...props}
    className={cn(
      "w-full rounded-xl border border-gray-300 px-3 py-2.5 sm:px-4 sm:py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500",
      props.className
    )}
  />
);
const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={cn("text-sm font-medium text-gray-700", className)}>
    {children}
  </label>
);
const Textarea = (props) => (
  <textarea
    {...props}
    className={cn(
      "w-full rounded-xl border border-gray-300 px-3 py-2.5 sm:px-4 sm:py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500",
      props.className
    )}
  />
);

const PLOTS_DATA = [
  { id: 1, size: "30x40", area: 1200, price: 7800000 },
  { id: 2, size: "30x50", area: 1500, price: 9700000 },
  { id: 3, size: "40x60", area: 2400, price: 15600000 },
  { id: 4, size: "50x60", area: 3000, price: 19500000 },
];

const AMENITIES = [
  { icon: Building2, title: "Multipurpose Hall", description: "Spacious hall for events, meetings and community functions", color: "text-indigo-600", bg: "bg-indigo-100" },
  { icon: Baby, title: "Kids Play Area", description: "Safe, fun zone with age-appropriate play equipment", color: "text-pink-600", bg: "bg-pink-100" },
  { icon: ShieldCheck, title: "24×7 Security (CCTV)", description: "Gated access, trained guards and full-coverage CCTV monitoring", color: "text-emerald-600", bg: "bg-emerald-100" },
  { icon: Waves, title: "Swimming Pool & Toddler Pool", description: "Resort-style pool with a shallow toddler section", color: "text-cyan-600", bg: "bg-cyan-100" },
  { icon: Trophy, title: "Sports Zone", description: "Courts/fields for outdoor games and activities", color: "text-amber-600", bg: "bg-amber-100" },
  { icon: Dumbbell, title: "Gymnasium", description: "Fully equipped gym for daily workouts", color: "text-orange-600", bg: "bg-orange-100" },
  { icon: CloudRain, title: "Rainwater Harvesting", description: "Sustainable water collection and groundwater recharge systems", color: "text-blue-600", bg: "bg-blue-100" },
  { icon: Leaf, title: "Yoga Pavilion", description: "Open-air pavilion for yoga and meditation", color: "text-green-600", bg: "bg-green-100" },
  { icon: Home, title: "Multi-Purpose Club House", description: "Community clubhouse featuring indoor leisure amenities", color: "text-purple-600", bg: "bg-purple-100" },
  { icon: PlugZap, title: "Underground Electric Cabling", description: "Safe, clutter-free power distribution across the property", color: "text-yellow-600", bg: "bg-yellow-100" },
  { icon: Music, title: "Outdoor Party Zone", description: "Landscaped party lawn with seating and ambient lighting", color: "text-rose-600", bg: "bg-rose-100" },
  { icon: Factory, title: "High-Tech Sewage Treatment Plant", description: "On-site STP to recycle and reuse water responsibly", color: "text-slate-600", bg: "bg-slate-100" },
];

function ProjectHero({ onScrollToPlots }) {
  const brochureModalRef = useRef(null);
  const brochureModalInstanceRef = useRef(null);
  const brochureDownloadRef = useRef(null);

  useEffect(() => {
    if (brochureModalRef.current && typeof window !== "undefined" && window?.bootstrap && !brochureModalInstanceRef.current) {
      brochureModalInstanceRef.current = new window.bootstrap.Modal(brochureModalRef.current);
    }
  }, []);

  const onBrochureClick = async () => {
    try {
      brochureModalInstanceRef.current?.show();
    } catch {}
    const ac = new AbortController();
    const to = setTimeout(() => ac.abort(), 12000);
    try {
      const res = await fetch(BROCHURE_URL, { method: "GET", signal: ac.signal, cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = brochureDownloadRef.current || document.createElement("a");
      a.href = url;
      a.download = "NorthernLights.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      brochureDownloadRef.current?.click();
    } finally {
      clearTimeout(to);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden" style={{ marginTop: "-20px" }}>
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-20 left-20 w-32 h-32 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-orange-300 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800">
                <Zap className="w-3 h-3 mr-1" /> Now Open for Registration
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Northern{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  Lights
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Discover premium residential plots surrounded by nature, offering modern comforts with world-class amenities and smart planning.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-gray-700">Location</span>
                </div>
                <p className="text-gray-900 font-bold">IVC Road Devanahalli, Bangalore</p>
                <p className="text-sm text-gray-500">10 min from Airport</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-gray-700">Availability</span>
                </div>
                <p className="text-gray-900 font-bold">319 Premium Plots</p>
                <p className="text-sm text-gray-500">Starting ₹70 Lakhs</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onScrollToPlots}>Explore Plots</Button>
              <Button size="lg" onClick={onBrochureClick}>Download brochure</Button>
              <a href={BROCHURE_URL} ref={brochureDownloadRef} className="hidden" download>Brochure</a>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/10] md:aspect-[4/3]">
              <motion.img
                className="absolute inset-0 w-full h-full object-cover"
                src={assetUrl("images/aboutustopimg.png")}
                alt="Northern Lights Project"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.06 }}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-8 -left-12 bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-gray-500">Customer Ratings</p>
                <div className="flex justify-center mt-2" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white pb-lg-5">
        <span
          className="mt-lg-5 mb-4 pt-5"
          style={{ fontSize: "70px", fontWeight: "bold", color: "lightgray", display: "flex", justifyContent: "center" }}
        >
          Gallery
        </span>
        <RealEstate items={galleryItems} hideTitle hideType noOverlay noDim />
      </div>

      <div className="bg-secondary">
        <span
          className="p-5"
          style={{
            fontWeight: "bold",
            color: "lightgray",
            display: "flex",
            justifyContent: "center",
            fontSize: "clamp(28px, 6vw, 70px)",
          }}
        >
          Master Plan
        </span>

        <div className="w-full flex justify-center px-6 pb-16">
          <div className="w-full max-w-6xl">
            <motion.img
              src={assetUrl("images/masterplanlayouts.png")}
              alt="Master Plan"
              className="w-full h-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlotGrid({ onPlotSelect, selectedPlot }) {
  const plots = [...PLOTS_DATA];

  const formatPrice = (price) => {
    if (typeof price !== "number" || Number.isNaN(price)) return "—";
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    return `₹${(price / 100000).toFixed(0)} L`;
  };

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Plot</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select from our most popular residential plot dimensions designed to suit your family’s lifestyle and investment goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plots.map((plot) => (
            <Card
              key={plot.id}
              className={cn(
                "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2",
                selectedPlot?.size === plot.size ? "border-amber-500 shadow-xl" : "border-gray-200 hover:border-amber-300"
              )}
              onClick={() => onPlotSelect(plot)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{plot.size} ft</h3>
                <div className="flex items-center justify-center gap-2">
                  <Square className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold">{plot.area.toLocaleString()} sq ft</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <IndianRupee className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-lg text-gray-900">{formatPrice(plot.price)}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Available</span>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlotSelect(plot);
                  }}
                >
                  Select This Plot
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function AmenitiesSection() {
  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Top Notch{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Amenities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every detail carefully planned to enhance your lifestyle. Experience luxury living with modern conveniences and natural beauty.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {AMENITIES.map((a, i) => (
            <Card key={i} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300", a.bg)}>
                  <a.icon className={cn("w-8 h-8", a.color)} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{a.title}</h3>
                <p className="text-gray-600 leading-relaxed">{a.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-80 lg:h-auto">
              <img
                src={assetUrl("images/primelocationbenefit.png")}
                alt="Location aerial view"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" aria-hidden="true" />
            </div>
            <div className="p-12 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Strategic Location Benefits</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Strategic Location</h4>
                    <p className="text-gray-600">
                      10 minutes from Kempegowda International Airport, close to Mall of Asia, Harrow International
                      School, Manipal Hospital, KIADB Industrial Area
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Car className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Excellent Connectivity</h4>
                    <p className="text-gray-600">10 minutes from Satellite Town Ring Road</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Social Infrastructure</h4>
                    <p className="text-gray-600">Top schools, hospitals, and shopping centers within 5km radius</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

const PlotInquiry = {
  create: (payload) => postJson("/api/plot-inquiries", payload),
};

function RegistrationForm({ selectedPlot, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    budget_range: "",
    inquiry_type: "more_info",
    message: "",
  });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field, value) => setFormData((p) => ({ ...p, [field]: value }));
  const formatPrice = (price) => (typeof price !== "number" || Number.isNaN(price)) ? "—" : `₹${(price / 100000).toFixed(0)}L`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const name = formData.full_name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    if (!name || !email || !phone || !message) {
      setFormError("Please fill in all fields.");
      return;
    }
    if (!/^[A-Za-z\s]{5,}$/.test(name)) {
      setFormError("Fullname: Min 5 letters.");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/.test(email)) {
      setFormError("Please enter a valid email.");
      return;
    }
    if (!/^(?:\+91|0)?[6-9]\d{9}$/.test(phone.replace(/[^\d+]/g, ""))) {
      setFormError("Enter a valid mobile number");
      return;
    }

    if (!formData.budget_range) {
      setFormError("Please select your budget range.");
      return;
    }
    if (!selectedPlot?.id) {
      setFormError("Please select a plot again.");
      return;
    }

    setIsSubmitting(true);
    try {
      await PlotInquiry.create({
        plot_number: String(selectedPlot.id),
        full_name: name,
        email,
        phone,
        budget_range: formData.budget_range || null,
        inquiry_type: formData.inquiry_type || "more_info",
        message: message || null,
      });
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose?.();
      }, 1500);
    } catch (err) {
      setFormError(err?.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Inquiry Submitted!</h3>
            <p className="text-gray-600 mb-4">We'll contact you within 24 hours to discuss Plot {selectedPlot.id}.</p>
            <p className="text-sm text-gray-500">Check your email for confirmation details.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center sm:p-4 p-2">
        <Card className="reg-modal w-full max-w-[92vw] sm:max-w-2xl max-h-[88vh] sm:max-h-[86vh] overflow-hidden flex flex-col my-2 sm:my-8">
          <CardHeader className="reg-modal__header pb-3 sm:pb-4 sticky top-0 bg-white z-10">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Register Interest - Plot {selectedPlot?.id ?? "—"}</CardTitle>
                <p className="text-gray-600 mt-1">Fill out your details to get started</p>
              </div>
              <Button variant="ghost" onClick={onClose} className="h-10 w-10 p-0" aria-label="Close">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="reg-modal__scroll grow overflow-y-auto space-y-5 sm:space-y-6 p-4 sm:p-6 pb-24">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Selected Plot Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center">
                  <MapPin className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Plot Number</p>
                  <p className="font-bold">{selectedPlot?.id ?? "—"}</p>
                </div>
                <div className="text-center">
                  <Square className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Area</p>
                  <p className="font-bold">{selectedPlot?.area?.toLocaleString?.() ?? "—"} sq ft</p>
                </div>
                <div className="text-center">
                  <IndianRupee className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-bold">{formatPrice(selectedPlot?.price)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Features</p>
                  <div className="flex flex-col gap-1 items-center">
                    {selectedPlot?.facing && <Badge className="bg-blue-100 text-blue-800 text-xs">{selectedPlot.facing}</Badge>}
                    {selectedPlot?.corner && <Badge className="bg-emerald-100 text-emerald-800 text-xs">Corner</Badge>}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input id="full_name" value={formData.full_name} onChange={(e) => handleInputChange("full_name", e.target.value)} placeholder="Enter your full name" required autoComplete="name" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="Enter your email" required autoComplete="email" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder="Enter your phone number" required inputMode="numeric" autoComplete="tel" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="budget_range">Budget Range *</Label>
                  <select
                    id="budget_range"
                    value={formData.budget_range}
                    onChange={(e) => handleInputChange("budget_range", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  >
                    <option value="">Select your budget range</option>
                    <option value="75-100L">₹75L - ₹1Cr</option>
                    <option value="100-150L">₹1Cr - ₹1.5Cr</option>
                    <option value="150L+">₹1.5Cr+</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="inquiry_type">What are you looking for?</Label>
                <select
                  id="inquiry_type"
                  value={formData.inquiry_type}
                  onChange={(e) => handleInputChange("inquiry_type", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2.5 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="more_info">More Information</option>
                  <option value="site_visit">Schedule Site Visit</option>
                  <option value="ready_to_buy">Ready to Purchase</option>
                </select>
              </div>

              <div>
                <Label htmlFor="message">Additional Requirements</Label>
                <Textarea id="message" rows={3} value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} placeholder="Tell us about any specific requirements or questions..." className="mt-2" />
              </div>

              {formError && (
                <div className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 border border-red-200" role="alert">
                  {formError}
                </div>
              )}

              <div
                className="sticky bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-t flex gap-3 p-3"
                style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)" }}
              >
                <Button type="button" variant="outline" className="flex-1" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function LeadCaptureModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    emailTxt: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  if (!open) return null;

  const set = (k) => (e) => setFormData((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = formData.firstName.trim();
    const email = formData.emailTxt.trim();
    const phone = formData.phone.replace(/[^\d+]/g, "");
    const message = formData.message.trim();

    if (!/^[A-Za-z\s]{5,}$/.test(name)) return setMsg("Full name: min 5 letters.");
    if (!/^[a-zA-Z0-9._%+-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/.test(email))
      return setMsg("Enter a valid email.");
    if (!/^(?:\+91|0)?[6-9]\d{9}$/.test(phone)) return setMsg("Enter a valid mobile number.");

    try {
      setIsSubmitting(true);
      setMsg("");
      await postJson("/api/contact", {
        firstName: name,
        emailTxt: email,
        phone,
        message: message.slice(0, 100),
        source: "home",
      });
      setMsg("✅ Thanks! We’ll reach out soon.");
      setTimeout(onClose, 1200);
    } catch (err) {
      setMsg(err?.message || "❌ Failed to submit. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onBackdrop = (e) => {
    if (e.target.dataset.backdrop === "1") onClose();
  };

  return (
    <div
      data-backdrop="1"
      onClick={onBackdrop}
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-3"
      role="dialog"
      aria-modal="true"
      aria-label="Get project details"
    >
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-2xl">Get Project Details</CardTitle>
            <button
              onClick={onClose}
              className="h-10 w-10 -mr-2 -mt-2 rounded-xl hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 mt-1">Share your details and we’ll contact you.</p>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <Label htmlFor="lead_name">Full Name *</Label>
              <Input id="lead_name" value={formData.firstName} onChange={set("firstName")} autoComplete="name" required />
            </div>
            <div>
              <Label htmlFor="lead_email">Email *</Label>
              <Input id="lead_email" type="email" value={formData.emailTxt} onChange={set("emailTxt")} autoComplete="email" required />
            </div>
            <div>
              <Label htmlFor="lead_phone">Phone *</Label>
              <Input id="lead_phone" value={formData.phone} onChange={set("phone")} inputMode="numeric" autoComplete="tel" required />
            </div>
            <div>
              <Label htmlFor="lead_message">Message</Label>
              <Textarea id="lead_message" rows={3} value={formData.message} onChange={set("message")} placeholder="I’m interested in Northern Lights…" maxLength={100}/>
              <div className="text-xs text-gray-500 text-right">
                {formData.message.length}/100
              </div>
            </div>

            {msg && (
              <div className={`text-sm mt-1 ${msg.startsWith("✅") ? "text-green-700" : "text-red-700"}`}>
                {msg}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


/* Page Wrapper */
export default function OurProjects() {
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const plotsRef = useRef(null);
  const [showLeadModal, setShowLeadModal] = useState(false);

useEffect(() => {
  // only once per session
  if (sessionStorage.getItem("leadModalShown") === "1") return;
  const t = setTimeout(() => {
    setShowLeadModal(true);
    sessionStorage.setItem("leadModalShown", "1");
  }, 5000);
  return () => clearTimeout(t);
}, []);


  const handlePlotSelect = (plot) => {
    setSelectedPlot(plot);
    setShowRegistrationForm(true);
  };
  const handleScrollToPlots = () => plotsRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleRegistrationSuccess = () => {
    setSelectedPlot(null);
    setShowRegistrationForm(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <div style={{ marginTop: "90px" }}>
        <ProjectHero onScrollToPlots={handleScrollToPlots} />
        <div ref={plotsRef}>
          <PlotGrid onPlotSelect={handlePlotSelect} selectedPlot={selectedPlot} />
        </div>
        <AmenitiesSection />
      </div>

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

      {showRegistrationForm && selectedPlot && (
        <RegistrationForm
          selectedPlot={selectedPlot}
          onClose={() => setShowRegistrationForm(false)}
          onSuccess={handleRegistrationSuccess}
        />
      )}
      {showLeadModal && (
      <LeadCaptureModal
        open={showLeadModal}
        onClose={() => setShowLeadModal(false)}
      />
    )}

      <SiteFooter />
    </div>
  );
}
