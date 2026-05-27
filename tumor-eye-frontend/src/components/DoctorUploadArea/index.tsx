export default function DoctorUploadArea({ onUpload }: { onUpload: (file: File) => void }) {
  return (
    <label
      className="w-[820px] h-[330px] rounded-md flex flex-col items-center justify-center cursor-pointer transition-opacity hover:opacity-90"
      style={{ backgroundColor: "var(--c-panel)", color: "var(--c-text)" }}
    >
      <input
        type="file"
        accept="image/*,.png,.jpg,.jpeg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
      />
      <span
        className="w-[34px] h-[34px] rounded-sm border flex items-center justify-center text-[30px] leading-none mb-[14px]"
        style={{ borderColor: "var(--c-text)", color: "var(--c-text)" }}
      >
        +
      </span>
      <span className="text-[20px] font-bold text-center">Upload brain MRI scan</span>
      <span className="text-[15px] font-semibold opacity-70 mt-[8px]">Click or drag file to upload</span>
    </label>
  );
}
