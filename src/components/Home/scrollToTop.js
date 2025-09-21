import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ behavior = "smooth" }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (hash) {
      const id = hash.startsWith("#") ? hash.slice(1) : hash;

      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior, block: "start" });
          return true;
        }
        return false;
      };

      if (tryScroll()) return;

      const raf = requestAnimationFrame(() => {
        if (tryScroll()) return;
        const observer = new MutationObserver(() => {
          if (tryScroll()) observer.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: true });
        setTimeout(() => observer.disconnect(), 1000);
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, hash, behavior]);

  return null;
}
