import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import BrainImage from "@/components/BrainImage";

export default function Landing() {
  const navigate = useNavigate();

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
            <span style={{ color: "var(--c-accent)" }}>Eye&apos;15</span>
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

        <BrainImage className="right-20 top-1/2 -translate-y-1/2" />
      </main>
    </div>
  );
}