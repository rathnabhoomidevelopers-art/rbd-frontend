import "./rbd.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const assetUrl = (pathFromPublic) =>
  (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL)
    ? `${import.meta.env.BASE_URL.replace(/\/+$/, "")}/${pathFromPublic.replace(/^\/+/, "")}`
    : `/${pathFromPublic.replace(/^\/+/, "")}`;

const normalizeHero = (url) => (url?.startsWith("http") ? url : assetUrl(url || ""));

function Blogs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  const openPost = (slug) => setSelectedPost(ARTICLES[slug] || null);
  const closePost = () => setSelectedPost(null);

  const supportsIO = useMemo(
    () => typeof window !== "undefined" && "IntersectionObserver" in window,
    []
  );
  const isTest =
    typeof process !== "undefined" &&
    process.env &&
    process.env.NODE_ENV === "test";

  const ARTICLES = {
    "smarter-living-connected-homes-that-help-you-buy-better": {
      title: "Smarter Living: Connected Homes That Help You Buy Better",
      author: "Ava Patel",
      date: "2024-01-18",
      hero: normalizeHero(
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop"
      ),
      body: [
        "Smart homes have moved beyond novelty. Today, everyday features like remote locks, leak sensors, and zoned climate control can lower risk and total cost of ownership.",
        "If you’re buying, look for open standards (Matter, Thread) so devices from different brands talk to each other. Ask the seller what stays and request a factory reset at closing.",
        "Energy dashboards are underrated: seeing real-time usage nudges better habits and helps spot inefficient appliances.",
        "Tip: Put ‘resale-ready’ automations on day one—front door lock, porch light scenes, and a thermostat schedule. These delight future buyers and reduce support calls.",
      ],
    },
    "build-green-save-more-materials-that-return-the-investment": {
      title: "Build Green, Save More: Materials That Return the Investment",
      author: "Noah Williams",
      date: "2024-01-14",
      hero: normalizeHero("/images/greenbuilding.jpg"),
      body: [
        "Eco-friendly doesn’t have to mean expensive. Materials like recycled steel, cellulose insulation, and cool-roof shingles often pay for themselves through durability and efficiency.",
        "Prioritize envelope upgrades first: air sealing, insulation, and high-performance windows. Mechanical upgrades work best after you stop energy leaks.",
        "When comparing quotes, ask for life-cycle cost, not just install price. A slightly pricier material with 2x lifespan is a win.",
        "Bonus: Choose low-VOC paints and adhesives. They improve indoor air quality—buyers can literally smell the difference.",
      ],
    },
    "mixed-use-momentum-where-retail-work-and-homes-meet": {
      title: "Mixed-Use Momentum: Where Retail, Work, and Homes Meet",
      author: "Ishaan Verma",
      date: "2024-01-10",
      hero: normalizeHero(
        "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1600&auto=format&fit=crop"
      ),
      body: [
        "Mixed-use districts reduce car trips and unlock an ‘all-in-one’ lifestyle: gyms, groceries, and workspaces within a short walk.",
        "For investors, watch daytime vs. nighttime foot traffic and tenant diversity. A balanced mix supports steady rental demand.",
        "Residents should review noise studies and event calendars—vibrancy is great, but you’ll want quiet hours and delivery zones planned well.",
        "Look for corridor improvements (streetscapes, bike lanes). Public realm upgrades tend to precede value jumps.",
      ],
    },
    "downtown-buzz-or-outer-calm-choosing-your-next-neighborhood": {
      title: "Downtown Buzz or Outer Calm? Choosing Your Next Neighborhood",
      author: "Sarah Johnson",
      date: "2024-01-15",
      hero: normalizeHero(
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop"
      ),
      body: [
        "City cores trade space for access; suburbs trade access for space. The right call depends on your daily rhythm.",
        "Score each option on commute, noise, amenities, schools, and price per square foot. Touring at multiple times of day reveals the true vibe.",
        "Account for recurring costs—parking, tolls, HOA dues, and lawn care can swing budgets by hundreds monthly.",
        "If undecided, try a 3–6 month rental in the area first. Your lived experience is the best data point.",
      ],
    },
    "stage-to-sell-a-room-by-room-playbook-that-works": {
      title: "Stage to Sell: A Room-by-Room Playbook That Works",
      author: "Michael Chen",
      date: "2024-01-12",
      hero: normalizeHero("/images/homestagging.jpg"),
      body: [
        "Great staging clarifies scale and flow. You’re not decorating—you’re editing.",
        "Entry: bright bulb, simple console, fresh mat. Living room: remove bulky pieces; create one clear conversation area.",
        "Kitchen: empty counters, one plant or bowl, fix dripping taps. Bedrooms: neutral bedding and matching lamps for symmetry.",
        "Photograph with blinds open and all lights on. Buyers shop with their thumbs before they tour.",
      ],
    },
    "2024-market-watch-rates-inventory-and-buyer-behavior": {
      title: "2024 Market Watch: Rates, Inventory, and Buyer Behavior",
      author: "Emily Rodriguez",
      date: "2024-01-08",
      hero: normalizeHero(
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop"
      ),
      body: [
        "Pricing this year is driven by the tug-of-war between rates and inventory. Track your local ratio of new listings to pending sales.",
        "Median days on market and the share of price reductions are leading indicators—turns show up here first.",
        "Buyers: lock when payments feel comfortable; don’t chase the bottom. Sellers: price to the last 30–60 days, not last spring.",
      ],
    },
    "modern-luxury-now-wellness-suites-and-whisper-quiet-tech": {
      title: "Modern Luxury Now: Wellness Suites and Whisper-Quiet Tech",
      author: "David Thompson",
      date: "2024-01-05",
      hero: normalizeHero(
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop"
      ),
      body: [
        "Today’s luxury feels calm: clean air, spa-grade baths, and near-silent HVAC.",
        "Consider whole-home filtration, humidity control, acoustic treatments, and circadian lighting scenes.",
        "Focus on upgrades buyers can feel within five minutes—temperature, acoustics, and light quality sell themselves.",
      ],
    },
    "first-home-ready-a-friendly-checklist-for-new-buyers": {
      title: "First-Home Ready: A Friendly Checklist for New Buyers",
      author: "Lisa Wang",
      date: "2024-01-02",
      hero: normalizeHero("/images/firsttimebuying.jpg"),
      body: [
        "1) Get pre-approved and define your payment comfort zone.",
        "2) Shortlist neighborhoods and must-haves vs. nice-to-haves.",
        "3) Tour at multiple times to assess traffic/noise; talk to neighbors.",
        "4) Review disclosures and budget for inspection fixes and closing costs.",
        "Keep a single shared note for pros/cons and repair estimates.",
      ],
    },
    "old-soul-new-comforts-updating-heritage-homes-right": {
      title: "Old Soul, New Comforts: Updating Heritage Homes Right",
      author: "Robert Garcia",
      date: "2023-12-28",
      hero: normalizeHero(
        "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1600&auto=format&fit=crop"
      ),
      body: [
        "Start with structure, then systems, then style. That sequence saves money.",
        "1) Foundation and roof. 2) Electrical and plumbing to code. 3) Insulation and windows where permitted. 4) Finish carpentry and paint.",
        "Document and store any original details you remove—future owners will thank you.",
      ],
    },
  };

  const featuredPosts = [
    {
      slug: "smarter-living-connected-homes-that-help-you-buy-better",
      title: ARTICLES["smarter-living-connected-homes-that-help-you-buy-better"].title,
      excerpt:
        "From energy tracking to remote access, see how everyday tech in homes changes what buyers value most.",
      category: "Smart Living",
      readTime: "5 min read",
    },
    {
      slug: "build-green-save-more-materials-that-return-the-investment",
      title: ARTICLES["build-green-save-more-materials-that-return-the-investment"].title,
      excerpt:
        "Low-VOC paints, recycled steel, and cool roofs aren’t just eco—they can lower ownership costs long-term.",
      category: "Sustainability",
      readTime: "7 min read",
    },
    {
      slug: "mixed-use-momentum-where-retail-work-and-homes-meet",
      title: ARTICLES["mixed-use-momentum-where-retail-work-and-homes-meet"].title,
      excerpt:
        "Why neighborhoods that blend shops, offices, and housing are drawing investors and renters alike.",
      category: "Investing",
      readTime: "6 min read",
    },
  ];

  const blogPosts = [
    {
      slug: "downtown-buzz-or-outer-calm-choosing-your-next-neighborhood",
      title: ARTICLES["downtown-buzz-or-outer-calm-choosing-your-next-neighborhood"].title,
      excerpt:
        "Transit, schools, nightlife, and price—here’s a simple framework to compare city core vs. suburbs.",
      date: "2024-01-15",
      author: "Sarah Johnson",
      hero:
        ARTICLES["downtown-buzz-or-outer-calm-choosing-your-next-neighborhood"].hero,
    },
    {
      slug: "stage-to-sell-a-room-by-room-playbook-that-works",
      title: ARTICLES["stage-to-sell-a-room-by-room-playbook-that-works"].title,
      excerpt:
        "Lighting, layout, and color cues that make listings feel larger—without a massive budget.",
      date: "2024-01-12",
      author: "Michael Chen",
      hero: ARTICLES["stage-to-sell-a-room-by-room-playbook-that-works"].hero,
    },
    {
      slug: "2024-market-watch-rates-inventory-and-buyer-behavior",
      title: ARTICLES["2024-market-watch-rates-inventory-and-buyer-behavior"].title,
      excerpt:
        "What shifting supply and borrowing costs could mean for pricing and days-on-market this year.",
      date: "2024-01-08",
      author: "Emily Rodriguez",
      hero: ARTICLES["2024-market-watch-rates-inventory-and-buyer-behavior"].hero,
    },
    {
      slug: "modern-luxury-now-wellness-suites-and-whisper-quiet-tech",
      title: ARTICLES["modern-luxury-now-wellness-suites-and-whisper-quiet-tech"].title,
      excerpt:
        "High-end features buyers actually use—from air quality sensors to spa-style baths.",
      date: "2024-01-05",
      author: "David Thompson",
      hero:
        ARTICLES["modern-luxury-now-wellness-suites-and-whisper-quiet-tech"].hero,
    },
    {
      slug: "first-home-ready-a-friendly-checklist-for-new-buyers",
      title: ARTICLES["first-home-ready-a-friendly-checklist-for-new-buyers"].title,
      excerpt:
        "From pre-approval to the final walk-through—bite-size steps to make your first purchase smooth.",
      date: "2024-01-02",
      author: "Lisa Wang",
      hero: ARTICLES["first-home-ready-a-friendly-checklist-for-new-buyers"].hero,
    },
    {
      slug: "old-soul-new-comforts-updating-heritage-homes-right",
      title: ARTICLES["old-soul-new-comforts-updating-heritage-homes-right"].title,
      excerpt:
        "How to preserve character while upgrading safety, wiring, and insulation the smart way.",
      date: "2023-12-28",
      author: "Robert Garcia",
      hero:
        ARTICLES["old-soul-new-comforts-updating-heritage-homes-right"].hero,
    },
  ];

  useEffect(() => {
    if (isTest) return;
    const id = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % featuredPosts.length);
    }, 5000);
    return () => clearInterval(id);
   
  }, [isTest, featuredPosts.length]);


  const iv = supportsIO
    ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
    : { animate: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-stone-50">

      <SiteHeader />

      <section className="relative bg-gradient-to-r from-amber-900 to-rose-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-8 mt-lg-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">The Investment Guide</h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto">
              Clear, practical insights for buyers, sellers, and investors—no fluff, just what matters.
            </p>
          </motion.div>

          <div className="relative h-96" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
                  <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {featuredPosts[currentIndex].category}
                  </span>
                  <h2 className="text-3xl font-bold mt-4 mb-4">
                    {featuredPosts[currentIndex].title}
                  </h2>
                  <p className="text-amber-100 mb-6 text-lg">
                    {featuredPosts[currentIndex].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-200">
                      {featuredPosts[currentIndex].readTime}
                    </span>
                    <motion.button
                      className="bg-white text-amber-900 px-6 py-2 rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openPost(featuredPosts[currentIndex].slug)}
                      aria-label={`Read story: ${featuredPosts[currentIndex].title}`}
                    >
                      Read Story
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-stone-900"
            initial={{ opacity: 0 }}
            {...(supportsIO ? { whileInView: { opacity: 1 }, viewport: { once: true } } : { animate: { opacity: 1 } })}
            transition={{ duration: 0.6 }}
          >
            Fresh Reads
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                {...iv}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.hero}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    style={{
                      transform:
                        hoveredCard === index ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <motion.div
                    className="absolute top-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-sm"
                    initial={{ scale: 0 }}
                    {...(supportsIO ? { whileInView: { scale: 1 }, viewport: { once: true } } : { animate: { scale: 1 } })}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    aria-hidden="true"
                  >
                    Editor’s Pick
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{formatDate(post.date)}</span>
                    <span className="mx-2">•</span>
                    <span>By {post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <motion.button
                    className="text-rose-600 font-medium flex items-center"
                    whileHover={{ x: 5 }}
                    onClick={() => openPost(post.slug)}
                    aria-label={`Read more: ${post.title}`}
                  >
                    Read More →
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePost}
          >
            <motion.div
              className="absolute left-1/2 top-0 -translate-x-1/2 w-[95%] max-w-4xl bg-white rounded-2xl shadow-2xl overflow-y-auto"
              style={{ marginTop: "100px", maxHeight: "calc(100vh - 160px)" }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selectedPost.title}
            >

              <div
                style={{
                  backgroundImage: `url('${selectedPost.hero}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "42vh",
                }}
                aria-hidden="true"
              />

              <div className="p-5 p-md-6">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h2 className="fw-bold mb-1">{selectedPost.title}</h2>
                    <div className="text-muted">
                      {formatDate(selectedPost.date)} • By {selectedPost.author}
                    </div>
                  </div>
                  <button
                    className="btn btn-light rounded-circle"
                    onClick={closePost}
                    aria-label="Close"
                    style={{ width: 40, height: 40 }}
                  >
                    <i className="bi bi-x-lg" />
                  </button>
                </div>
                <div className="mt-4">
                  {selectedPost.body.map((para, i) => (
                    <p key={i} className="mb-3 text-secondary">
                      {para}
                    </p>
                  ))}
                </div>
                <div className="mt-4 d-flex gap-2">
                  <button className="btn btn-outline-secondary" onClick={closePost}>
                    ← Back to all posts
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* whatsapp and call Stickers */}
      <div className="sticker p-3">
        <a href="https://wa.me/917483060728" target="_blank" rel="noopener noreferrer">
          <div className="wp-sticker p-2 text-white rounded rounded-circle">
            <i className="bi bi-whatsapp"></i>
          </div>
        </a>
        <br />
        <a href="tel:+917483060728">
          <div className="contact-sticker bg-secondary p-2 text-white rounded rounded-circle">
            <i className="bi bi-telephone"></i>
          </div>
        </a>
      </div>

      <SiteFooter />
      
    </div>
  );
}

export default Blogs;
