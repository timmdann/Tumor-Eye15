import SideButton from "@/components/SideButton";

export default function DoctorResultSidebar({
  onNewScan,
  onRecalculate,
  onSavePdf,
  onChat,
}: {
  onNewScan: () => void;
  onRecalculate: () => void;
  onSavePdf: () => void;
  onChat: () => void;
}) {
  return (
    <div className="w-[230px] flex-1 flex flex-col pt-[2px]" style={{ color: "var(--c-sidebar-text)" }}>
      <div>
        <div className="text-[15px] font-extrabold leading-[1.45]">
          <p>Detected suspicious regions: 1</p>
          <p className="mt-[8px]">Region 1: tumor, confidence 84.2%</p>
        </div>
        <p className="mt-[28px] text-[11px] font-bold leading-[1.35] max-w-[190px]">
          Note: this result does not constitute a medical diagnosis.
        </p>
      </div>
      <div className="mt-auto flex flex-col gap-[16px]">
        <SideButton onClick={onNewScan}>New scan</SideButton>
        <SideButton onClick={onRecalculate}>Recalculate</SideButton>
        <SideButton onClick={onSavePdf}>Save PDF</SideButton>
        <SideButton onClick={onChat}>Chat with AI</SideButton>
      </div>
    </div>
  );
}
