import {
  ChangeEvent,
  PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AppPanelLayout from "@/components/AppPanelLayout";

type Step = "upload" | "exercise" | "analyzing" | "result";

type SelectionBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type DraftSelection = {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
};

const STUDENT_BOX_BORDER = 3;
const IMAGE_PREVIEW_SIZE = 430;

const AI_DETECTION_BOX: SelectionBox = {
  x: 40.5,
  y: 25.8,
  width: 14,
  height: 12.5,
};

export default function StudentAnalysis() {
  const [step, setStep] = useState<Step>("upload");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [studentSelection, setStudentSelection] = useState<SelectionBox | null>(
    null
  );

  const analyzingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (analyzingTimerRef.current) {
        window.clearTimeout(analyzingTimerRef.current);
      }
    };
  }, []);

  const imageFilter = useMemo(() => {
    return "brightness(100%) contrast(100%)";
  }, []);

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
  }

  function handleBackToUpload() {
    setImageSrc(null);
    setFileName("");
    setStudentSelection(null);
    setStep("upload");
  }

  function handleTryAgain() {
    setStudentSelection(null);
    setStep("exercise");
  }

  function handleSubmitAnswer() {
    setStep("analyzing");

    analyzingTimerRef.current = window.setTimeout(() => {
      setStep("result");
    }, 5000);
  }

  if (step === "analyzing") {
    return <StudentAnalyzingScreen />;
  }

  return (
    <AppPanelLayout
      showBack={step !== "upload"}
      showLogout={step === "upload"}
      onBack={handleBackToUpload}
      title={
        step === "result"
          ? "Selection review"
          : "Practice MRI Brain Tumor Detection"
      }
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
          <ResultSidebar
            studentSelection={studentSelection}
            aiSelection={AI_DETECTION_BOX}
            onTryAgain={handleTryAgain}
            onNewCase={handleNewCase}
          />
        ) : undefined
      }
    >
      {step === "upload" ? (
        <StudentUploadArea
          onOpenFilePicker={openFilePicker}
          onFileChange={handleFileChange}
        />
      ) : step === "exercise" ? (
        <StudentImagePreview
          imageSrc={imageSrc}
          imageFilter={imageFilter}
          fileName={fileName}
          studentSelection={studentSelection}
          onSelectionChange={setStudentSelection}
          showDetection={false}
          allowDrawing
        />
      ) : (
        <StudentImagePreview
          imageSrc={imageSrc}
          imageFilter={imageFilter}
          fileName={fileName}
          studentSelection={studentSelection}
          onSelectionChange={setStudentSelection}
          showDetection
          allowDrawing={false}
        />
      )}
    </AppPanelLayout>
  );
}

function StudentUploadArea({
  onOpenFilePicker,
  onFileChange,
}: {
  onOpenFilePicker: () => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full flex items-center justify-center">
      <div
        onClick={onOpenFilePicker}
        className="
          w-[820px] h-[330px]
          rounded-md
          flex flex-col items-center justify-center
          cursor-pointer
          transition-opacity hover:opacity-90
        "
        style={{
          backgroundColor: "var(--c-panel)",
          color: "var(--c-text)",
        }}
      >
        <div
          className="
            w-[34px] h-[34px]
            rounded-sm
            border
            flex items-center justify-center
            text-[30px] leading-none
            mb-[14px]
          "
          style={{
            borderColor: "var(--c-text)",
            color: "var(--c-text)",
          }}
        >
          +
        </div>

        <p className="text-[20px] font-bold text-center">
          Upload brain MRI scan
        </p>

        <p className="text-[15px] font-semibold opacity-70 mt-[8px]">
          Click or drag file to upload
        </p>

        <input
          id="student-mri-upload"
          type="file"
          accept="image/*,.png,.jpg,.jpeg"
          className="hidden"
          onChange={onFileChange}
        />
      </div>
    </div>
  );
}

