import Navbar from "@/components/Navbar";
import FAQItem from "@/components/FAQItem";

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
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--c-bg)" }}
    >
      {/* Header */}
      <header style={{ backgroundColor: "var(--c-header)" }}>
        <Navbar backTo="/" />
        <div className="px-20 pb-12 mt-6 anim-fade-up anim-delay-1">
          <h1
            className="font-bold"
            style={{
              fontFamily: "Abhaya Libre, serif",
              fontSize: "clamp(36px, 4.5vw, 60px)",
              color: "var(--c-bg)",
              lineHeight: 1.1,
            }}
          >
            Frequently Asked Questions
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-20 py-12">
        <p
          className="mb-10 font-extrabold anim-fade-up anim-delay-2"
          style={{
            fontFamily: "Abhaya Libre, serif",
            fontSize: "clamp(18px, 1.8vw, 26px)",
            lineHeight: 1.5,
            color: "var(--c-text)",
            maxWidth: 760,
          }}
        >
          Have another question and can't find the answer you're looking for?
          <br />
          Contact us by sending an email.
        </p>

        <div
          className="anim-fade-up anim-delay-3"
          style={{ borderTop: "1px solid var(--c-accent)", maxWidth: 760 }}
        >
          {FAQS.map((faq) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
