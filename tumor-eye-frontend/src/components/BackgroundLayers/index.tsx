export default function BackgroundLayers() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 1100px 700px at 18% 38%, color-mix(in srgb, var(--c-accent) 9%, transparent), transparent 60%), radial-gradient(ellipse 900px 600px at 82% 70%, color-mix(in srgb, var(--c-panel) 12%, transparent), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--c-text) 1px, transparent 1px), linear-gradient(to bottom, var(--c-text) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: "-120px",
          bottom: "-120px",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, color-mix(in srgb, var(--c-accent) 22%, transparent), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </>
  );
}
