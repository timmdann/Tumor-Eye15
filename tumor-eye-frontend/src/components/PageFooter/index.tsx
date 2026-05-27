export default function PageFooter() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "12px",
        borderTop: "1px solid color-mix(in srgb, var(--c-text) 8%, transparent)",
        fontSize: 10,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "var(--c-text)",
        opacity: 0.4,
        fontFamily: "Abhaya Libre, serif",
      }}
    >
      v1.5 · 2026 · © TumorEye&apos;15 — All rights reserved
    </footer>
  );
}
