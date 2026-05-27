import React from "react";

interface SoonProps {
  name: string;
}

function Soon({ name }: SoonProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-2xl"
      style={{ color: "var(--c-text)", fontFamily: "Abhaya Libre, serif" }}
    >
      {name} — coming soon
    </div>
  );
}

export default React.memo(Soon);
