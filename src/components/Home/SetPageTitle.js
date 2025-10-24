// SetPageTitle.jsx
import { useEffect } from "react";

export default function SetPageTitle({ title }) {
  useEffect(() => {
    document.title = `${title} | Rathna Bhoomi Developers`;
  }, [title]);

  return null;
}
