import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import TrustStats from "@/components/TrustStats";

export default function LandingMobile() {
  const navigate = useNavigate();

  return (
    <main
      className="md:hidden flex flex-col relative z-10 px-4 py-8 overflow-y-auto"
      style={{ flex: 1, minHeight: 0 }}
    >
      <h1
        className="font-bold leading-none mb-4 anim-fade-up"
        style={{ fontSize: "clamp(36px, 10vw, 56px)", fontFamily: "Abhaya Libre, serif" }}
      >
        <span style={{ color: "var(--c-text)" }}>Tumor </span>
        <span style={{ color: "var(--c-accent)" }}>Eye&apos;15</span>
      </h1>

      <div className="h-px mb-5" style={{ width: 140, background: "var(--c-accent)" }} />

      <p
        className="font-extrabold mb-2"
        style={{ fontSize: 16, lineHeight: 1.5, color: "var(--c-accent)", fontFamily: "Abhaya Libre, serif" }}
      >
        AI-powered brain MRI analysis<br />for medical learning and clinical support.
      </p>

      <p className="mb-8" style={{ fontSize: 13, lineHeight: 1.7, color: "var(--c-text)", opacity: 0.7, fontFamily: "Abhaya Libre, serif" }}>
        Upload a scan and get an instant tumor-region detection from our YOLOv11-based model.
      </p>

      <div className="flex justify-center mb-8">
        <img src="/brain-dark.png" alt="Brain MRI visualization" className="w-48 h-48 object-contain anim-levitate" />
      </div>

      <div className="flex gap-4 mb-8">
        <Button onClick={() => navigate("/register")}>Register</Button>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>

      <div className="mb-4">
        <TrustStats mobile />
      </div>
    </main>
  );
}
