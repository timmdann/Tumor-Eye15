export const FAQS = [
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
