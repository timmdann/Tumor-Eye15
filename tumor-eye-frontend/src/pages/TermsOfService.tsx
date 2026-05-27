import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const sections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    text: "By using Tumor Eye'15, you agree to use it only for educational, research, and clinical-support purposes.",
  },
  {
    number: "02",
    title: "Medical Disclaimer",
    text: "Tumor Eye'15 provides AI-assisted MRI feedback. It does not replace professional diagnosis.",
  },
  {
    number: "03",
    title: "No Data Storage",
    text: "Uploaded MRI scans, annotations, and results are not permanently stored by the platform.",
  },
  {
    number: "04",
    title: "Permitted Use",
    text: "The platform is intended for student training and AI-assisted clinical-style review only.",
  },
  {
    number: "05",
    title: "Accuracy & Liability",
    text: "AI results may be inaccurate or incomplete. Final decisions must always be made by qualified healthcare professionals.",
  },
];

export default function TermsOfService() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--c-bg)",
        fontFamily: "Abhaya Libre, serif",
      }}
    >
      <header
        className="relative h-[155px] shrink-0 flex items-center"
        style={{ backgroundColor: "var(--c-sidebar)" }}
      >
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
              to="/about"
              className="no-underline text-[13px] font-bold whitespace-nowrap"
              style={{ color: "var(--c-panel-text)" }}
            >
              About Us
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

        <div className="w-full px-[62px] anim-fade-up anim-delay-1">
          <h1
            className="font-bold"
            style={{
              fontSize: "clamp(38px, 3.9vw, 58px)",
              lineHeight: 1,
              color: "var(--c-sidebar-text)",
            }}
          >
            Terms of Service
          </h1>
        </div>
      </header>

      <main className="relative flex-1 px-[62px] pt-[36px] pb-[48px] overflow-hidden">
        <div className="relative z-10">
          <div
            className="anim-fade-up anim-delay-3"
            style={{
              maxWidth: 900,
            }}
          >
            <div className="relative z-10" style={{ maxWidth: 900 }}>
              {sections.map((s) => (
              <section key={s.number} className="mb-[28px] anim-fade-up">
                <p
                  className="text-[13px] font-bold"
                  style={{ color: "gray" }}
                >
                  {s.number}
                </p>

                <h2
                  className="text-[18px] font-bold mb-[6px]"
                  style={{ color: "var(--c-panel)" }}
                >
                  {s.title}
                </h2>

                <p
                  className="text-[15px] font-bold mb-[6px]"
                  style={{ color: "var(--c-panel-text)", lineHeight: 1.5 }}
                >
                  {s.text}
                </p>
              </section>
              ))}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}