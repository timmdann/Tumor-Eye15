import InfoBlock from "@/components/InfoBlock";
import PageNav from "@/components/PageNav";
import { ABOUT_NAV_LINKS } from "@/data/navLinks";

export default function AboutUs() {
  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundColor: "var(--c-bg)",
        fontFamily: "Abhaya Libre, serif",
      }}
    >
      <header
        className="relative h-35.5 shrink-0 flex items-center"
        style={{ backgroundColor: "var(--c-sidebar)" }}
      >
        <PageNav links={ABOUT_NAV_LINKS} />

        <div className="px-4 md:px-15.5 anim-fade-up anim-delay-1">
          <h1
            className="font-bold"
            style={{
              color: "var(--c-sidebar-text)",
              fontSize: "clamp(22px, 2.7vw, 38px)",
              lineHeight: 1.15,
              maxWidth: 740,
              fontWeight: 700,
            }}
          >
            AI-assisted brain tumor detection,
            <br />
            built for clinicians and students.
          </h1>
        </div>
      </header>

      <main className="relative flex-1 px-4 md:px-15.5 overflow-hidden flex items-center py-8 md:py-0">
        <section className="relative z-10 w-full lg:max-w-190 anim-fade-up anim-delay-2">
          <InfoBlock
            eyebrow="WHO WE ARE"
            title="A student-built platform at the intersection of medicine and machine learning"
          >
            A platform connecting medical education, clinical review, and
            artificial intelligence. Tumor Eye&apos;15 helps students practice
            brain tumor detection through annotation tasks, while supporting
            doctors with structured AI-assisted MRI analysis and radiology
            interpretation.
          </InfoBlock>

          <InfoBlock
            eyebrow="OUR MISSION"
            title="Support medical learning and clinical review without replacing professional judgement"
          >
            Our goal is to make MRI analysis more understandable, interactive
            and accessible. Every result is presented as AI-assisted feedback
            and should be reviewed by a qualified medical professional.
          </InfoBlock>

          <InfoBlock
            eyebrow="WHY CHOOSE US"
            title="Built for medical training and AI-assisted clinical review"
          >
            Tumor Eye&apos;15 combines medical education with AI-assisted brain
            MRI analysis in one clear workflow. Students can practice marking
            suspected tumor regions and compare their annotations with AI
            predictions using pixel-based coordinates and overlap percentage.
            Doctors can use the platform to generate a structured AI-assisted
            radiology response, helping them review detected abnormalities more
            clearly and efficiently.
          </InfoBlock>
        </section>

        <div className="hidden lg:block absolute right-9.5 top-1/2 -translate-y-1/2 w-147.5 h-147.5 pointer-events-none anim-fade-up anim-delay-3">
          <img
            src="/about-brain.png?v=4"
            alt="AI-assisted brain MRI interface"
            className="w-full h-full object-contain"
          />
        </div>
      </main>
    </div>
  );
}
