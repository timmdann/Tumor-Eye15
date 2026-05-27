import type { ChangeEvent } from "react";

export default function StudentUploadArea({
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
        className="w-[820px] h-[330px] rounded-md flex flex-col items-center justify-center cursor-pointer transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--c-panel)", color: "var(--c-text)" }}
      >
        <div
          className="w-[34px] h-[34px] rounded-sm border flex items-center justify-center text-[30px] leading-none mb-[14px]"
          style={{ borderColor: "var(--c-text)", color: "var(--c-text)" }}
        >
          +
        </div>
        <p className="text-[20px] font-bold text-center">Upload brain MRI scan</p>
        <p className="text-[15px] font-semibold opacity-70 mt-[8px]">Click or drag file to upload</p>
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
