import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import FAQItem from "@/components/FAQItem";
import BrainImage from "@/components/BrainImage";

const FAQS = [
  {
    question: "What types of MRI scans does Tumor Eye'15 support?",
    answer:
      "Tumor Eye'15 supports brain MRI scans in any format available. The model has been trained on axial brain MRI sequences and performs best with standard T1/T2-weighted contrast scans.",
  },
  {
    question: "What is the Student mode?",
    answer:
      "Student mode provides a simplified, educational interface for medical trainees. It allows users to upload MRI scans, view AI-annotated results, and explore detection outputs without clinical data management features.",
  },
  {
    question: "How accurate is the AI detection?",
    answer:
      "The detection model is based on the YOLOv8 architecture trained on a curated brain MRI dataset. Accuracy varies by image quality and scan type. Tumor Eye'15 is designed for educational and research support — it is not a substitute for professional medical diagnosis.",
  },
  {
    question: "What does the AI chat assistant do?",
    answer:
      "The AI chat assistant helps users interpret detection results by explaining identified regions and answering questions about the analysis. It provides contextual information around the YOLO predictions displayed in the annotated image.",
  },
  {
    question: "Is data stored on your servers?",
    answer:
      "Tumor Eye'15 does not use a database and does not permanently store uploaded MRI scans, annotations or analysis results. Files are processed only during the active session.",
  },
];

export default function FAQ() {
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
              to="/terms"
              className="no-underline text-[13px] font-bold whitespace-nowrap"
              style={{ color: "var(--c-panel-text)" }}
            >
              Terms of Service
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
            Frequently Asked Questions
          </h1>
        </div>
      </header>

      <main className="relative flex-1 px-[62px] pt-[36px] pb-[48px] overflow-hidden">
        <div className="relative z-10">
          <p
            className="mb-[24px] font-extrabold anim-fade-up anim-delay-2"
            style={{
              fontSize: "clamp(24px, 2.15vw, 32px)",
              lineHeight: 1.28,
              color: "var(--c-text)",
              maxWidth: 1040,
            }}
          >
            Have another question and can&apos;t find the answer you&apos;re
            looking for?
            <br />
            Contact us by sending an{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=tumoreye15@gmail.com&su=Question%20about%20Tumor%20Eye%2715"
              target="_blank"
              rel="noreferrer"
              className="no-underline"
              style={{
                color: "var(--c-text)",
              }}
            >
              email →
            </a>
          </p>

          <div
            className="anim-fade-up anim-delay-3"
            style={{
              maxWidth: 900,
            }}
          >
            {FAQS.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>

        <BrainImage
          className="right-[140px] top-[54%] -translate-y-1/2 opacity-35"
          imageClassName="w-72 h-72"
        />
      </main>
    </div>
  );
}