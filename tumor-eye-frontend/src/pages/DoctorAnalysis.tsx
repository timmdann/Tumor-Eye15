import AppPanelLayout from "@/components/AppPanelLayout";
import AnalyzingScreen from "@/components/AnalyzingScreen";
import DoctorUploadArea from "@/components/DoctorUploadArea";
import DoctorImagePreview from "@/components/DoctorImagePreview";
import AdjustmentsPanel from "@/components/AdjustmentsPanel";
import DoctorResultSidebar from "@/components/DoctorResultSidebar";
import { useDoctorAnalysis } from "@/lib/hooks/useDoctorAnalysis";

export default function DoctorAnalysis() {
  const {
    step, imageUrl, adjustments, imageFilter,
    handleUpload, handleNewScan, handleBackToUpload,
    beginAdjustment, finishAdjustment, updateAdjustment,
    resetAdjustments, undoAdjustments, sendForAnalysis,
    recalculateAnalysis, savePdf, handleChat,
  } = useDoctorAnalysis();

  if (step === "analyzing") return <AnalyzingScreen />;

  return (
    <AppPanelLayout
      showBack={step !== "upload"}
      showLogout={step === "upload"}
      onBack={handleBackToUpload}
      title={
        step === "upload" ? "AI-Assisted MRI Brain Analysis"
        : step === "adjust" ? "Image Adjustments"
        : "MRI Scan Review"
      }
      subtitle={
        step === "upload"
          ? "Upload a brain MRI scan and generate a structured AI-supported radiology analysis."
          : undefined
      }
      sidebarContent={
        step === "adjust" ? (
          <AdjustmentsPanel
            adjustments={adjustments}
            onBeginChange={beginAdjustment}
            onFinishChange={finishAdjustment}
            onChange={updateAdjustment}
            onUndo={undoAdjustments}
            onReset={resetAdjustments}
            onSend={sendForAnalysis}
          />
        ) : step === "result" ? (
          <DoctorResultSidebar
            onNewScan={handleNewScan}
            onRecalculate={recalculateAnalysis}
            onSavePdf={savePdf}
            onChat={handleChat}
          />
        ) : undefined
      }
    >
      {step === "upload" ? (
        <DoctorUploadArea onUpload={handleUpload} />
      ) : (
        <DoctorImagePreview
          imageUrl={imageUrl}
          imageFilter={imageFilter}
          showDetection={step === "result"}
        />
      )}
    </AppPanelLayout>
  );
}
