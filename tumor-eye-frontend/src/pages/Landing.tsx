import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Masonry from "@/components/Masonry";
import TextType from "@/components/TextType";

const MRI_ITEMS = [
  { id: "1", img: "/item1.jpg", url: "#", height: 400 },
  { id: "2", img: "/item2.jpg", url: "#", height: 300 },
  { id: "3", img: "/item6.jpg", url: "#", height: 730 },
  { id: "5", img: "/item5.jpg", url: "#", height: 400 },
  { id: "6", img: "/item3.jpg", url: "#", height: 300 },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col relative overflow-hidden"
      style={{ backgroundColor: "var(--c-bg)", height: "100vh" }}
    >
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
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
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
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--c-accent) 22%, transparent), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <Navbar />

      <main
        className="flex items-stretch px-0 relative z-10"
        style={{ flex: 1, minHeight: 0, overflow: "hidden" }}
      >
        <div
          className="z-10 anim-fade-up flex flex-col justify-center"
          style={{
            width: "52%",
            padding: "32px 60px 32px 80px",
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--c-bg) 92%, transparent) 0%, color-mix(in srgb, var(--c-bg) 60%, transparent) 100%)",
            backdropFilter: "blur(16px)",
            borderRight:
              "1px solid color-mix(in srgb, var(--c-accent) 12%, transparent)",
          }}
        >
          <h1
            className="font-bold leading-none mb-4"
            style={{
              fontSize: "clamp(44px, 5.5vw, 82px)",
              fontFamily: "Abhaya Libre, serif",
            }}
          >
            <span style={{ color: "var(--c-text)" }}>Tumor </span>
            <span style={{ color: "var(--c-accent)" }}>Eye&apos;15</span>
          </h1>

          <div
            className="h-px mb-5 anim-fade-up anim-delay-1"
            style={{ width: 180, background: "var(--c-accent)" }}
          />

          <div
            className="mb-8 anim-fade-up anim-delay-2"
            style={{ maxWidth: 500 }}
          >
            <p
              className="font-extrabold mb-3"
              style={{
                fontSize: 17,
                lineHeight: 1.5,
                color: "var(--c-accent)",
                fontFamily: "Abhaya Libre, serif",
              }}
            >
              AI-powered brain MRI analysis
              <br />
              for medical learning and clinical support.
            </p>
            <TextType
              text={[
                "Upload a scan and get an instant tumor-region detection from our YOLOv11-based model",
                "Built for radiologists who want a second opinion",
                "Helping students learn diagnostic imaging with AI feedback",
              ]}
              typingSpeed={25}
              initialDelay={800}
              loop={true}
              pauseDuration={2000}
              deletingSpeed={15}
              showCursor
              cursorCharacter="|"
              cursorBlinkDuration={0.5}
              style={{
                fontSize: 13,
                lineHeight: 1.7,
                color: "var(--c-text)",
                opacity: 0.7,
                fontFamily: "Abhaya Libre, serif",
              }}
            />
          </div>

          <div className="flex gap-6 mb-10 anim-fade-up anim-delay-3">
            <Button onClick={() => navigate("/register")}>Register</Button>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </div>

          <div
            className="grid grid-cols-3 gap-6 anim-fade-up anim-delay-4"
            style={{ maxWidth: 520 }}
          >
            {[
              { kicker: "YOLOv11", label: "Detection Model" },
              { kicker: "Dual Mode", label: "Doctor & Student" },
              { kicker: "Local", label: "Privacy-First Processing" },
            ].map((s) => (
              <div
                key={s.kicker}
                className="border-l pl-4 py-1"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--c-accent) 50%, transparent)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Abhaya Libre, serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--c-accent)",
                    lineHeight: 1.1,
                    marginBottom: 4,
                  }}
                >
                  {s.kicker}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "var(--c-text)",
                    opacity: 0.6,
                    fontFamily: "Abhaya Libre, serif",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="anim-fade-up anim-delay-2"
          style={{
            width: "48%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
            padding: "80px 40px 16px 24px",
          }}
        >
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: 80,
              background: "linear-gradient(to top, var(--c-bg), transparent)",
            }}
          />

          <div style={{ width: "100%", height: "100%" }}>
            <Masonry
              items={MRI_ITEMS}
              ease="power3.out"
              duration={0.6}
              stagger={0.08}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.97}
              blurToFocus
              colorShiftOnHover={false}
            />
          </div>
        </div>
      </main>

      <section
        className="relative z-10 anim-fade-up anim-delay-5 shrink-0"
        style={{
          borderTop:
            "1px solid color-mix(in srgb, var(--c-text) 14%, transparent)",
          background: "color-mix(in srgb, var(--c-bg) 70%, transparent)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          className="px-20 py-5 flex items-center"
          style={{ justifyContent: "center", gap: 48 }}
        >
          {[
            { n: "01", label: "Upload MRI", sub: "DICOM · PNG · JPG" },
            { n: "02", label: "AI Analysis", sub: "YOLOv11 detection" },
            { n: "03", label: "View Results", sub: "Boxes · confidence" },
          ].map((step, i, arr) => (
            <div key={step.n} className="flex items-center" style={{ gap: 48 }}>
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
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "var(--c-text)",
                      lineHeight: 1.2,
                      fontFamily: "Abhaya Libre, serif",
                    }}
                  >
                    {step.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: "1px",
                      color: "var(--c-text)",
                      opacity: 0.55,
                      fontFamily: "Abhaya Libre, serif",
                    }}
                  >
                    {step.sub}
                  </div>
                </div>
              </div>
              {i < arr.length - 1 && (
                <div
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    color: "var(--c-accent)",
                    opacity: 0.5,
                    fontSize: 20,
                  }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <footer
          style={{
            textAlign: "center",
            padding: "12px",
            borderTop:
              "1px solid color-mix(in srgb, var(--c-text) 8%, transparent)",
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
      </section>
    </div>
  );
}
