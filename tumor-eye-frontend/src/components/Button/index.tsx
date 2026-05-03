import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-10 py-3 text-xl font-extrabold border-none cursor-pointer transition-opacity hover:opacity-90 rounded-sm"
      style={{
        background: `var(--c-panel)`,
        color: `var(--c-text)`,
        fontFamily: "Abhaya Libre, serif",
      }}
    >
      {children}
    </button>
  );
}
