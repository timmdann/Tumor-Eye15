import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import ThemeIcon from "@/components/ThemeIcon";
import { NAV_LINKS } from "@/data/navLinks";

const NAV_PATHS = NAV_LINKS.map((l) => l.path);

interface NavbarProps {
  backTo?: string;
}

function Navbar({ backTo }: NavbarProps = {}) {
  const { isDark, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const replaceHistory = (NAV_PATHS as string[]).includes(pathname);

  const links = backTo
    ? [{ label: "← Back", path: backTo }, ...NAV_LINKS.slice(0, -1)]
    : NAV_LINKS;

  return (
    <header
      className="flex justify-end relative z-50 shrink-0"
      style={{ height: "var(--navbar-height)" }}
    >
      {/* Desktop nav — absolutely anchored to right edge */}
      <nav
        className="anim-slide-down hidden md:flex items-center px-7 rounded-bl-lg absolute right-0 top-0"
        style={{
          width: 560,
          height: "var(--navbar-height)",
          backgroundColor: "var(--c-panel)",
        }}
      >
        <div className="flex items-center justify-between w-full">
          {links.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              replace={replaceHistory}
              className="text-base font-extrabold no-underline opacity-90 hover:opacity-100 transition-opacity whitespace-nowrap"
              style={{ color: "var(--c-text)" }}
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer border-none bg-transparent opacity-80 hover:opacity-100 transition-opacity flex items-center justify-center min-h-12 min-w-12"
            style={{ color: "var(--c-text)" }}
            aria-label="Toggle theme"
          >
            <ThemeIcon isDark={isDark} />
          </button>
        </div>
      </nav>

      {/* Mobile nav bar — absolutely anchored to right edge */}
      <div
        className="anim-slide-down md:hidden absolute right-0 top-0 flex items-center gap-2 px-4"
        style={{
          height: "var(--navbar-height-mobile)",
          backgroundColor: "var(--c-panel)",
        }}
      >
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="bg-transparent border-none cursor-pointer flex items-center justify-center min-h-12 min-w-12"
          style={{ color: "var(--c-text)" }}
        >
          <ThemeIcon isDark={isDark} />
        </button>

        <button
          type="button"
          onClick={toggleMobile}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="bg-transparent border-none cursor-pointer flex flex-col gap-1.5 items-center justify-center min-h-12 min-w-12 p-2"
          style={{ color: "var(--c-text)" }}
        >
          <span
            className="block w-5 h-0.5"
            style={{ backgroundColor: "var(--c-text)" }}
          />
          <span
            className="block w-5 h-0.5"
            style={{ backgroundColor: "var(--c-text)" }}
          />
          <span
            className="block w-5 h-0.5"
            style={{ backgroundColor: "var(--c-text)" }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-full right-0 w-52 rounded-bl-lg shadow-lg z-50"
          style={{ backgroundColor: "var(--c-panel)" }}
        >
          {links.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              replace={replaceHistory}
              onClick={closeMobile}
              className="flex items-center px-6 py-3 text-sm font-extrabold no-underline hover:opacity-80 transition-opacity min-h-12"
              style={{ color: "var(--c-text)" }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default React.memo(Navbar);
