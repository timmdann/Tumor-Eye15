import type { ReactNode } from "react";

interface RoleButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

export default function RoleButton({
  active,
  onClick,
  children,
}: RoleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative bg-transparent border-none cursor-pointer pb-[4px] text-[14px] font-extrabold"
      style={{ color: "var(--c-text)", opacity: active ? 1 : 0.28 }}
    >
      {children}
      {active && (
        <span
          className="absolute left-0 right-0 -bottom-[1px] h-px"
          style={{ backgroundColor: "var(--c-text)" }}
        />
      )}
    </button>
  );
}
