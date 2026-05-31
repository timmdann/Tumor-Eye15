import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare function gtag(...args: unknown[]): void;

export default function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
    gtag("event", "page_view", {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
}
