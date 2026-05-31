import AppPanelLayout from "@/components/AppPanelLayout";
import AnalyzingScreen from "@/components/AnalyzingScreen";
import StudentUploadArea from "@/components/StudentUploadArea";
import StudentImagePreview from "@/components/StudentImagePreview";
import ExerciseSidebar from "@/components/ExerciseSidebar";
import StudentResultSidebar from "@/components/StudentResultSidebar";
import { useStudentAnalysis } from "@/lib/hooks/useStudentAnalysis";
import { AI_DETECTION_BOX } from "@/data/detectionData";

export default function StudentAnalysis() {
  const {
    step, imageSrc, fileName, studentSelection, setStudentSelection,
    imageFilter, handleFileChange, openFilePicker,
    handleNewCase, handleBackToUpload, handleTryAgain, handleSubmitAnswer,
  } = useStudentAnalysis();

  if (step === "analyzing") return <AnalyzingScreen />;

  return (
    <AppPanelLayout
      showBack={step !== "upload"}
      showLogout={step === "upload"}
      onBack={handleBackToUpload}
      title={step === "result" ? "Selection review" : "Practice MRI Brain Tumor Detection"}
      subtitle={
        step === "upload"
          ? "Upload a sample MRI scan and practice identifying suspicious regions."
          : undefined
      }
      sidebarContent={
        step === "exercise" ? (
          <ExerciseSidebar
            hasSelection={Boolean(studentSelection)}
            onSubmit={handleSubmitAnswer}
            onClearSelection={() => setStudentSelection(null)}
          />
        ) : step === "result" ? (
          <StudentResultSidebar
            studentSelection={studentSelection}
            aiSelection={AI_DETECTION_BOX}
            onTryAgain={handleTryAgain}
            onNewCase={handleNewCase}
          />
        ) : undefined
      }
    >
      {step === "upload" ? (
        <StudentUploadArea onOpenFilePicker={openFilePicker} onFileChange={handleFileChange} />
      ) : step === "exercise" ? (
        <StudentImagePreview
          imageSrc={imageSrc} imageFilter={imageFilter} fileName={fileName}
          studentSelection={studentSelection} onSelectionChange={setStudentSelection}
          showDetection={false} allowDrawing
        />
      ) : (
        <StudentImagePreview
          imageSrc={imageSrc} imageFilter={imageFilter} fileName={fileName}
          studentSelection={studentSelection} onSelectionChange={setStudentSelection}
          showDetection allowDrawing={false}
        />
      )}
    </AppPanelLayout>
  );
}
