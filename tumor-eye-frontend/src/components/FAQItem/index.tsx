import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full
          flex items-center justify-between
          py-[22px]
          text-left
          bg-transparent
          border-none
          cursor-pointer
          px-0
        "
        style={{
          borderBottom: "1px solid var(--c-accent)",
        }}
      >
        <span
          style={{
            fontFamily: "Abhaya Libre, serif",
            fontSize: "clamp(17px, 1.45vw, 21px)",
            fontWeight: 800,
            lineHeight: 1.15,
            color: "var(--c-text)",
          }}
        >
          {question}
        </span>

        <span
          key={open ? "minus" : "plus"}
          className="icon-pop"
          style={{
            fontSize: 24,
            lineHeight: 1,
            marginLeft: 24,
            flexShrink: 0,
            color: "var(--c-accent)",
            fontWeight: 300,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 18,
            transition: "color 0.3s ease",
          }}
        >
          {open ? "−" : "+"}
        </span>
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p
            className="pb-[22px] pt-[14px]"
            style={{
              fontFamily: "Abhaya Libre, serif",
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--c-text)",
              maxWidth: 760,
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-6px)",
              transition:
                "opacity 0.3s ease 0.08s, transform 0.3s ease 0.08s, color 0.3s ease",
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}