function StudentImagePreview({
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
  const [draftSelection, setDraftSelection] =
    useState<DraftSelection | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  function getPointerPosition(event: PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) {
      return { x: 0, y: 0 };
    }

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    return {
      x: clamp(x, 0, 100),
      y: clamp(y, 0, 100),
    };
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!allowDrawing) return;

    const position = getPointerPosition(event);

    setDraftSelection({
      startX: position.x,
      startY: position.y,
      currentX: position.x,
      currentY: position.y,
    });

    onSelectionChange(null);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!allowDrawing || !draftSelection) return;

    const position = getPointerPosition(event);

    setDraftSelection((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        currentX: position.x,
        currentY: position.y,
      };
    });
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!allowDrawing || !draftSelection) return;

    const position = getPointerPosition(event);

    const x = Math.min(draftSelection.startX, position.x);
    const y = Math.min(draftSelection.startY, position.y);
    const width = Math.abs(position.x - draftSelection.startX);
    const height = Math.abs(position.y - draftSelection.startY);

    if (width > 2 && height > 2) {
      onSelectionChange({
        x,
        y,
        width,
        height,
      });
    }

    setDraftSelection(null);
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  const visibleDraftSelection = draftSelection
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
        className={`
          relative
          w-[430px] h-[430px]
          flex items-center justify-center
          overflow-hidden
          ${allowDrawing ? "cursor-crosshair" : ""}
        `}
        style={{
          backgroundColor: "#000",
          touchAction: "none",
        }}
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

        {studentSelection && (
          <StudentSelectionBox selection={studentSelection} />
        )}

        {visibleDraftSelection && (
          <StudentSelectionBox selection={visibleDraftSelection} isDraft />
        )}

        {showDetection && <AIDetectionBox />}
      </div>
    </div>
  );
}

function StudentSelectionBox({
  selection,
  isDraft = false,
}: {
  selection: SelectionBox;
  isDraft?: boolean;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${selection.x}%`,
        top: `${selection.y}%`,
        width: `${selection.width}%`,
        height: `${selection.height}%`,
        boxSizing: "border-box",
        opacity: isDraft ? 0.75 : 1,
        overflow: "visible",
      }}
    >
      {!isDraft && <AutoFitSelectionLabel text="Your selection" />}

      <div
        className="absolute inset-0"
        style={{
          border: `${STUDENT_BOX_BORDER}px solid #56b8d5`,
          boxSizing: "border-box",
          zIndex: 1,
        }}
      />
    </div>
  );
}

function AutoFitSelectionLabel({ text }: { text: string }) {
  return (
    <div
      className="
        absolute
        flex items-center justify-center
        overflow-hidden
      "
      style={{
        left: 0,
        right: 0,
        bottom: `calc(100% - ${STUDENT_BOX_BORDER}px)`,

        height: "16px",
        padding: "0 6px",

        backgroundColor: "#56b8d5",
        color: "#102124",
        fontSize: "10px",
        fontWeight: 700,
        lineHeight: 1,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        zIndex: 2,
      }}
    >
      {text}
    </div>
  );
}

