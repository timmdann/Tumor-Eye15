import { useState, useRef } from "react";
import type { PointerEvent } from "react";
import type { SelectionBox, DraftSelection } from "@/lib/utils/selectionBox";
import { clamp } from "@/lib/utils/selectionBox";

const STUDENT_BOX_BORDER = 3;

const AI_DETECTION_BOX: SelectionBox = { x: 40.5, y: 25.8, width: 14, height: 12.5 };

function AutoFitSelectionLabel({ text }: { text: string }) {
  return (
    <div
      className="absolute flex items-center justify-center overflow-hidden"
      style={{
        left: 0, right: 0,
        bottom: `calc(100% - ${STUDENT_BOX_BORDER}px)`,
        height: "16px", padding: "0 6px",
        backgroundColor: "#56b8d5", color: "#102124",
        fontSize: "10px", fontWeight: 700, lineHeight: 1,
        whiteSpace: "nowrap", boxSizing: "border-box", zIndex: 2,
      }}
    >
      {text}
    </div>
  );
}

function StudentSelectionBox({ selection, isDraft = false }: { selection: SelectionBox; isDraft?: boolean }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${selection.x}%`, top: `${selection.y}%`,
        width: `${selection.width}%`, height: `${selection.height}%`,
        boxSizing: "border-box", opacity: isDraft ? 0.75 : 1, overflow: "visible",
      }}
    >
      {!isDraft && <AutoFitSelectionLabel text="Your selection" />}
      <div className="absolute inset-0" style={{ border: `${STUDENT_BOX_BORDER}px solid #56b8d5`, boxSizing: "border-box", zIndex: 1 }} />
    </div>
  );
}

function AIDetectionBox() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${AI_DETECTION_BOX.x}%`, top: `${AI_DETECTION_BOX.y}%`,
        width: `${AI_DETECTION_BOX.width}%`, height: `${AI_DETECTION_BOX.height}%`,
        overflow: "visible",
      }}
    >
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: 0, bottom: "calc(100% - 2px)", minWidth: "100%",
          height: "16px", padding: "0 6px",
          backgroundColor: "#00ff38", color: "#102124",
          fontSize: "10px", fontWeight: 700, lineHeight: 1,
          whiteSpace: "nowrap", boxSizing: "border-box", zIndex: 2,
        }}
      >
        Tumor 84%
      </div>
      <div className="absolute inset-0" style={{ border: "2px solid #00ff38", boxSizing: "border-box" }} />
    </div>
  );
}

export default function StudentImagePreview({
  imageSrc,
  imageFilter,
  fileName,
  studentSelection,
  onSelectionChange,
  showDetection,
  allowDrawing,
}: {
  imageSrc: string | null;
  imageFilter: string;
  fileName: string;
  studentSelection: SelectionBox | null;
  onSelectionChange: (selection: SelectionBox | null) => void;
  showDetection: boolean;
  allowDrawing: boolean;
}) {
  const [draftSelection, setDraftSelection] = useState<DraftSelection | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  function getPointerPosition(event: PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100),
      y: clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100),
    };
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!allowDrawing) return;
    const pos = getPointerPosition(event);
    setDraftSelection({ startX: pos.x, startY: pos.y, currentX: pos.x, currentY: pos.y });
    onSelectionChange(null);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!allowDrawing || !draftSelection) return;
    const pos = getPointerPosition(event);
    setDraftSelection((prev) => prev ? { ...prev, currentX: pos.x, currentY: pos.y } : prev);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!allowDrawing || !draftSelection) return;
    const pos = getPointerPosition(event);
    const x = Math.min(draftSelection.startX, pos.x);
    const y = Math.min(draftSelection.startY, pos.y);
    const width = Math.abs(pos.x - draftSelection.startX);
    const height = Math.abs(pos.y - draftSelection.startY);
    if (width > 2 && height > 2) onSelectionChange({ x, y, width, height });
    setDraftSelection(null);
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  const visibleDraft = draftSelection
    ? {
        x: Math.min(draftSelection.startX, draftSelection.currentX),
        y: Math.min(draftSelection.startY, draftSelection.currentY),
        width: Math.abs(draftSelection.currentX - draftSelection.startX),
        height: Math.abs(draftSelection.currentY - draftSelection.startY),
      }
    : null;

  return (
    <div className="relative w-[520px] h-[520px] flex items-center justify-center">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => setDraftSelection(null)}
        className={`relative w-[430px] h-[430px] flex items-center justify-center overflow-hidden${allowDrawing ? " cursor-crosshair" : ""}`}
        style={{ backgroundColor: "#000", touchAction: "none" }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={fileName || "Student MRI scan"}
            className="w-full h-full object-contain pointer-events-none select-none"
            style={{ filter: imageFilter }}
            draggable={false}
          />
        ) : (
          <p className="text-white text-[14px] font-bold">MRI scan</p>
        )}
        {studentSelection && <StudentSelectionBox selection={studentSelection} />}
        {visibleDraft && <StudentSelectionBox selection={visibleDraft} isDraft />}
        {showDetection && <AIDetectionBox />}
      </div>
    </div>
  );
}
