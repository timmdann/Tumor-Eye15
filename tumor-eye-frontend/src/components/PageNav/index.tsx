import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import ThemeIcon from "@/components/ThemeIcon";

export interface PageNavLink {
  label: string;
  to: string;
}

interface PageNavProps {
  links: PageNavLink[];
}

function PageNav({ links }: PageNavProps) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="absolute top-0 right-0 anim-fade-up">
      <nav
        className="h-[58px] px-[26px] rounded-bl-md flex items-center gap-[28px]"
        style={{ backgroundColor: "var(--c-panel)" }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-transparent border-none cursor-pointer text-[13px] font-bold whitespace-nowrap min-h-[48px]"
          style={{ color: "var(--c-panel-text)" }}
        >
          ← Back
        </button>

        {links.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            replace
            className="no-underline text-[13px] font-bold whitespace-nowrap"
            style={{ color: "var(--c-panel-text)" }}
          >
            {label}
          </Link>
        ))}

        <button
          type="button"
          onClick={toggleTheme}
          className="bg-transparent border-none cursor-pointer flex items-center justify-center min-h-[48px] min-w-[48px]"
          style={{ color: "var(--c-panel-text)" }}
          aria-label="Toggle theme"
        >
          <ThemeIcon isDark={isDark} />
        </button>
      </nav>
    </div>
  );
}

export default React.memo(PageNav);
