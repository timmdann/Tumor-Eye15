import SideButton from "@/components/SideButton";

export default function ExerciseSidebar({
  hasSelection,
  onSubmit,
  onClearSelection,
}: {
  hasSelection: boolean;
  onSubmit: () => void;
  onClearSelection: () => void;
}) {
  return (
    <div className="w-[232px] flex-1 flex flex-col" style={{ color: "var(--c-sidebar-text)" }}>
      <div className="text-[13px] font-bold leading-[1.35] max-w-[190px]">
        <p>Mark the suspected tumor area and compare your selection with AI feedback.</p>
        <p className="mt-[16px] text-[11px] opacity-80">
          Click and drag directly on the MRI scan to draw your selection.
        </p>
      </div>
      <div className="mt-auto flex flex-col gap-[16px]">
        {hasSelection && <SideButton onClick={onClearSelection}>Clear selection</SideButton>}
        <SideButton onClick={onSubmit}>Send for analysis</SideButton>
      </div>
    </div>
  );
}
