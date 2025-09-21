import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

function assetUrl(pathFromPublic = "") {
  const base =
    (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";
  return `${base.replace(/\/+$/, "")}/${String(pathFromPublic).replace(/^\/+/, "")}`;
}

function normalizeItems(items = []) {
  return items.map((it) => {
    const src = it?.image_url || "";
    const isAbsolute =
      /^https?:\/\//i.test(src) || /^data:/i.test(src) || /^blob:/i.test(src);
    const image_url = isAbsolute ? src : assetUrl(src);
    return { ...it, image_url };
  });
}

const Property = {
  async list() {
    return normalizeItems([
      {
        title: "Luxury Living Spaces",
        image_url: "/images/premium_residency.jpg",
        property_type: "Apartment and Premium residence",
      },
      {
        title: "Invest in Nature’s Future",
        image_url: "/images/ourservicesfarmland.png",
        property_type: "Farm Lands",
      },
      {
        title: "Own Your Land, Start Today",
        image_url: "/images/ourservicereadytoregisterplots.png",
        property_type: "Ready-to-Register plots",
      },
      {
        title: "Early Access to Premium Living",
        image_url: "/images/PreLaunchplots.png",
        property_type: "Pre-Launch Plots",
      },
    ]);
  },
};

function PropertyCard({ property, isActive, hideTitle, hideType, noOverlay, noDim }) {
  const title = property?.title || "Gallery image";
  const src = property?.image_url || "";

  return (
    <motion.div
      className="relative w-full h-[70vh] overflow-hidden rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: noDim ? 1 : isActive ? 1 : 0.7 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="absolute inset-0">
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {!noOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        )}
      </div>

      {(!hideTitle || !hideType) && (
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.9 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {!hideType && property?.property_type && (
              <span className="inline-block px-3 py-1 mb-3 text-xs uppercase tracking-wide rounded-full bg-white/15 border border-white/25 backdrop-blur-sm">
                {property.property_type}
              </span>
            )}
            {!hideTitle && property?.title && (
              <h2 className="text-3xl md:text-4xl font-light mb-2 tracking-wide">
                {property.title}
              </h2>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function RealEstateCarousel({
  properties,
  autoPlay = true,
  autoPlayInterval = 5000,
  hideTitle = false,
  hideType = false,
  noOverlay = false,
  noDim = false,
}) {
  const len = properties?.length || 0;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const timerRef = useRef(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === len - 1 ? 0 : prev + 1));
  }, [len]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? len - 1 : prev - 1));
  }, [len]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);


  useEffect(() => {
    if (currentIndex > len - 1) setCurrentIndex(0);
  }, [len, currentIndex]);


  useEffect(() => {
    if (!isAutoPlaying || len <= 1) return;
    timerRef.current = setInterval(goToNext, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [isAutoPlaying, goToNext, autoPlayInterval, len]);

  if (!len) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center bg-gray-100 rounded-2xl">
        <p className="text-gray-500 text-lg">No properties available</p>
      </div>
    );
    }

  const active = properties[currentIndex];

  return (
    <div
      className="relative w-full bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => autoPlay && setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentIndex}-${active?.image_url || "slide"}`}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full"
        >
          <PropertyCard
            property={active}
            isActive
            hideTitle={hideTitle}
            hideType={hideType}
            noOverlay={noOverlay}
            noDim={noDim}
          />
        </motion.div>
      </AnimatePresence>

      {len > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border border-white/20 grid place-items-center disabled:opacity-40"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border border-white/20 grid place-items-center disabled:opacity-40"
            onClick={goToNext}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <div className="flex space-x-3">
              {properties.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="relative w-3 h-3 rounded-full transition-all duration-300"
                >
                  <div
                    className={`w-full h-full rounded-full border-2 transition-all duration-300 ${
                      index === currentIndex
                        ? "border-white bg-white"
                        : "border-white/50 bg-transparent hover:border-white/80"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="absolute top-6 right-6 z-10">
        <div className="px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm text-white text-sm font-light">
          {currentIndex + 1} / {len}
        </div>
      </div>
    </div>
  );
}

export default function RealEstate({
  items,             
  hideTitle = false,
  hideType = false,
  noOverlay = false,
  noDim = false,
}) {
  const normalized = useMemo(() => normalizeItems(items || []), [items]);
  const [properties, setProperties] = useState(normalized);
  const [loading, setLoading] = useState(!(items && items.length));

  useEffect(() => {
    if (items && items.length) {
      setProperties(normalized);
      setLoading(false);
    } else {
      setProperties([]);
      setLoading(true);
    }
  }, [items, normalized]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (items && items.length) return;
      try {
        const data = await Property.list();
        if (mounted) setProperties(data);
      } catch (err) {
        console.error("Error loading properties:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [items]);

  if (loading) {
    return (
      <div className="min-h-[50vh] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          <span className="text-gray-600 font-light text-lg">Loading…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto">
        <RealEstateCarousel
          properties={properties}
          autoPlay
          autoPlayInterval={6000}
          hideTitle={hideTitle}
          hideType={hideType}
          noOverlay={noOverlay}
          noDim={noDim}
        />
      </div>
    </div>
  );
}
