import type { ReactNode } from "react";

export default function SideButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-[232px] h-[50px] rounded-sm border-none cursor-pointer text-[16px] font-extrabold transition-opacity hover:opacity-90"
      style={{ backgroundColor: "#4a7c73", color: "#1c2b2e" }}
    >
      {children}
    </button>
  );
}
