import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";

export default function Landing() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--c-bg)" }}
    >
      <Navbar />

      <main className="flex-1 flex items-center px-20 relative overflow-hidden">
        {/* Left */}
        <div className="z-10 anim-fade-up">
          <h1
            className="font-bold leading-none mb-4"
            style={{
              fontSize: "clamp(52px, 7vw, 96px)",
              fontFamily: "Abhaya Libre, serif",
            }}
          >
            <span style={{ color: "var(--c-text)" }}>Tumor </span>
            <span style={{ color: "var(--c-accent)" }}>Eye'15</span>
          </h1>

          <div
            className="w-48 h-px mb-6 anim-fade-up anim-delay-1"
            style={{ background: "var(--c-accent)" }}
          />

          <p
            className="mb-12 font-extrabold anim-fade-up anim-delay-2"
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "var(--c-accent)",
              maxWidth: 380,
            }}
          >
            AI-powered brain MRI analysis
            <br />
            for medical learning and support
          </p>

          <div className="flex gap-6 anim-fade-up anim-delay-3">
            <Button onClick={() => navigate("/register")}>Register</Button>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </div>
        </div>

        {/* Right — brain image */}
        <div className="absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none anim-fade-up anim-delay-4 w-96 h-96">
          {/* Images — levitate */}
          <div className="anim-levitate w-full h-full relative">
            <img
              src="/brain-light.png"
              alt="Brain MRI"
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                opacity: isDark ? 0 : 1,
                transition: "opacity 0.4s ease",
              }}
            />
            <img
              src="/brain-dark.png"
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                opacity: isDark ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            />
          </div>
          {/* Shadow — pulses inversely */}
          <div
            className="anim-shadow-pulse absolute left-1/2"
            style={{
              bottom: "-8px",
              width: "55%",
              height: 18,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 75%)",
              filter: "blur(4px)",
            }}
          />
        </div>
      </main>
    </div>
  );
}
