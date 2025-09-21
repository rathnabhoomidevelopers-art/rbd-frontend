import "./rbd.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, Award, Users, Home, TrendingUp, Heart, Shield, Lightbulb,
  Handshake, Star, Zap, MessageSquare, Eye, FileText, KeyRound
} from "lucide-react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import AboutAccordion from "./AboutAccordion";

const assetUrl = (pathFromPublic) =>
  (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL)
    ? `${import.meta.env.BASE_URL.replace(/\/+$/, "")}/${pathFromPublic.replace(/^\/+/, "")}`
    : `/${pathFromPublic.replace(/^\/+/, "")}`;

export default function AboutUs() { 
  const prefersReducedMotion = useReducedMotion();
  const MotionLink = motion(Link);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const containerStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const stats = [
    { icon: Home, number: "1,800+", label: "Properties Delivered", description: "Across residential & commercial sectors" },
    { icon: Users, number: "4,200+", label: "Families Served", description: "Helping people settle in their dream homes" },
    { icon: Award, number: "18", label: "Industry Accolades", description: "Recognized for design & sustainability" },
    { icon: TrendingUp, number: "₹1,200 Cr+", label: "Value Created", description: "In real estate assets handled" },
  ];

  const values = [
    { icon: Heart, title: "People First", description: "We prioritize relationships over transactions." },
    { icon: Shield, title: "Integrity Always", description: "Every decision is rooted in honesty and accountability." },
    { icon: Lightbulb, title: "Smart Innovation", description: "Leveraging technology and creative ideas." },
    { icon: Handshake, title: "Strong Partnerships", description: "We collaborate with trusted partners." },
    { icon: Star, title: "Excellence Driven", description: "Constantly raising the bar for exceptional results." },
    { icon: Zap, title: "Action Oriented", description: "We execute with speed, energy, and precision." },
  ];

  const teamMembers = [
    {
      name: "Ananya Rao",
      role: "Founder & Visionary",
      experience: "20+ yrs",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
      specialties: ["Township Planning", "Premium Housing"],
      description: "Ananya brings unmatched passion and foresight.",
    },
    {
      name: "Rahul Mehta",
      role: "Head of Marketing",
      experience: "10+ yrs",
      image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=800&q=80",
      specialties: ["Digital Campaigns", "Investor Relations"],
      description: "Rahul ensures every project reaches the right audience.",
    },
  ];

  const journeySteps = [
    {
      icon: MessageSquare,
      title: "Mission & vision",
      description:
        "Guided by our mission and driven by our vision, we are committed to creating lasting value through integrity, innovation, and customer-focused solutions.",
    },
    {
      icon: Eye,
      title: "Exclusive Picks",
      description:
        "Discover tailored property choices designed around your preferences, with expert support guiding you at every step for a seamless experience.",
    },
    {
      icon: FileText,
      title: "Owning Your Space",
      description:
        "Our expert team negotiates favorable deals, ensuring the best terms while handling all documentation for a seamless, stress-free transaction.",
    },
    {
      icon: KeyRound,
      title: "New Beginnings",
      description:
        "The journey concludes with joy as you receive your keys, marking the start of new memories and your dream home.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .parallax-bg { background-attachment: fixed; background-size: cover; background-position:center; }
        @media (max-width: 768px) { .parallax-bg { background-attachment: scroll; } }
      `}</style>

      <SiteHeader />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=2850&q=80)',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-24 left-8 w-28 h-28 bg-amber-400/25 rounded-full blur-2xl"
              animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute bottom-24 right-8 w-24 h-24 bg-orange-400/25 rounded-full blur-xl"
              animate={{ y: [0, 16, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              aria-hidden="true"
            />
          </>
        )}

        <motion.div
          className="relative z-10 text-center text-white px-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerStagger}
        >
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold">
            Homes Built on{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Trust & Innovation
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-xl max-w-3xl mx-auto">
            We help families and investors discover more than just properties — we
            help them find spaces that shape futures.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex gap-4 justify-center">
            <MotionLink
              to="/ourprojects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow">
              Browse Projects <ArrowRight className="inline w-5 h-5 ml-2" />
            </MotionLink>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerStagger}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="p-6 text-center shadow rounded bg-white"
              variants={scaleIn}
              whileHover={{ y: -6, boxShadow: "0 12px 28px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <s.icon className="w-10 h-10 mx-auto text-amber-600" />
              <h3 className="text-3xl font-bold mt-2 text-gray-900">{s.number}</h3>
              <p className="font-semibold text-gray-800">{s.label}</p>
              <p className="text-sm text-gray-500">{s.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerStagger}
        >
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="p-6 rounded bg-white/10 border border-white/10"
              variants={fadeUp}
              whileHover={{ scale: 1.03, translateY: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3 border border-amber-500/30">
                <v.icon className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold">{v.title}</h3>
              <p className="text-slate-200">{v.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerStagger}
        >
          {teamMembers.map((m, i) => (
            <motion.div
              key={i}
              className="shadow rounded overflow-hidden bg-white"
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: "0 14px 30px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <motion.img
                src={m.image}
                alt={m.name}
                className="w-full h-64 object-cover"
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.45 }}
                referrerPolicy="no-referrer"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900">{m.name}</h3>
                <p className="text-amber-700">{m.role}</p>
                <span className="text-sm text-gray-500">{m.experience} experience</span>
                <p className="mt-2 text-gray-700">{m.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.specialties?.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm bg-amber-100 text-amber-800 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-20 bg-gray-100">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerStagger}
        >
          {journeySteps.map((s, i) => (
            <motion.div
              key={i}
              className="p-6 rounded bg-white/80 backdrop-blur-sm"
              variants={fadeUp}
              whileHover={{ scale: 1.04, translateY: -6 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 20,
                backgroundColor: { duration: 0.25, ease: "easeOut" },
              }}
            >
              <div className="w-16 h-16 mb-4 rounded-full mx-auto bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                <s.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="text-slate-900">{s.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <MotionLink
            to="/contactus"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-full text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow inline-flex items-center"
          >
            Start With Us <ArrowRight className="inline w-5 h-5 ml-2" />
          </MotionLink>
        </div>
      </section>

      <section>
        <AboutAccordion />
      </section>

      {/*Whatsapp and call Stickers */}
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
      <SiteFooter />
    </div>
  );
}
