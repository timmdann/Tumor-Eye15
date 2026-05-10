import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid var(--c-accent)" }}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between py-4 text-left bg-transparent border-none cursor-pointer"
      >
        <span
          style={{
            fontFamily: "Abhaya Libre, serif",
            fontSize: "clamp(16px, 1.5vw, 20px)",
            fontWeight: 700,
            color: "var(--c-text)",
          }}
        >
          {question}
        </span>
        <span
          key={open ? "minus" : "plus"}
          className="icon-pop"
          style={{
            fontSize: 26,
            lineHeight: 1,
            marginLeft: 24,
            flexShrink: 0,
            color: "var(--c-accent)",
            fontWeight: 300,
            display: "inline-block",
            transition: "color 0.3s ease",
          }}
        >
          {open ? "−" : "+"}
        </span>
      </button>

      {/* CSS Grid trick: animates height without a fixed max-height */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p
            className="pb-5"
            style={{
              fontFamily: "Abhaya Libre, serif",
              fontSize: 16,
              lineHeight: 1.75,
              color: "var(--c-text)",
              maxWidth: 760,
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.3s ease 0.08s, transform 0.3s ease 0.08s, color 0.3s ease",
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
