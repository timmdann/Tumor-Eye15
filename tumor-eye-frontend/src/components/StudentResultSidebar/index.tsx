import type { ReactNode } from "react";
import type { SelectionBox } from "@/lib/utils/selectionBox";
import { getBoxInPixels, calculateOverlapPercentage } from "@/lib/utils/selectionBox";

function ResultSidebarButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-57.5 h-12.5 rounded-sm border-none cursor-pointer text-[15px] font-extrabold transition-opacity hover:opacity-90"
      style={{ backgroundColor: "#4f8379", color: "#102124" }}
    >
      {children}
    </button>
  );
}

export default function StudentResultSidebar({
  studentSelection,
  aiSelection,
  onTryAgain,
  onNewCase,
}: {
  studentSelection: SelectionBox | null;
  aiSelection: SelectionBox;
  onTryAgain: () => void;
  onNewCase: () => void;
}) {
  const studentBoxPx = studentSelection ? getBoxInPixels(studentSelection) : null;
  const aiBoxPx = getBoxInPixels(aiSelection);
  const match = studentSelection ? calculateOverlapPercentage(studentSelection, aiSelection) : 0;

  const resultText = !studentSelection
    ? "No selection to compare"
    : match >= 75 ? "Good alignment"
    : match >= 50 ? "OK alignment"
    : "Wrong alignment";

  return (
    <div className="w-58 flex-1 flex flex-col px-2.5 pt-7 pb-3" style={{ color: "var(--c-sidebar-text)" }}>
      <div className="text-[13px] leading-[1.22] font-bold">
        <section className="mb-3">
          <h3 className="text-[17px] leading-[1.05] font-extrabold">Your selection</h3>
          {studentBoxPx ? (
            <>
              <p>Box coordinates:</p>
              <p>X: {studentBoxPx.x} px</p>
              <p>Y: {studentBoxPx.y} px</p>
              <p>Width: {studentBoxPx.width} px</p>
              <p>Height: {studentBoxPx.height} px</p>
            </>
          ) : (
            <>
              <p>No selection was made.</p>
              <p>Box coordinates unavailable.</p>
            </>
          )}
        </section>
        <section className="mb-3">
          <h3 className="text-[17px] leading-[1.05] font-extrabold">AI prediction</h3>
          <p>Box coordinates:</p>
          <p>X: {aiBoxPx.x} px</p>
          <p>Y: {aiBoxPx.y} px</p>
          <p>Width: {aiBoxPx.width} px</p>
          <p>Height: {aiBoxPx.height} px</p>
        </section>
        <section>
          <h3 className="text-[17px] leading-[1.05] font-extrabold">Overlap</h3>
          <p>Match: {match}%</p>
          <p>Result: {resultText}</p>
        </section>
      </div>
      <div className="mt-auto flex flex-col items-center gap-3.5 pt-6">
        <ResultSidebarButton onClick={onNewCase}>New scan</ResultSidebarButton>
        <ResultSidebarButton onClick={onTryAgain}>Try again</ResultSidebarButton>
      </div>
    </div>
  );
}
