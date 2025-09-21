import React, { useMemo, useState } from "react";
import { ChevronDown, Award, Heart, Home, Star, Handshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  {
    id: "story",
    title: "Our Story",
    icon: Home,
    content:
      `Rathna Bhoomi Developers started with a simple idea—make real estate straightforward, honest, and people-first. 
Over the years, we’ve grown alongside Bengaluru’s north corridor, with a special focus on Devanahalli. 
From ready-to-register plots to thoughtfully planned communities, our work is guided by clarity, trust, and long-term value.`
  },
  {
    id: "values",
    title: "What We Stand For",
    icon: Heart,
    content:
      `We keep things transparent, communicate early, and deliver on time. 
Legal diligence isn’t a checkbox for us—it’s a promise. 
We believe good real estate should feel simple, predictable, and stress-free.`
  },
  {
    id: "services",
    title: "What We Do",
    icon: Handshake,
    content:
      `• Ready-to-register plots with clear approvals\n` +
      `• Apartments and premium residential options\n` +
      `• Assistance across verification, documentation, and registration\n` +
      `• End-to-end guidance—from site visit to handover`
  },
  {
    id: "recognition",
    title: "Client Trust",
    icon: Award,
    content:
      `The feedback we value most is repeat customers and referrals. 
That trust comes from consistent communication, transparent pricing, and a process designed to remove surprises.`
  },
  {
    id: "community",
    title: "Local Impact",
    icon: Star,
    content:
      `We work with local partners and vendors, create employment near project sites, and support community-driven growth. 
Good neighborhoods thrive when development is responsible and future-minded.`
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function AboutAccordion() {
  const [openItems, setOpenItems] = useState(() => new Set(["story"]));
  const isTest = useMemo(
    () => typeof process !== "undefined" && process.env?.NODE_ENV === "test",
    []
  );
  const supportsIO = useMemo(
    () => typeof window !== "undefined" && "IntersectionObserver" in window,
    []
  );
  const inViewProps = supportsIO && !isTest
    ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 } }
    : { animate: { opacity: 1, y: 0 } };

  const toggle = (id) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4" data-testid="about-accordion">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
        The Story Behind Us
      </h2>

      <div className="space-y-3">
        {sections.map((item) => {
          const isOpen = openItems.has(item.id);
          const Icon = item.icon;
          const contentId = `acc-panel-${item.id}`;
          const headerId = `acc-header-${item.id}`;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.45, ease }}
              {...inViewProps}
              className={`rounded-2xl border overflow-hidden transition-all duration-300
                ${isOpen ? "border-amber-300 shadow-lg" : "border-gray-200 shadow"} bg-white`}
            >
              <button
                id={headerId}
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className="w-full px-6 sm:px-8 py-5 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 grid place-items-center">
                      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.28, ease }}
                    className="ml-3"
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    initial={isTest ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={isTest ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={isTest ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-6">
                      <div className="pl-0 sm:pl-16">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-orange-600 mb-5" />
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
