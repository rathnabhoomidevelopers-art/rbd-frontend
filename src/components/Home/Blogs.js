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

// Helper to register articles cleanly
function buildArticle({
  title, author, date, hero, excerpt, readTime, category, html,
}) {
  return {
    title, author, date, hero: normalizeHero(hero), excerpt, readTime, category, html,
  };
}

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

  // === INLINE ARTICLES (ALL CONTENT LIVES HERE) ===============================

  const ARTICLES = {
    // 1) Weekend Farmhouse
    "rise-of-weekend-farmhouses-bangalore": buildArticle({
      title: "The Rise of Weekend Farmhouses Around Bangalore: Investment or Lifestyle?",
      author: "Rathna Bhoomi Team",
      date: "2025-01-15",
      hero: "images/blogimage-1.png",
      excerpt: "Bengaluru’s professionals are eyeing farmland retreats. Is it lifestyle, investment, or both?",
      readTime: "8–10 min read",
      category: "Farmland",
      html: `
<div style="width:1000px;margin:0 auto;line-height:1.7">
  <h1>The Rise of Weekend Farmhouses Around Bangalore: Investment or Lifestyle?</h1>
  <p>In recent years, Bengaluru residents have been looking beyond the city’s glass towers and traffic jams for something more peaceful, personal, and connected to nature. The result? A sharp rise in interest toward farmhouse plots near Bangalore, creating a perfect blend of lifestyle and long-term investment.</p>
  <p>Whether you’re looking for a weekend retreat, a green investment, or a peaceful place to unwind, weekend farmland trends suggest that now is the right time to act.</p>
  <p>But the big question remains:<br/>Is this just a lifestyle trend—or a strong real estate investment opportunity?</p>
  <h2>What Is a Weekend Farmhouse?</h2>
  <p>A weekend farmhouse is a privately owned agricultural plot or farm land, often within 30–90 minutes of the city, that’s used as a getaway from the urban hustle.</p>
  <p>It typically includes:</p>
  <ul>
    <li>A small built-up structure (cottage or farmhouse)</li>
    <li>Gardens or vegetable patches</li>
    <li>Outdoor leisure spaces</li>
    <li>Natural features like trees, ponds, or farmland</li>
  </ul>
  <p>Developers now offer farmhouse communities that are:</p>
  <ul>
    <li>Legally approved (DTCP or agricultural compliance)</li>
    <li>Gated and secured</li>
    <li>Equipped with water, electricity, roads, and fencing</li>
  </ul>
  <h2>Why Are Farmhouse Plots Near Bangalore Booming?</h2>
  <p>Here are the key reasons driving this growth:</p>
  <h3>1. Work-from-Anywhere Culture</h3>
  <div>Post-COVID, remote and hybrid work have made weekend homes more usable all year round.</div>
  <div>Many professionals now live part-time in farmhouses, escaping the city stress.</div>
  <h3>2. Growing Desire for Nature &amp; Wellness</h3>
  <div>The appeal of a slow, sustainable lifestyle is real—especially for families with kids and senior citizens.</div>
  <div>Weekend farmhouses offer space for pets, organic farming, and digital detox.</div>
  <h3>3. Smart Investment with Low Risk</h3>
  <div>Unlike apartments that depreciate with time, land always appreciates. Farm plots have seen 10%–20% annual returns in some Bengaluru outskirts.</div>
  <div>Plus, no major maintenance cost if you’re not constructing immediately.</div>
  <h3>4. Proximity to City, Yet Peaceful</h3>
  <div>Because of ring roads (such as STRR and PRR) and expressways, places like</div>
  <ul>
    <li>Kanakapura Road</li>
    <li>Doddaballapura</li>
    <li>Devanahalli</li>
    <li>Chikkaballapur</li>
    <li>Magadi</li>
  </ul>
  <div>…are now easily reachable within 1–1.5 hours of central Bengaluru.</div>
  <img src="/images/blogimage-1.png" alt="Farmhouse illustration" style="width:100%;height:auto"/>
  <h2>Lifestyle Benefits of Owning a Weekend Farmhouse</h2>
  <div>Aside from returns, here’s how your life improves:</div>
  <h3>Fresh Air &amp; Green Space</h3><div>No noise, no pollution—just your private piece of nature.</div>
  <h3>Grow Your Own Food</h3><div>Organic vegetables, fruits, herbs—right in your backyard.</div>
  <h3>Mental Wellness</h3><div>Reconnect with yourself, practice yoga, or simply rest under a tree.</div>
  <h3>Pet-Friendly Freedom</h3><div>Let your pets roam freely—no rules, no neighbors complaining.</div>
  <h3>Safe Space for Kids</h3><div>Open land means more play, less screen time.</div>
  <h2>Investment Benefits: More Than Just a Second Home</h2>
  <div>Buying a farmhouse plot isn’t just a lifestyle upgrade—it’s also <b>a strategic asset.</b></div>
  <h3>Value Appreciation</h3><div>Locations near new highways, townships, or tourist corridors are growing fast.</div>
  <h3>Passive Income Potential</h3><div>You can lease the land to organic farmers, set up a weekend rental (Airbnb-style), or grow high-value crops.</div>
  <h3>Inflation Hedge</h3><div>Land retains value during inflation and often outperforms traditional savings.</div>
  <h2>Legal Things to Keep in Mind</h2>
  <div>Prior to purchasing a farmhouse property close to Bangalore, be sure to:</div>
  <ul>
    <li>Check <b>RTC (Pahani)</b> – Ownership &amp; land type</li>
    <li>Review <b>EC (Encumbrance Certificate)</b> – To ensure no legal dues</li>
    <li>Confirm <b>zoning and use</b> – Some areas restrict farmhouse construction</li>
    <li>Prefer <b>DTCP-approved</b> or <b>agriculturally compliant</b> layouts</li>
    <li>Make sure there is adequate power, water, access roads, and fencing.</li>
  </ul>
  <div>A good developer will provide <b>title documents</b>, layout approvals, and mutation post-registration.</div>
  <h2>What to Look for in a Weekend Farmland Project</h2>
  <ul>
    <li>Gated and secured layout</li><li>Plot size options</li><li>Water/power/roads</li>
    <li>Clear documentation</li><li>Optional farmhouse construction</li><li>Community maintenance</li>
  </ul>
  <h2>Who Should Invest in a Weekend Farmhouse?</h2>
  <ul>
    <li>Urban families</li><li>Professionals with flexible jobs</li><li>Organic farming enthusiasts</li>
    <li>NRIs</li><li>Retirees</li><li>Long-term investors</li>
  </ul>
  <h2>Why Choose Rathna Bhoomi Developers?</h2>
  <ul>
    <li>Legally compliant agricultural plots</li><li>Gated communities with utilities</li>
    <li>Optional farmhouse building assistance</li><li>Professional management</li>
    <li>Full legal assistance</li>
  </ul>
  <div>We help you invest in land that <b>gives you returns—and relaxation.</b></div>
  <h2>Ready to Build Your Weekend Retreat?</h2>
  <div>A peaceful farmhouse escape is no longer a dream—it’s one step away.</div>
  <h3>Contact</h3>
  <ul>
    <li>Visit: <a href="https://www.rathnabhoomidevelopers.in" target="_blank" rel="noopener noreferrer">www.rathnabhoomidevelopers.in</a></li>
    <li>Email: <a href="mailto:contact@rathnabhoomidevelopers.com">contact@rathnabhoomidevelopers.com</a></li>
    <li>Call: +91-9538752960</li>
  </ul>
  <h2>Final Thoughts</h2>
  <div>The rise of <b>weekend farmland trends</b> isn’t just a passing phase—it’s a movement toward <b>healthier, happier, and more grounded living.</b></div>
  <div>If you’re someone who dreams of owning a piece of land… then <b>a farmhouse plot near Bangalore</b> is your answer.</div>
  <div>Whether you choose it for lifestyle or investment—<b>it’s a win either way.</b></div>
</div>
      `,
    }),

    // 2) Partner With RBD – Joint Development
    "partner-with-rbd-joint-development": buildArticle({
      title: "How to Partner With Rathna Bhoomi Developers for Joint Development Projects",
      author: "Rathna Bhoomi Team",
      date: "2025-01-12",
      hero: "images/blogimage-2.png",
      excerpt: "Turn your land into a high-value project—retain ownership, unlock growth with a clear JDA.",
      readTime: "10–12 min read",
      category: "Joint Development",
      html: `
<div style="width:1000px;margin:0 auto;line-height:1.7">
  <h1>How to Partner With Rathna Bhoomi Developers for Joint Development Projects</h1>
  <p>
    Land in and around Bengaluru is one of the most valuable assets today. But if you’re a
    landowner wondering how to make the most of your property—without selling it off—joint
    venture development could be your smartest move.
  </p>
  <p>
    In this blog, we explain how joint venture land development in Bengaluru works, and how you
    can partner with Rathna Bhoomi Developers to turn your land into a high-value project
    without the financial burden or legal hassle.
  </p>
  <h2>What Is a Joint Development Agreement (JDA)?</h2>
  <p>A strategic alliance between a developer and a landowner is known as a Joint Development
    Agreement (JDA). In this model:</p>
  <ul>
    <li>The landowner contributes land</li>
    <li>Capital, design, building, marketing, and approvals are all provided by the developer</li>
    <li>Once the project is completed, the developed plots or built-up area is shared as per a
      pre-agreed ratio (e.g., 60:40, 50:50)</li>
  </ul>
  <p>
    This allows landowners to earn more from their property than by simply selling it, while
    also benefiting from the expertise of a professional real estate firm.
  </p>
  <h2>Why Bengaluru Is Perfect for Joint Venture Land Development</h2>
  <p>With rapid urban expansion and demand for plotted layouts, villas, and farmlands:</p>
  <ul>
    <li>Real estate hotspots are emerging in peripheral locations such as Sarjapur, Kanakapura,
      Doddaballapura, Chikkaballapur, and Devanahalli.</li>
    <li>Landowners are looking for trusted development partners instead of selling at undervalued
      prices.</li>
    <li>Buyers are seeking approved, well-developed plots from credible developers.</li>
  </ul>
  <p>This creates the perfect environment for land partnership in real estate through joint ventures.</p>
  <div style="margin:24px 0">
    <img src="/images/blogimage-2.png" alt="Joint development visual" style="width:100%;height:auto;display:block"/>
  </div>
  <h2>Why Choose Rathna Bhoomi Developers as Your JV Partner?</h2>
  <p>At Rathna Bhoomi Developers, we specialize in joint development of:</p>
  <ul>
    <li>Residential plotted layouts</li>
    <li>Gated farmland communities</li>
    <li>Eco-living and weekend farmhouse projects</li>
    <li>Mixed-use layouts with modern infrastructure</li>
  </ul>
  <h3>What Sets Us Apart</h3>
  <ul>
    <li>Clear and fair JDA agreements</li>
    <li>Legal and RERA compliance</li>
    <li>Transparent revenue/area sharing</li>
    <li>Complete development and marketing responsibility</li>
    <li>Timely execution with quality standards</li>
    <li>Respect for landowner trust and values</li>
  </ul>
  <h2>Step-by-Step: How to Partner With Rathna Bhoomi Developers</h2>
  <p>If you own land and want to explore a joint venture, here’s how we make the process smooth
    and safe:</p>
  <h3>1. Initial Discussion &amp; Land Assessment</h3>
  <ul>
    <li>You approach us with land details (location, size, documents)</li>
    <li>Due diligence is carried out by our technical and legal staff</li>
    <li>We evaluate project feasibility and development potential</li>
  </ul>
  <h3>2. Proposal &amp; Terms Finalization</h3>
  <p>We present a customized proposal:</p>
  <ul>
    <li>Area sharing or revenue sharing options</li>
    <li>Estimated development cost</li>
    <li>Project timeline and plan</li>
    <li>Mutually agreeable terms are finalized</li>
  </ul>
  <h3>3. Legal Agreement (JDA/MoU)</h3>
  <p>The signing of an open and legally binding Joint Development Agreement includes:</p>
  <ul>
    <li>Rights and responsibilities of both parties</li>
    <li>Sharing model</li>
    <li>Project scope and delivery terms</li>
  </ul>
  <p>We guarantee your complete legal protection and clarity at every stage.</p>
  <h3>4. Layout Design &amp; Government Approvals</h3>
  <ul>
    <li>Our architects design a layout plan based on zoning norms</li>
    <li>We handle DTCP/BMRDA/BIAAPA approvals</li>
    <li>Land conversion if required</li>
    <li>RERA registration (if applicable)</li>
  </ul>
  <h3>5. Site Development</h3>
  <p>We execute the development work which includes:</p>
  <ul>
    <li>Internal roads</li>
    <li>Drainage and electricity</li>
    <li>Water connection</li>
    <li>Plot demarcation</li>
    <li>Gated security</li>
  </ul>
  <h3>6. Marketing and Sales</h3>
  <ul>
    <li>We oversee on-ground advertising, digital marketing, and branding</li>
    <li>You benefit from fast-paced sales without worrying about any marketing cost</li>
  </ul>
  <h3>7. Profit/Plot Sharing</h3>
  <ul>
    <li>Once sales begin or plots are handed over, revenue or plot sharing is done as agreed</li>
    <li>Complete documentation support is provided for your share</li>
  </ul>
  <h2>Advantages of Collaborating With Rathna Bhoomi Developers on Land</h2>
  <div style="overflow-x:auto;margin:12px 0 24px">
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb">
      <thead>
        <tr>
          <th style="text-align:left;padding:12px;border-bottom:1px solid #e5e7eb;background:#f9fafb">Benefit</th>
          <th style="text-align:left;padding:12px;border-bottom:1px solid #e5e7eb;background:#f9fafb">What You Gain</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="padding:12px;border-bottom:1px solid #f1f5f9">No Upfront Investment</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">You don’t spend on development or approvals</td></tr>
        <tr><td style="padding:12px;border-bottom:1px solid #f1f5f9">Higher Returns</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">More profitable than direct sale of land</td></tr>
        <tr><td style="padding:12px;border-bottom:1px solid #f1f5f9">Expert Handling</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">Legal, technical, and marketing handled by professionals</td></tr>
        <tr><td style="padding:12px;border-bottom:1px solid #f1f5f9">Zero Risk</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">No loss of ownership, everything is as per agreement</td></tr>
        <tr><td style="padding:12px">Long-Term Value</td><td style="padding:12px">Developed land appreciates faster in value</td></tr>
      </tbody>
    </table>
  </div>
  <h2>Who Can Consider a Joint Venture?</h2>
  <p>You’re a perfect fit if you:</p>
  <ul>
    <li>Own land in Bengaluru or surrounding towns</li>
    <li>Have ½ acre or more in a developable zone</li>
    <li>Want to retain land ownership but generate profit</li>
    <li>Need a trusted partner to develop and market your land professionally</li>
  </ul>
  <p>Whether it’s inherited land, farmland, or unused property—your land can work for you.</p>
  <h2>Want to Explore a Joint Venture?</h2>
  <p>Allow us to assist you in discovering your land’s actual worth.</p>
  <p>Partnering with Rathna Bhoomi Developers means:</p>
  <ul>
    <li>Peace of mind</li>
    <li>Transparent dealings</li>
    <li>Legal clarity</li>
    <li>Maximum return on your land asset</li>
  </ul>
  <h3>Contact</h3>
  <ul>
    <li>Visit: <a href="https://www.rathnabhoomidevelopers.in" target="_blank" rel="noopener noreferrer">www.rathnabhoomidevelopers.in</a></li>
    <li>Email: <a href="mailto:contact@rathnabhoomidevelopers.com">contact@rathnabhoomidevelopers.com</a></li>
    <li>Call: +91-9538752960</li>
  </ul>
  <h2>Final Thoughts</h2>
  <p>With Bengaluru’s property market showing strong, sustained growth, now is the ideal time for
    landowners to leverage their property for higher profits.</p>
  <p>A joint venture land development in Bengaluru with a reliable partner like Rathna Bhoomi
    Developers gives you a win-win model—your land is retained, developed, and transformed into
    wealth-generating assets.</p>
  <p>Don’t just hold land. Let it grow with you.</p>
</div>
      `,
    }),

    // 3) Top 5 Farmland Locations
    "top-5-farmland-locations-near-bengaluru": buildArticle({
      title: "Top 5 Locations to Buy Farm Land Within 1–2 Hours of Bengaluru",
      author: "Rathna Bhoomi Team",
      date: "2025-01-10",
      hero: "images/blogimage-3.png",
      excerpt: "From Kanakapura to Devanahalli—discover where lifestyle meets appreciation.",
      readTime: "9 min read",
      category: "Guides",
      html: `
<div style="width:1000px;margin:0 auto;line-height:1.7">
  <h1>Top 5 Locations to Buy Farm Land Within 1–2 Hours of Bengaluru</h1>
  <p>
    As Bengaluru continues to grow and urbanize, a quiet revolution is taking place just outside
    its borders—the rise of weekend farmland investment. With rising stress levels in the city
    and the increasing popularity of sustainable living, owning a small piece of green land near
    Bengaluru has become both a lifestyle upgrade and a smart investment strategy.
  </p>
  <p>
    The good news? You don’t need to go far. There are several well-connected, fast-developing
    regions within 1–2 hours of Bengaluru that offer legal, peaceful, and promising
    opportunities for farm plots near Bangalore.
  </p>
  <div style="margin:24px 0">
    <img src="/images/blogimage-3.png" alt="Farm land near Bengaluru" style="width:100%;height:auto;display:block"/>
  </div>
  <p>In this guide, we explore the top 5 locations you should consider.</p>
  <h2>1. Kanakapura Road – The Green Belt</h2>
  <h3>Why It’s Popular</h3>
  <ul>
    <li>Favorite for nature lovers and wellness communities.</li>
    <li>Abundant water tables, fertile soil, scenic landscapes.</li>
  </ul>
  <h3>Benefits</h3>
  <ul>
    <li>Proximity to NICE Road and Metro (ongoing)</li>
    <li>Ideal for weekend retreats and organic farming</li>
    <li>Fast-developing social infrastructure</li>
  </ul>
  <h3>Investment Range</h3>
  <p>₹20–₹40 lakh per acre (depending on proximity to town limits).</p>
  <p><b>Ideal for:</b> Nature retreats, weekend villas, yoga resorts, permaculture projects</p>
  <h2>2. Chikkaballapur – The Airport Corridor Gem</h2>
  <h3>Why It’s Popular</h3>
  <ul>
    <li>Along NH-44 (BLR–Hyderabad), 65–75 km from Bengaluru</li>
    <li>Part of the aero-economic region near the airport</li>
  </ul>
  <h3>Benefits</h3>
  <ul>
    <li>Flat terrain and rich red soil</li>
    <li>Great water availability (near Nandi Hills catchment)</li>
    <li>Resorts and weekend home layouts emerging</li>
  </ul>
  <h3>Investment Range</h3>
  <p>₹15–₹30 lakh per acre</p>
  <p><b>Ideal for:</b> Airport-based investors, weekend farmers</p>
  <h2>3. Doddaballapur – The North Bengaluru Hotspot</h2>
  <h3>Why It’s Popular</h3>
  <ul>
    <li>Close to Devanahalli, Rajanakunte, Yelahanka</li>
    <li>Near PRR corridor and KIADB parks</li>
  </ul>
  <h3>Benefits</h3>
  <ul>
    <li>Future-proof connectivity</li>
    <li>Clear-titled farmland & managed plots</li>
  </ul>
  <h3>Investment Range</h3>
  <p>₹25–₹50 lakh per acre</p>
  <p><b>Ideal for:</b> Long-term investors</p>
  <h2>4. Magadi Road – A Hidden Gem in the West</h2>
  <h3>Why It’s Popular</h3>
  <ul>
    <li>Quiet countryside, rolling landscapes, rich rural culture</li>
    <li>60–75 km from city center</li>
  </ul>
  <h3>Benefits</h3>
  <ul>
    <li>Forests, lakes, hilly terrain</li>
    <li>Great for hobby farming and private retreats</li>
  </ul>
  <h3>Investment Range</h3>
  <p>₹12–₹25 lakh per acre</p>
  <p><b>Ideal for:</b> Budget investors, ecotourism ventures</p>
  <h2>5. Devanahalli – Where Growth Meets Green</h2>
  <h3>Why It’s Popular</h3>
  <ul>
    <li>Not just villas and airport projects—fertile agricultural belts nearby</li>
    <li>Gateway to North Bengaluru</li>
  </ul>
  <h3>Benefits</h3>
  <ul>
    <li>Close to Kempegowda International Airport</li>
    <li>IT parks, logistics zones, SEZs around</li>
  </ul>
  <h3>Investment Range</h3>
  <p>₹35–₹60 lakh per acre</p>
  <p><b>Ideal for:</b> Premium investors, NRIs</p>
  <h2>Bonus Tips for Weekend Farmland Investment</h2>
  <ul>
    <li>Title clarity (RTC, EC, survey map)</li>
    <li>Zoning/land use verification</li>
    <li>Access to water and roads</li>
    <li>Developer credibility</li>
    <li>Permission to construct (if needed)</li>
  </ul>
  <h2>How Rathna Bhoomi Developers Can Help</h2>
  <ul>
    <li>Gated farmland communities</li>
    <li>Legal documentation and support</li>
    <li>Water, road, and fencing included</li>
    <li>Optional farmhouse construction support</li>
  </ul>
  <h3>Contact</h3>
  <ul>
    <li>Visit: <a href="https://www.rathnabhoomidevelopers.in" target="_blank" rel="noopener noreferrer">www.rathnabhoomidevelopers.in</a></li>
    <li>Email: <a href="mailto:contact@rathnabhoomidevelopers.com">contact@rathnabhoomidevelopers.com</a></li>
    <li>Call: +91-9538752960</li>
  </ul>
  <h2>Final Thoughts</h2>
  <p>The demand for farm plots near Bangalore is rising not only as a weekend trend but as a reliable real estate asset. These five locations balance access, nature, and growth.</p>
</div>
      `,
    }),

    // 4) Joint Development in Bengaluru – (full)
    "joint-development-bengaluru-crores-without-selling": buildArticle({
      title: "Joint Development in Bengaluru: How Landowners Can Unlock Crores Without Selling",
      author: "Rathna Bhoomi Team",
      date: "2025-01-08",
      hero: "/images/blogimage-4.png",
      excerpt: "Keep the land. Monetize the future—inside the landowner–builder model.",
      readTime: "10–12 min read",
      category: "Joint Development",
      html: `
<div style="width:1000px;margin:0 auto;line-height:1.7">
  <h1>Joint Development in Bengaluru: How Landowners Can Unlock Crores Without Selling</h1>
  <p>In Bengaluru’s ever-evolving real estate market, one opportunity stands out for landowners:
    joint development. While many still think selling their land is the only way to profit, <b>joint
    development plots in Bengaluru</b> offer a smarter, long-term, and more profitable alternative—
    without losing ownership.</p>
  <p>If you’re a landowner in or around Bengaluru, this blog explains how you can unlock crores
    from your property through a landowner–builder partnership without selling it outright.</p>
  <h2>What Is Joint Development?</h2>
  <p>Joint development is a partnership where:</p>
  <ul>
    <li>The landowner provides the land</li>
    <li>The developer (or builder) handles planning, approvals, construction, and marketing</li>
    <li>Both parties share the final product—plots, villas, or built-up apartments—in a pre-agreed
      ratio (e.g., 60:40 or 50:50)</li>
  </ul>
  <p>It’s a win-win deal: <b>you keep your land and still earn big from it.</b></p>
  <h2>Why Joint Development Is Popular in Bengaluru</h2>
  <ul>
    <li>Developers save on land acquisition costs</li>
    <li>Landowners earn more than a one-time sale</li>
    <li>It’s legally secure and transparent with proper agreements</li>
    <li>Both parties share profits, not risks</li>
  </ul>
  <h2>How Landowners Unlock Crores Without Selling</h2>
  <p>Let’s break it down with a simple example:</p>
  <ul>
    <li>Land size: <b>2 acres</b> (around 87,000 sq. ft.)</li>
    <li>Developer offers a <b>60:40</b> plot sharing ratio</li>
    <li>After development, <b>60 saleable plots</b> are created</li>
    <li>Market value per plot: <b>₹20 lakh</b></li>
  </ul>
  <p>Now, <b>24 plots (40%)</b> go to you, the landowner. That’s: <b>24 × ₹20 lakh = ₹4.8 crores</b></p>
  <p>Compare this to a direct land sale at <b>₹2 crore per acre = ₹4 crore</b>. With joint
    development, you earn <b>₹80 lakh more</b>, plus brand value and ready-to-sell assets.</p>
  <h2>Benefits of Joint Development for Landowners</h2>
  <h3>1. Higher Returns Than Selling</h3>
  <p>Land appreciates. Selling now limits your upside. JD lets you monetize future value.</p>
  <h3>2. No Development Risk</h3>
  <p>All the cost and risk of approvals, layout formation, amenities, and sales are taken by the
    developer.</p>
  <h3>3. No Capital Investment Required</h3>
  <p>You don’t spend a rupee. You provide your land, and it works for you.</p>
  <h3>4. Long-Term Asset Creation</h3>
  <p>Instead of cash, you get ready plots or homes that you can sell, lease, or keep for future
    use.</p>
  <h3>5. Legal Protection</h3>
  <p>A clear Joint Development Agreement (JDA) ensures your rights, obligations, and profit share
    are protected.</p>
  <div style="margin:24px 0">
    <img src="/images/blogimage-4.png" alt="Joint development illustration" style="width:100%;height:auto;display:block"/>
  </div>
  <h2>Legal &amp; Process Overview for Joint Development</h2>
  <h3>Step 1: Land Verification</h3>
  <ul>
    <li>The developer checks title, zoning, size, and location</li>
    <li>You must have clear, marketable title (RTC, EC, mutation, etc.)</li>
  </ul>
  <h3>Step 2: Agreement Signing (JDA)</h3>
  <ul>
    <li>A Joint Development Agreement is signed</li>
    <li>It outlines duties, payment schedules, profit/area share, etc.</li>
  </ul>
  <h3>Step 3: Power of Attorney (POA)</h3>
  <ul>
    <li>Limited POA to the developer for approvals, registration, marketing, etc.</li>
    <li>POA is registered; ownership remains with you</li>
  </ul>
  <h3>Step 4: Layout Design &amp; Approvals</h3>
  <ul>
    <li>DC conversion and BIAAPA/DTCP/BMRDA sanction</li>
    <li>RERA registration (if needed)</li>
  </ul>
  <h3>Step 5: Development &amp; Plot Demarcation</h3>
  <ul>
    <li>Roads, drainage, electricity, water lines</li>
    <li>Plots marked and distributed per agreement</li>
  </ul>
  <h3>Step 6: Handover &amp; Sale</h3>
  <ul>
    <li>You get your share of plots/homes</li>
    <li>Sell at market rate or hold for higher future value</li>
  </ul>
  <h2>Bengaluru’s Best Sites for Collaborative Development</h2>
  <ul>
    <li>Devanahalli</li><li>Kanakapura Road</li><li>Doddaballapur</li>
    <li>Chikkaballapur</li><li>Sarjapur</li><li>Magadi Road</li>
  </ul>
  <h2>Why Partner With Rathna Bhoomi Developers?</h2>
  <ul>
    <li>Legal clarity and transparency</li><li>DC conversion & RERA</li>
    <li>Fast, quality development</li><li>Clear profit/area sharing</li>
    <li>End-to-end marketing & buyer management</li>
  </ul>
  <h3>Have Land in or Around Bengaluru?</h3>
  <p>Let us help you unlock its full potential—without selling it.</p>
  <ul>
    <li>Visit: <a href="https://www.rathnabhoomidevelopers.in" target="_blank" rel="noopener noreferrer">www.rathnabhoomidevelopers.in</a></li>
    <li>Email: <a href="mailto:contact@rathnabhoomidevelopers.com">contact@rathnabhoomidevelopers.com</a></li>
    <li>Call: +91-9538752960</li>
  </ul>
  <p>We’re always open to fair, ethical, and profitable partnerships.</p>
  <h2>Final Thoughts</h2>
  <p>Selling your land may feel like a quick solution, but it’s rarely the most profitable one.
    With the right partner and process, <b>joint development plots in Bengaluru</b> offer
    unmatched long-term value.</p>
  <p><b>Don’t sell your land. Let it build your future.</b></p>
</div>
      `,
    }),

    // 5) Farmland Investment 2025 (first)
    "farmland-investment-trend-2025": buildArticle({
      title: "Why Farm Land Near Bengaluru Is the Best Investment Trend for 2025",
      author: "Rathna Bhoomi Team",
      date: "2025-01-05",
      hero: "/images/blogimage-5.png",
      excerpt: "Sustainability, connectivity, and demand are redefining returns around Bengaluru.",
      readTime: "8–10 min read",
      category: "Investing",
      html: `
<div style="width:1000px;margin:0 auto;line-height:1.7">
  <h1>Why Farm Land Near Bengaluru Is the Best Investment Trend for 2025</h1>
  <p>In a real estate landscape filled with high-rise apartments, tech parks, and skyrocketing
    urban prices, one trend is standing tall—investing in farm land near Bengaluru.</p>
  <p>Once considered a niche or sentimental choice, agricultural land investment has now become a
    mainstream, high-return, lifestyle-friendly, and sustainable option. As we enter 2025, this
    trend is not just growing—it’s exploding.</p>
  <p>Whether you’re a professional, NRI, or traditional investor, now is the perfect time to
    understand why farmland around Bengaluru could be the smartest decision you’ll make this year.</p>
  <h2>What’s Fueling the Farmland Investment Boom?</h2>
  <h3>1. Shift Toward Sustainable Living</h3>
  <ul><li>Organic food preferences</li><li>Mental wellness retreats</li><li>Outdoor and remote working setups</li></ul>
  <p>Owning farmland offers all of these—in one package.</p>
  <h3>2. Lower Entry Point, Higher ROI</h3>
  <ul><li>More affordable (starting ₹10–₹25 lakh per acre)</li><li>Less risky</li><li>Appreciating faster due to demand</li></ul>
  <p>In some Bengaluru outskirts, land prices have doubled in 3–5 years.</p>
  <h3>3. Lifestyle + Investment Combo</h3>
  <ul><li>A weekend retreat</li><li>A farming opportunity</li><li>A future retirement space</li><li>A backup income stream</li></ul>
  <h2>Why Farm Land Near Bengaluru, Specifically?</h2>
  <p>Bengaluru is India’s Silicon Valley. However, there are great possibilities just beyond the
    municipal limits. Here’s why farmland around Bengaluru is booming in 2025:</p>
  <h3>Excellent Connectivity</h3>
  <ul><li>STRR</li><li>PRR</li><li>Widened NH-44 and NH-75</li></ul>
  <h3>Rapid Urban Expansion</h3>
  <ul><li>Devanahalli</li><li>Chikkaballapur</li><li>Kanakapura</li><li>Magadi</li><li>Doddaballapur</li></ul>
  <h3>High Demand for Gated Farm Communities</h3>
  <ul><li>Gated layouts</li><li>Fencing, roads, water &amp; electricity</li><li>Optional farmhouse construction</li><li>Maintenance & security</li></ul>
  <h2>The Benefits of 2025 Agricultural Land Investments</h2>
  <h3>Financial Returns</h3>
  <ul><li>Low holding cost</li><li>10–20% annual appreciation in select areas</li><li>Multiple exit strategies</li></ul>
  <h3>Lifestyle Returns</h3>
  <ul><li>Private getaways</li><li>Organic gardens/orchards</li><li>Peaceful for seniors/kids</li><li>Pet-friendly</li></ul>
  <p>Many NRIs and Bengaluru professionals are buying farmland now for retirement use later.</p>
  <div style="margin:24px 0">
    <img src="/images/blogimage-5.png" alt="Farmland investment illustration" style="width:100%;height:auto;display:block"/>
  </div>
  <h2>Top Farmland Investing Locations Close to Bengaluru</h2>
  <div style="overflow-x:auto;margin:12px 0 24px">
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb">
      <thead>
        <tr>
          <th style="text-align:left;padding:12px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Location</th>
          <th style="text-align:left;padding:12px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Distance</th>
          <th style="text-align:left;padding:12px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Highlights</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="padding:12px;border-bottom:1px solid #f1f5f9">Chikkaballapur</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">65–75 km</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">Near Airport, scenic views, water table</td></tr>
        <tr><td style="padding:12px;border-bottom:1px solid #f1f5f9">Kanakapura Road</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">55–70 km</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">Green belt, eco-resorts, yoga farms</td></tr>
        <tr><td style="padding:12px;border-bottom:1px solid #f1f5f9">Magadi Road</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">60–80 km</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">Rustic charm, peaceful</td></tr>
        <tr><td style="padding:12px;border-bottom:1px solid #f1f5f9">Devanahalli</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">40–60 km</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">Growth corridor, airport SEZ</td></tr>
        <tr><td style="padding:12px">Doddaballapur</td><td style="padding:12px">50–65 km</td><td style="padding:12px">Industrial + farming balance</td></tr>
      </tbody>
    </table>
  </div>
  <h2>Legal Checklist Before You Invest</h2>
  <ul>
    <li>RTC (Pahani), EC</li><li>Survey map</li><li>Conversion status</li><li>Developer credibility</li><li>RERA (if plotted)</li>
  </ul>
  <h2>Resale and Income Opportunities</h2>
  <ul>
    <li>Resale after appreciation</li><li>Lease for organic farming</li>
    <li>Build a cottage / Airbnb</li><li>Partner with local farmers</li>
  </ul>
  <h2>Why Choose Rathna Bhoomi Developers?</h2>
  <ul>
    <li>Clear-titled, legally vetted plots</li><li>Gated layouts with utilities</li>
    <li>Registration/documentation support</li><li>Optional farmhouse design & build</li>
  </ul>
  <h3>Ready to Own Your Piece of Green?</h3>
  <ul>
    <li>Visit: <a href="https://www.rathnabhoomidevelopers.in" target="_blank" rel="noopener noreferrer">www.rathnabhoomidevelopers.in</a></li>
    <li>Email: <a href="mailto:contact@rathnabhoomidevelopers.com">contact@rathnabhoomidevelopers.com</a></li>
    <li>Call: +91-9538752960</li>
  </ul>
  <h2>Final Thoughts</h2>
  <p><b>2025 is the year to go green—smartly, profitably, and peacefully.</b></p>
</div>
      `,
    }),

    // 6) Channel Partner Opportunities
    "channel-partner-opportunities-2025": buildArticle({
      title: "Everything You Need to Know About Channel Partner Opportunities in Real Estate",
      author: "Rathna Bhoomi Team",
      date: "2025-01-03",
      hero: "/images/blogimage-6.png",
      excerpt: "Low investment, structured commissions—build a sales business with developers.",
      readTime: "7–9 min read",
      category: "Careers",
      html: `
<div style="width:1000px;margin:0 auto;line-height:1.7">
  <h1>Everything You Need to Know About Channel Partner Opportunities in Real Estate</h1>
  <p>The Indian real estate sector is not just about builders and brokers anymore. A new breed of
    professionals is rising fast—<b>real estate channel partners</b>. In Bengaluru, where the
    property market is constantly expanding, channel partners are playing a key role in connecting
    developers and buyers, while building a profitable business of their own.</p>
  <p>Whether you’re a sales enthusiast, entrepreneur, or simply someone with a strong network,
    becoming a real estate channel partner in Bengaluru could be a rewarding opportunity in 2025.</p>
  <div style="margin:24px 0">
    <img src="/images/blogimage-6.png" alt="Real estate channel partner illustration" style="width:100%;height:auto;display:block"/>
  </div>
  <h2>What Is a Real Estate Channel Partner?</h2>
  <p>A channel partner is a person or firm authorized by a real estate developer to promote and sell
    properties on their behalf. Unlike traditional brokers, channel partners work in a structured
    way and often get:</p>
  <ul>
    <li>Formal onboarding and training</li>
    <li>Access to marketing materials</li>
    <li>Support with site visits</li>
    <li>Pre-defined commission structures</li>
    <li>Recognition and rewards for performance</li>
  </ul>
  <p>In short, it’s a property sales partnership with mutual benefits for both the developer and the
    partner.</p>
  <h2>Why Bengaluru Is Ideal for Channel Partner Opportunities</h2>
  <ul>
    <li>Rapidly expanding into suburban zones</li>
    <li>High demand for plots, farm lands, villas, and affordable homes</li>
    <li>Frequent launches of new gated projects</li>
    <li>Strong interest from NRIs and young homebuyers</li>
  </ul>
  <p>This makes it a goldmine of opportunities for those who want to promote properties and earn
    commissions.</p>
  <h2>What You Can Promote as a Channel Partner</h2>
  <ul>
    <li>Farmland plots near Bengaluru</li>
    <li>Residential layouts with gated communities</li>
    <li>Apartments and villas</li>
    <li>Joint development plots or land resale deals</li>
  </ul>
  <p>Developers like <b>Rathna Bhoomi Developers</b> even offer support to promote agriculture-based
    layouts and plotted developments, which are in high demand.</p>
  <h2>What’s the Earning Potential?</h2>
  <p>Commission-based income usually ranges between <b>1% and 5%</b> of the sale value.</p>
  <ul>
    <li>Sell a plot worth ₹30 lakhs</li>
    <li>Earn 2.5% commission = <b>₹75,000</b></li>
    <li>Close 3–4 sales a month → <b>₹2 lakh+/month</b></li>
  </ul>
  <h2>Benefits of Becoming a Channel Partner</h2>
  <ul>
    <li><b>Low to No Investment:</b> You don’t need to buy property.</li>
    <li><b>Flexible Working Hours:</b> Work part-time or weekends.</li>
    <li><b>Developer Support:</b> Training, brochures, site access, CRM tools.</li>
    <li><b>Fast & Transparent Commissions:</b> Payouts upon registration/milestones.</li>
    <li><b>Scalable Model:</b> Build a team and expand.</li>
  </ul>
  <h2>The Best Way to Begin</h2>
  <ul>
    <li>Register with a developer</li><li>Get trained</li><li>Promote via social/WhatsApp</li>
    <li>Schedule site visits</li><li>Close deals and earn commission</li>
  </ul>
  <h2>Why Choose Rathna Bhoomi Developers for Channel Partnership?</h2>
  <ul>
    <li>Transparent commission structure</li><li>Legal and approved plots & farm land</li>
    <li>Backend support for site visits & documentation</li><li>Marketing materials and training</li>
    <li>Quick payouts</li><li>Recognition & incentives</li>
  </ul>
  <h2>Ready to Start?</h2>
  <ul>
    <li>Website: <a href="https://www.rathnabhoomidevelopers.in" target="_blank" rel="noopener noreferrer">www.rathnabhoomidevelopers.in</a></li>
    <li>Email: <a href="mailto:info@rathnabhoomidevelopers.com">info@rathnabhoomidevelopers.com</a></li>
    <li>Phone: +91-XXXXXXXXXX</li>
  </ul>
  <h2>Final Thoughts</h2>
  <p>In a vibrant market like Bengaluru, channel partner programs are one of the smartest ways to
    enter real estate without heavy capital or risk. If you’re ready to hustle and close deals, the
    rewards are big.</p>
</div>
      `,
    }),

    // 7) Gated Farmland Communities
    "gated-farmland-communities-why-now": buildArticle({
      title: "Why Investing in Farmland Gated Communities Near Bangalore Makes Sense Now",
      author: "Rathna Bhoomi Team",
      date: "2025-01-02",
      hero: "/images/blogimage-7.png",
      excerpt: "Managed, secure, and legal: the modern path to peaceful land ownership.",
      readTime: "8–10 min read",
      category: "Farmland",
      html: `
<div style="width:1000px;margin:0 auto;line-height:1.7">
  <h1>Why Investing in Farmland Gated Communities Near Bangalore Makes Sense Now</h1>
  <p>Over the last few years, a quiet revolution has been taking shape around Bengaluru’s outskirts:
    <b>gated farmland communities</b>—agricultural land ownership with urban comforts and long-term
    investment potential.</p>
  <p>In 2025, professionals, NRIs, retirees, and first-time investors are looking for farm community
    options that offer <b>peace, profit, and purpose</b>.</p>
  <h2>What Are Gated Farmland Communities?</h2>
  <ul>
    <li>Individual farmland plots</li>
    <li>Shared amenities (clubhouse, security, roads, water)</li>
    <li>Farmhouse construction permissions (in most cases)</li>
    <li>Legal approvals (DTCP or under agricultural zoning)</li>
  </ul>
  <h2>Why Bangalore Is the Hub</h2>
  <ul>
    <li>High-income tech population that values wellness</li>
    <li>Expanding suburbs (PRR, STRR, NH44)</li>
    <li>Demand for weekend homes and eco-villages</li>
  </ul>
  <ul>
    <li>Kanakapura Road</li><li>Doddaballapura</li><li>Chikkaballapur</li>
    <li>Devanahalli</li><li>Nelamangala</li><li>Magadi Road</li>
  </ul>
  <h2>Why It Makes Sense to Invest Now</h2>
  <h3>1. Escape from City Stress</h3>
  <ul>
    <li>Reconnect with nature; unwind on weekends</li>
    <li>Grow your food; yoga; pets</li>
  </ul>
  <h3>2. Affordable Entry</h3>
  <ul>
    <li>Farmland plots 30–50% cheaper than city plots</li>
    <li>Low maintenance, no heavy construction required</li>
  </ul>
  <h3>3. Future-Ready Investment</h3>
  <ul>
    <li>Near growth corridors (airport, highways)</li>
    <li>Demand for weekend homes; KIADB projects</li>
  </ul>
  <p>Investors are seeing <b>10–15% CAGR</b> in some communities over 3–5 years.</p>
  <h3>4. Legal & Managed</h3>
  <ul>
    <li>DTCP/Agri-compliant, fenced & gated, professionally managed</li>
  </ul>
  <h3>5. Rental & Income Possibilities</h3>
  <ul>
    <li>Lease to organic farmers</li><li>Eco-tourism or farm-stays</li><li>Farm-to-fork ventures</li>
  </ul>
  <div style="margin:24px 0">
    <img src="/images/blogimage-7.png" alt="Gated farmland community near Bengaluru" style="width:100%;height:auto;display:block"/>
  </div>
  <h2>Legal Points to Check</h2>
  <ul>
    <li>RTC, EC, Survey, Zoning</li><li>Permission to construct</li><li>DTCP/LAO approvals where applicable</li>
  </ul>
  <h2>Gated vs Regular Farmland</h2>
  <div style="overflow-x:auto;margin:12px 0 24px">
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb">
      <thead>
        <tr>
          <th style="text-align:left;padding:12px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Feature</th>
          <th style="text-align:left;padding:12px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Gated Farmland</th>
          <th style="text-align:left;padding:12px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Regular Farmland</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="padding:12px;border-bottom:1px solid #f1f5f9">Fencing & Security</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">Yes</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">No</td></tr>
        <tr><td style="padding:12px;border-bottom:1px solid #f1f5f9">Internal Roads & Lighting</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">Yes</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">No</td></tr>
        <tr><td style="padding:12px;border-bottom:1px solid #f1f5f9">Water & Power</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">Provided</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">Arrange yourself</td></tr>
        <tr><td style="padding:12px;border-bottom:1px solid #f1f5f9">Legal Support</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">Developer assists</td><td style="padding:12px;border-bottom:1px solid #f1f5f9">Buyer responsibility</td></tr>
        <tr><td style="padding:12px">Community Living</td><td style="padding:12px">Yes</td><td style="padding:12px">No</td></tr>
      </tbody>
    </table>
  </div>
  <h2>Who Should Invest?</h2>
  <ul>
    <li>Working professionals seeking weekend getaways</li>
    <li>Retirees, NRIs, first-time investors</li>
    <li>Organic farming enthusiasts</li>
  </ul>
  <h2>Rathna Bhoomi Developers – Your Partner</h2>
  <ul>
    <li>DTCP/legally compliant layouts</li><li>Fully gated with clear titles</li>
    <li>Easy EMI options</li><li>Strategic growth locations</li>
  </ul>
  <h2>Contact</h2>
  <ul>
    <li>Website: <a href="https://www.rathnabhoomidevelopers.in" target="_blank" rel="noopener noreferrer">www.rathnabhoomidevelopers.in</a></li>
    <li>Email: <a href="mailto:contact@rathnabhoomidevelopers.com">contact@rathnabhoomidevelopers.com</a></li>
    <li>Phone: +91-9538752960</li>
  </ul>
  <h2>Final Thoughts</h2>
  <p>The idea of farmland ownership has evolved—from rugged rural plots to professionally
    managed communities. In Bengaluru, it’s not a trend; it’s a movement—and the best time is
    <b>now</b>.</p>
</div>
      `,
    }),

    // 8) Legal Checklist Karnataka
    "legal-checklist-agri-land-karnataka": buildArticle({
      title: "Legal Checklist Before Buying Agricultural Land in Karnataka",
      author: "Rathna Bhoomi Team",
      date: "2025-01-01",
      hero: "/images/blogimage-8.png",
      excerpt: "RTC, EC, conversion, surveys—your end-to-end due-diligence guide.",
      readTime: "10–12 min read",
      category: "Legal",
      html: `
<div style="width:1000px;margin:0 auto;line-height:1.7">
  <h1>Legal Checklist Before Buying Agricultural Land in Karnataka</h1>
  <p>Buying a piece of agricultural land in Karnataka can be a smart investment—whether for
    farming, farmhouse development, weekend retreats, or simply for land appreciation. However,
    farmland purchases come with a different set of legal requirements compared to residential
    plots or apartments.</p>
  <p>Without due diligence, a buyer can easily fall into legal complications. Use this checklist:</p>
  <h2>Can Anyone Buy Agricultural Land in Karnataka?</h2>
  <p>Post-2020 amendments allow both farmers and non-farmers to buy agricultural land.</p>
  <ul>
    <li>No income ceiling</li><li>Individuals/companies can purchase</li><li>Use must remain agricultural unless converted</li>
  </ul>
  <div style="margin:24px 0">
    <img src="/images/blogimage-8.png" alt="Agricultural land legal checklist illustration" style="width:100%;height:auto;display:block"/>
  </div>
  <h2>A Legal Checklist</h2>
  <ol>
    <li>
      <h3>Examine RTC (Pahani)</h3>
      <ul><li>Ownership, land type, crop patterns, usage history</li></ul>
    </li>
    <li>
      <h3>Mutation Extract (MR)</h3>
      <ul><li>Confirms latest ownership transfer</li></ul>
    </li>
    <li>
      <h3>Encumbrance Certificate (EC)</h3>
      <ul><li>Loans, mortgages, legal dues, court cases</li></ul>
    </li>
    <li>
      <h3>Land Conversion Status</h3>
      <ul><li>DC Conversion for non-agri use; zoning approvals</li></ul>
    </li>
    <li>
      <h3>Survey & Boundary Verification</h3>
      <ul><li>Licensed surveyor; Survey Sketch; physical inspection</li></ul>
    </li>
    <li>
      <h3>Title Deed</h3>
      <ul><li>Original, clear, unencumbered</li></ul>
    </li>
    <li>
      <h3>Govt Restrictions/Acquisition</h3>
      <ul><li>Check Revenue Dept/Tehsildar for notices</li></ul>
    </li>
    <li>
      <h3>Village Office Confirmation</h3>
      <ul><li>Ownership, usage, taxes/disputes</li></ul>
    </li>
    <li>
      <h3>Khata Certificate & Extract</h3>
      <ul><li>Useful for future conversion/resale</li></ul>
    </li>
    <li>
      <h3>Sale Agreement & Final Sale Deed</h3>
      <ul><li>Registered agreement; stamp duty; registration charges</li></ul>
    </li>
    <li>
      <h3>Update Records Post-Sale</h3>
      <ul><li>Mutation in your name; updated RTC</li></ul>
    </li>
  </ol>
  <h2>Common Pitfalls</h2>
  <ul>
    <li>Buying from POA holder without ownership</li><li>Assuming housing use without conversion</li>
    <li>Ignoring zoning (green belt/forest)</li><li>Not checking litigation/family claims</li>
  </ul>
  <h2>Bonus Tip: Prefer DTCP-Approved Farm Layouts</h2>
  <ul>
    <li>Roads, water, drainage, electricity documentation</li><li>RERA registration (if applicable)</li>
  </ul>
  <p>Rathna Bhoomi Developers offers transparent, compliant farmland projects near Bengaluru.</p>
  <h3>Contact Rathna Bhoomi Developers</h3>
  <ul>
    <li>Website: <a href="https://www.rathnabhoomidevelopers.in" target="_blank" rel="noopener noreferrer">www.rathnabhoomidevelopers.in</a></li>
    <li>Email: <a href="mailto:contact@rathnabhoomidevelopers.com">contact@rathnabhoomidevelopers.com</a></li>
    <li>Phone: +91-538752960</li>
  </ul>
</div>
      `,
    }),

    // 9) Channel Partners Earnings
    "channel-partners-earnings-farm-plots": buildArticle({
      title: "How Channel Partners Can Earn Big by Promoting Farm and Plot Sales",
      author: "Rathna Bhoomi Team",
      date: "2025-01-01",
      hero: "/images/blogimage-9.png",
      excerpt: "1%–5% commissions, ready marketing kits, and a booming plots market.",
      readTime: "7–9 min read",
      category: "Careers",
      html: `
<div style="width:1000px;margin:0 auto;line-height:1.7">
  <h1>How Channel Partners Can Earn Big by Promoting Farm and Plot Sales</h1>
  <p>In India’s fast-growing real estate sector, you don’t have to own land to profit from it. Many
    individuals today earn substantial income as <b>real estate channel partners</b>—especially with
    the demand for farm lands and residential plots near Bengaluru.</p>
  <div style="margin:24px 0">
    <img src="/images/blogimage-9.png" alt="Channel partners promoting farmland and plot sales" style="width:100%;height:auto;display:block"/>
  </div>
  <h2>Who Are Channel Partners?</h2>
  <p>Independent agents/teams who partner with developers to promote and sell property with formal
    training, incentives, and recognition.</p>
  <h2>Why Farmland & Plots Are Booming</h2>
  <ul>
    <li>Urban crowding and high apartment prices</li>
    <li>Sustainable living & farmhouse trend</li>
    <li>Outer areas like Devanahalli, Kanakapura, Hoskote, Doddaballapura</li>
  </ul>
  <h2>Earnings – How Much?</h2>
  <p>Typical commissions: <b>1%–5%</b> of sale value.</p>
  <ul>
    <li>Plot ₹25 lakh → 3% = <b>₹75,000</b></li>
    <li>2–3 deals/month → <b>₹50k–₹2L+</b> per month</li>
  </ul>
  <h2>Benefits</h2>
  <ul>
    <li>Zero inventory/investment</li><li>Flexible</li><li>Developer support</li><li>Fast payouts</li>
  </ul>
  <h2>Onboarding with Rathna Bhoomi</h2>
  <ol>
    <li>Register</li><li>Get trained on projects</li><li>Promote (social, WhatsApp, calls)</li>
    <li>Schedule site visits</li><li>Close & get paid post-registration</li>
  </ol>
  <h2>Why Plots Sell Easier</h2>
  <ul>
    <li>Lower entry cost</li><li>Appreciation</li><li>Flexibility to build</li><li>Minimal maintenance</li>
  </ul>
  <h2>Success Tips</h2>
  <ul>
    <li>Know the product & approvals</li><li>Be transparent</li><li>Stay active on social</li>
    <li>Follow up & track leads</li><li>Pick a niche/locality</li>
  </ul>
  <h2>Partner with Rathna Bhoomi Developers</h2>
  <ul>
    <li>DTCP-approved, clear projects</li><li>Backend & sales support</li><li>Transparent commissions</li>
  </ul>
  <h2>Contact</h2>
  <ul>
    <li>Website: <a href="https://www.rathnabhoomidevelopers.in" target="_blank" rel="noopener noreferrer">www.rathnabhoomidevelopers.in</a></li>
    <li>Email: <a href="mailto:contact@rathnabhoomidevelopers.com">contact@rathnabhoomidevelopers.com</a></li>
    <li>Phone: +91-9538752960</li>
  </ul>
  <h2>Final Thoughts</h2>
  <p>If you’re looking for a low-risk, high-reward opportunity, this is your moment. <b>Start
    promoting. Start earning. Start growing.</b></p>
</div>
      `,
    }),
  };
  // === END ARTICLES ===========================================================

  const featuredSlugs = [
    "rise-of-weekend-farmhouses-bangalore",
    "top-5-farmland-locations-near-bengaluru",
    "joint-development-bengaluru-crores-without-selling",
  ];
  const featuredPosts = featuredSlugs.map((slug) => {
    const a = ARTICLES[slug];
    return {
      slug,
      title: a.title,
      excerpt: a.excerpt,
      category: a.category,
      readTime: a.readTime,
    };
  });

  // Fresh Reads: exclude featured and de-duplicate by title (case/trim)
  const blogPosts = (() => {
    const entries = Object.entries(ARTICLES)
      .filter(([slug]) => !featuredSlugs.includes(slug)); // remove repeats from grid
    const seen = new Set();
    const deduped = [];
    for (const [slug, a] of entries) {
      const key = (a.title || "").trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push({ slug, title: a.title, excerpt: a.excerpt, date: a.date, author: a.author, hero: a.hero });
    }
    // sort newest first (optional)
    deduped.sort((p, q) => new Date(q.date) - new Date(p.date));
    return deduped;
  })();

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

      {/* Hero / Featured slider */}
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
              Clear, practical insights for buyers, sellers, investors, and landowners.
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

      {/* Grid */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-stone-900"
            initial={{ opacity: 0 }}
            {...(supportsIO
              ? { whileInView: { opacity: 1 }, viewport: { once: true } }
              : { animate: { opacity: 1 } })}
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
                transition={{ duration: 0.5, delay: index * 0.06 }}
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
                    style={{ transform: hoveredCard === index ? "scale(1.05)" : "scale(1)" }}
                  />
                  <motion.div
                    className="absolute top-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-sm"
                    initial={{ scale: 0 }}
                    {...(supportsIO
                      ? { whileInView: { scale: 1 }, viewport: { once: true } }
                      : { animate: { scale: 1 } })}
                    transition={{ delay: index * 0.06 + 0.2 }}
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
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

      {/* Modal with FULL article (inlined HTML) */}
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
              className="absolute left-1/2 top-0 -translate-x-1/2 w-[95%] max-w-5xl bg-white rounded-2xl shadow-2xl overflow-y-auto"
              style={{ marginTop: "64px", maxHeight: "calc(100vh - 96px)" }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selectedPost.title}
            >
              {/* Top bar */}
              <div className="d-flex justify-content-between align-items-center px-3 px-md-4 py-3 border-bottom">
                <div className="small text-muted">
                  {formatDate(selectedPost.date)} • {selectedPost.author}
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

              {/* Render the HTML of the chosen article */}
                <div className="px-2 px-md-3 py-3 py-md-4">
                  <div className="blog-article">
                    <div dangerouslySetInnerHTML={{ __html: selectedPost.html }} />
                    {/* Back button stays *inside* the article, so it renders at the very end */}
                    <div className="mt-3 d-flex gap-2">
                      <button className="btn btn-outline-secondary" onClick={closePost}>
                        ← Back to all posts
                      </button>
                    </div>
                  </div>
                </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stickers */}
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
