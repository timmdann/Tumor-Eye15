import React from "react";

interface InfoBlockProps {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

function InfoBlock({ eyebrow, title, children }: InfoBlockProps) {
  return (
    <div className="mb-[28px]">
      <p
        className="uppercase font-extrabold mb-[5px]"
        style={{ fontSize: 12, letterSpacing: "0.04em", color: "var(--c-muted)" }}
      >
        {eyebrow}
      </p>
      <h2
        className="font-extrabold mb-[6px]"
        style={{ fontSize: 22, lineHeight: 1.2, color: "var(--c-accent)" }}
      >
        {title}
      </h2>
      <p
        className="font-bold"
        style={{ fontSize: 17, lineHeight: 1.38, color: "var(--c-text)" }}
      >
        {children}
      </p>
    </div>
  );
}

export default React.memo(InfoBlock);