function AIDetectionBox() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${AI_DETECTION_BOX.x}%`,
        top: `${AI_DETECTION_BOX.y}%`,
        width: `${AI_DETECTION_BOX.width}%`,
        height: `${AI_DETECTION_BOX.height}%`,
        overflow: "visible",
      }}
    >
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: 0,
          bottom: "calc(100% - 2px)",
          minWidth: "100%",
          height: "16px",
          padding: "0 6px",
          backgroundColor: "#00ff38",
          color: "#102124",
          fontSize: "10px",
          fontWeight: 700,
          lineHeight: 1,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          zIndex: 2,
        }}
      >
        Tumor 84%
      </div>

      <div
        className="absolute inset-0"
        style={{
          border: "2px solid #00ff38",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function ExerciseSidebar({
  hasSelection,
  onSubmit,
  onClearSelection,
}: {
  hasSelection: boolean;
  onSubmit: () => void;
  onClearSelection: () => void;
}) {
  return (
    <div
      className="w-[232px] flex-1 flex flex-col"
      style={{ color: "var(--c-sidebar-text)" }}
    >
      <div className="text-[13px] font-bold leading-[1.35] max-w-[190px]">
        <p>
          Mark the suspected tumor area and compare your selection with AI
          feedback.
        </p>

        <p className="mt-[16px] text-[11px] opacity-80">
          Click and drag directly on the MRI scan to draw your selection.
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-[16px]">
        {hasSelection && (
          <StudentButton onClick={onClearSelection}>
            Clear selection
          </StudentButton>
        )}

        <StudentButton onClick={onSubmit}>Send for analysis</StudentButton>
      </div>
    </div>
  );
}

function ResultSidebar({
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
  const studentBoxPx = studentSelection
    ? getBoxInPixels(studentSelection)
    : null;

  const aiBoxPx = getBoxInPixels(aiSelection);

  const match = studentSelection
    ? calculateOverlapPercentage(studentSelection, aiSelection)
    : 0;

  const resultText = !studentSelection
    ? "No selection to compare"
    : match >= 75
    ? "Good alignment"
    : match >= 50
    ? "OK alignment"
    : "Wrong alignment";

  return (
    <div
      className="
        w-[232px]
        flex-1
        flex
        flex-col
        px-[10px]
        pt-[28px]
        pb-[12px]
      "
      style={{ color: "var(--c-sidebar-text)" }}
    >
      <div className="text-[13px] leading-[1.22] font-bold">
        <section className="mb-[12px]">
          <h3 className="text-[17px] leading-[1.05] font-extrabold">
            Your selection
          </h3>

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

        <section className="mb-[12px]">
          <h3 className="text-[17px] leading-[1.05] font-extrabold">
            AI prediction
          </h3>

          <p>Box coordinates:</p>
          <p>X: {aiBoxPx.x} px</p>
          <p>Y: {aiBoxPx.y} px</p>
          <p>Width: {aiBoxPx.width} px</p>
          <p>Height: {aiBoxPx.height} px</p>
        </section>

        <section>
          <h3 className="text-[17px] leading-[1.05] font-extrabold">
            Overlap
          </h3>

          <p>Match: {match}%</p>
          <p>Result: {resultText}</p>
        </section>
      </div>

      <div className="mt-auto flex flex-col items-center gap-[14px] pt-[24px]">
        <ResultSidebarButton onClick={onNewCase}>New scan</ResultSidebarButton>

        <ResultSidebarButton onClick={onTryAgain}>
          Try again
        </ResultSidebarButton>
      </div>
    </div>
  );
}

function StudentButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-[232px] h-[50px]
        rounded-sm
        border-none
        cursor-pointer
        text-[14px]
        font-extrabold
        transition-opacity
        hover:opacity-90
      "
      style={{
        backgroundColor: "#4a7c73",
        color: "#1c2b2e",
      }}
    >
      {children}
    </button>
  );
}

function ResultSidebarButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-[230px] h-[50px]
        rounded-[4px]
        border-none
        cursor-pointer
        text-[15px]
        font-extrabold
        transition-opacity
        hover:opacity-90
      "
      style={{
        backgroundColor: "#4f8379",
        color: "#102124",
      }}
    >
      {children}
    </button>
  );
}

function StudentAnalyzingScreen() {
  return (
    <div
      className="w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: "var(--c-bg)",
        fontFamily: "Abhaya Libre, serif",
      }}
    >
      <style>{`
        @keyframes analyzingPulseOuter {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.96);
            opacity: 0.22;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.04);
            opacity: 0.6;
          }
        }

        @keyframes analyzingPulseMiddle {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.97);
            opacity: 0.35;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.03);
            opacity: 0.8;
          }
        }

        @keyframes analyzingPulseInner {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.98);
            opacity: 0.45;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.02);
            opacity: 1;
          }
        }

        @keyframes analyzingCenterPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.92);
            opacity: 0.85;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.08);
            opacity: 1;
          }
        }

        @keyframes analyzingSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes analyzingSpinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes analyzingDotPulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes analyzingTextPulse {
          0%, 100% {
            opacity: 0.75;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-[250px] h-[250px]">
          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 174,
              height: 174,
              border: "1px solid var(--c-accent)",
              animation: "analyzingPulseOuter 2.8s ease-in-out infinite",
            }}
          />

          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 144,
              height: 144,
              border: "1px solid var(--c-accent)",
              animation: "analyzingPulseMiddle 2.2s ease-in-out infinite",
            }}
          />

          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 108,
              height: 108,
              border: "2px solid var(--c-accent)",
              animation: "analyzingPulseInner 1.8s ease-in-out infinite",
            }}
          />

          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 66,
              height: 66,
              border: "2px solid var(--c-accent)",
              animation: "analyzingPulseInner 1.6s ease-in-out infinite",
            }}
          />

          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 52,
              height: 52,
              backgroundColor: "var(--c-accent)",
              animation: "analyzingCenterPulse 1.4s ease-in-out infinite",
            }}
          />

          <div
            className="absolute inset-0"
            style={{ animation: "analyzingSpin 8s linear infinite" }}
          >
            <span
              className="absolute left-1/2 top-[38px] -translate-x-1/2 rounded-full"
              style={{
                width: 7,
                height: 7,
                backgroundColor: "var(--c-accent)",
                animation: "analyzingDotPulse 1.5s ease-in-out infinite",
              }}
            />
          </div>

          <div
            className="absolute inset-0"
            style={{ animation: "analyzingSpinReverse 6.5s linear infinite" }}
          >
            <span
              className="absolute left-[42px] top-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 6,
                height: 6,
                backgroundColor: "var(--c-accent)",
                animation: "analyzingDotPulse 1.7s ease-in-out infinite",
              }}
            />
          </div>

          <div
            className="absolute inset-0"
            style={{ animation: "analyzingSpin 5.7s linear infinite" }}
          >
            <span
              className="absolute left-1/2 bottom-[56px] -translate-x-1/2 rounded-full"
              style={{
                width: 6,
                height: 6,
                backgroundColor: "var(--c-accent)",
                animation: "analyzingDotPulse 1.3s ease-in-out infinite",
              }}
            />
          </div>

          <div
            className="absolute inset-0"
            style={{ animation: "analyzingSpinReverse 4.8s linear infinite" }}
          >
            <span
              className="absolute right-[58px] top-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 5,
                height: 5,
                backgroundColor: "var(--c-accent)",
                animation: "analyzingDotPulse 1.2s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        <p
          className="mt-[2px] text-[36px] font-bold"
          style={{
            color: "var(--c-accent)",
            animation: "analyzingTextPulse 1.8s ease-in-out infinite",
          }}
        >
          Analyzing...
        </p>
      </div>
    </div>
  );
}

