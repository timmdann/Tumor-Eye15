import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function Button({ onClick, children, type = "button", disabled }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-10 py-3 text-xl font-extrabold border-none cursor-pointer transition-opacity hover:opacity-90 rounded-sm min-h-12 disabled:opacity-50"
      style={{
        background: "var(--c-panel)",
        color: "var(--c-text)",
        fontFamily: "Abhaya Libre, serif",
      }}
    >
      {children}
    </button>
  );
}

export default React.memo(Button);
