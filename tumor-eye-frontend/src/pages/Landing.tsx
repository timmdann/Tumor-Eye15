import Navbar from "@/components/Navbar";
import BackgroundLayers from "@/components/BackgroundLayers";
import HowItWorksStrip from "@/components/HowItWorksStrip";
import LandingDesktop from "@/components/LandingDesktop";
import LandingMobile from "@/components/LandingMobile";

export default function Landing() {
  return (
    <div
      className="flex flex-col relative overflow-x-hidden md:overflow-hidden"
      style={{ backgroundColor: "var(--c-bg)", height: "100svh" }}
    >
      <BackgroundLayers />
      <Navbar />
      <LandingDesktop />
      <LandingMobile />
      <HowItWorksStrip />
    </div>
  );
}