function getBoxInPixels(selection: SelectionBox) {
  return {
    x: toImagePx(selection.x),
    y: toImagePx(selection.y),
    width: toImagePx(selection.width),
    height: toImagePx(selection.height),
  };
}

function toImagePx(percentValue: number) {
  return Math.round((percentValue / 100) * IMAGE_PREVIEW_SIZE);
}

function calculateOverlapPercentage(
  studentSelection: SelectionBox,
  aiSelection: SelectionBox
) {
  const studentLeft = studentSelection.x;
  const studentTop = studentSelection.y;
  const studentRight = studentSelection.x + studentSelection.width;
  const studentBottom = studentSelection.y + studentSelection.height;

  const aiLeft = aiSelection.x;
  const aiTop = aiSelection.y;
  const aiRight = aiSelection.x + aiSelection.width;
  const aiBottom = aiSelection.y + aiSelection.height;

  const overlapLeft = Math.max(studentLeft, aiLeft);
  const overlapTop = Math.max(studentTop, aiTop);
  const overlapRight = Math.min(studentRight, aiRight);
  const overlapBottom = Math.min(studentBottom, aiBottom);

  const overlapWidth = Math.max(0, overlapRight - overlapLeft);
  const overlapHeight = Math.max(0, overlapBottom - overlapTop);
  const overlapArea = overlapWidth * overlapHeight;

  const studentArea = studentSelection.width * studentSelection.height;
  const aiArea = aiSelection.width * aiSelection.height;
  const unionArea = studentArea + aiArea - overlapArea;

  if (unionArea <= 0) return 0;

  return Math.round((overlapArea / unionArea) * 100);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}