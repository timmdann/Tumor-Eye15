import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import Masonry from "@/components/Masonry";
import TextType from "@/components/TextType";
import TrustStats from "@/components/TrustStats";
import { MRI_ITEMS } from "@/data/mriItems";
import { TEXT_TYPE_ITEMS } from "@/data/textTypeItems";

export default function LandingDesktop() {
  const navigate = useNavigate();

  return (
    <main
      className="hidden md:flex flex-row items-stretch px-0 relative z-10 overflow-hidden"
      style={{ flex: 1, minHeight: 0 }}
    >
      <div
        className="z-10 anim-fade-up flex flex-col justify-center w-[52%] pl-20 pr-15"
        style={{
          background: "linear-gradient(135deg, color-mix(in srgb, var(--c-bg) 92%, transparent) 0%, color-mix(in srgb, var(--c-bg) 60%, transparent) 100%)",
          backdropFilter: "blur(16px)",
          borderRight: "1px solid color-mix(in srgb, var(--c-accent) 12%, transparent)",
        }}
      >
        <h1
          className="font-bold leading-none mb-4"
          style={{ fontSize: "clamp(44px, 5.5vw, 82px)", fontFamily: "Abhaya Libre, serif" }}
        >
          <span style={{ color: "var(--c-text)" }}>Tumor </span>
          <span style={{ color: "var(--c-accent)" }}>Eye&apos;15</span>
        </h1>

        <div className="h-px mb-5 anim-fade-up anim-delay-1" style={{ width: 180, background: "var(--c-accent)" }} />

        <div className="mb-8 anim-fade-up anim-delay-2" style={{ maxWidth: 500 }}>
          <p className="font-extrabold mb-3" style={{ fontSize: 17, lineHeight: 1.5, color: "var(--c-accent)", fontFamily: "Abhaya Libre, serif" }}>
            AI-powered brain MRI analysis<br />for medical learning and clinical support.
          </p>
          <TextType
            text={TEXT_TYPE_ITEMS}
            typingSpeed={25}
            initialDelay={800}
            loop={true}
            pauseDuration={2000}
            deletingSpeed={15}
            showCursor
            cursorCharacter="|"
            cursorBlinkDuration={0.5}
            style={{ fontSize: 13, lineHeight: 1.7, color: "var(--c-text)", opacity: 0.7, fontFamily: "Abhaya Libre, serif" }}
          />
        </div>

        <div className="flex gap-6 mb-10 anim-fade-up anim-delay-3">
          <Button onClick={() => navigate("/register")}>Register</Button>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>

        <div className="anim-fade-up anim-delay-4">
          <TrustStats />
        </div>
      </div>

      <div
        className="anim-fade-up anim-delay-2 w-[48%] overflow-hidden relative"
        style={{ height: "100%", padding: "80px 40px 16px 24px" }}
      >
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{ height: 80, background: "linear-gradient(to top, var(--c-bg), transparent)" }}
        />
        <div style={{ width: "100%", height: "100%" }}>
          <Masonry items={MRI_ITEMS} ease="power3.out" duration={0.6} stagger={0.08} animateFrom="bottom" scaleOnHover hoverScale={0.97} blurToFocus colorShiftOnHover={false} />
        </div>
      </div>
    </main>
  );
}
