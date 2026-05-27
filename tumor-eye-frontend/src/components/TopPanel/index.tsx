import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import ThemeIcon from "@/components/ThemeIcon";

interface TopPanelProps {
  className?: string;
}

function TopPanel({ className = "" }: TopPanelProps) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`absolute top-0 right-0 anim-fade-up anim-delay-1 ${className}`}>
      <div
        className="w-42.5 h-14.5 rounded-bl-md flex items-center px-7 gap-5.5"
        style={{ backgroundColor: "var(--c-panel)" }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-transparent border-none cursor-pointer text-[13px] font-bold min-h-12"
          style={{ color: "var(--c-panel-text)" }}
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          className="ml-auto bg-transparent border-none cursor-pointer flex items-center justify-center min-h-12 min-w-12"
          style={{ color: "var(--c-panel-text)" }}
          aria-label="Toggle theme"
        >
          <ThemeIcon isDark={isDark} />
        </button>
      </div>
    </div>
  );
}

export default React.memo(TopPanel);
