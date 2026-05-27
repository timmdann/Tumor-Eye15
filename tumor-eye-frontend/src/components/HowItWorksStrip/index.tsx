import React from "react";
import { HOW_IT_WORKS_STEPS } from "@/data/howItWorks";
import PageFooter from "@/components/PageFooter";

export default function HowItWorksStrip() {
  return (
    <section
      className="relative z-10 shrink-0"
      style={{
        borderTop: "1px solid color-mix(in srgb, var(--c-text) 14%, transparent)",
        background: "color-mix(in srgb, var(--c-bg) 70%, transparent)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="px-4 md:px-20 py-5 flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-0">
        {HOW_IT_WORKS_STEPS.map((step, i, arr) => (
          <React.Fragment key={step.n}>
            <div className="flex items-center gap-4">
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--c-accent)",
                  lineHeight: 1,
                  opacity: 0.85,
                  fontFamily: "Abhaya Libre, serif",
                }}
              >
                {step.n}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--c-text)", lineHeight: 1.2, fontFamily: "Abhaya Libre, serif" }}>
                  {step.label}
                </div>
                <div style={{ fontSize: 11, letterSpacing: "1px", color: "var(--c-text)", opacity: 0.55, fontFamily: "Abhaya Libre, serif" }}>
                  {step.sub}
                </div>
              </div>
            </div>
            {i < arr.length - 1 && (
              <div aria-hidden className="md:mx-12" style={{ color: "var(--c-accent)", opacity: 0.5, fontSize: 20 }}>
                <span className="hidden md:inline">→</span>
                <span className="md:hidden">↓</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <PageFooter />
    </section>
  );
}
