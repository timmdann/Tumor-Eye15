import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

export default function AboutUs() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundColor: "var(--c-bg)",
        fontFamily: "Abhaya Libre, serif",
      }}
    >
      {/* HEADER */}
      <header
        className="relative h-[142px] shrink-0 flex items-center"
        style={{ backgroundColor: "var(--c-sidebar)" }}
      >
        {/* NAV */}
        <div className="absolute top-0 right-0 anim-fade-up">
          <nav
            className="
              h-[58px]
              px-[26px]
              rounded-bl-md
              flex items-center gap-[28px]
            "
            style={{ backgroundColor: "var(--c-panel)" }}
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-transparent border-none cursor-pointer text-[13px] font-bold whitespace-nowrap"
              style={{ color: "var(--c-panel-text)" }}
            >
              ← Back
            </button>

            <Link
              to="/terms"
              className="no-underline text-[13px] font-bold whitespace-nowrap"
              style={{ color: "var(--c-panel-text)" }}
            >
              Terms of Service
            </Link>

            <Link
              to="/faq"
              className="no-underline text-[13px] font-bold whitespace-nowrap"
              style={{ color: "var(--c-panel-text)" }}
            >
              FAQ
            </Link>

            <Link
              to="/profile"
              className="no-underline text-[13px] font-bold whitespace-nowrap"
              style={{ color: "var(--c-panel-text)" }}
            >
              Profile
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              className="bg-transparent border-none cursor-pointer flex items-center justify-center"
              style={{ color: "var(--c-panel-text)" }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </nav>
        </div>

        <div className="px-[62px] anim-fade-up anim-delay-1">
          <h1
            className="font-bold"
            style={{
              color: "var(--c-sidebar-text)",
              fontSize: "clamp(28px, 2.7vw, 38px)",
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

      {/* CONTENT */}
      <main className="relative flex-1 px-[62px] overflow-hidden flex items-center">
        {/* LEFT TEXT */}
        <section className="relative z-10 max-w-[760px] anim-fade-up anim-delay-2">
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

        {/* RIGHT IMAGE */}
        <div
          className="
            absolute
            right-[38px]
            top-1/2
            -translate-y-1/2
            w-[590px]
            h-[590px]
            pointer-events-none
            anim-fade-up
            anim-delay-3
          "
        >
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

function InfoBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-[28px]">
      <p
        className="uppercase font-extrabold mb-[5px]"
        style={{
          fontSize: 12,
          letterSpacing: "0.04em",
          color: "var(--c-muted)",
        }}
      >
        {eyebrow}
      </p>

      <h2
        className="font-extrabold mb-[6px]"
        style={{
          fontSize: 22,
          lineHeight: 1.2,
          color: "var(--c-accent)",
        }}
      >
        {title}
      </h2>

      <p
        className="font-bold"
        style={{
          fontSize: 17,
          lineHeight: 1.38,
          color: "var(--c-text)",
        }}
      >
        {children}
      </p>
    </div>
  );
}