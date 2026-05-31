import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SelectionBox } from "@/lib/utils/selectionBox";

export type StudentStep = "upload" | "exercise" | "analyzing" | "result";

export function useStudentAnalysis() {
  const navigate = useNavigate();
  const [step, setStep] = useState<StudentStep>("upload");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [studentSelection, setStudentSelection] = useState<SelectionBox | null>(null);
  const analyzingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (analyzingTimerRef.current) window.clearTimeout(analyzingTimerRef.current);
    };
  }, []);

  const imageFilter = useMemo(() => "brightness(100%) contrast(100%)", []);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") return;
      setImageSrc(result);
      setFileName(file.name);
      setStudentSelection(null);
      setStep("exercise");
    };
    reader.readAsDataURL(file);
  }

  function openFilePicker() {
    document.getElementById("student-mri-upload")?.click();
  }

  function handleNewCase() {
    setImageSrc(null);
    setFileName("");
    setStudentSelection(null);
    setStep("upload");
    navigate("/student/upload", { replace: true });
  }

  function handleBackToUpload() {
    setImageSrc(null);
    setFileName("");
    setStudentSelection(null);
    setStep("upload");
    navigate("/student/upload", { replace: true });
  }

  function handleTryAgain() {
    setStudentSelection(null);
    setStep("exercise");
  }

  function handleSubmitAnswer() {
    setStep("analyzing");
    analyzingTimerRef.current = window.setTimeout(() => {
      setStep("result");
      navigate("/student/result", { replace: true });
    }, 5000);
  }

  return {
    step, imageSrc, fileName, studentSelection, setStudentSelection,
    imageFilter, handleFileChange, openFilePicker,
    handleNewCase, handleBackToUpload, handleTryAgain, handleSubmitAnswer,
  };
}
