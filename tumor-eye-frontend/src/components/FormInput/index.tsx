interface FormInputProps {
  label: string;
  delay: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}

export default function FormInput({
  label,
  delay,
  value,
  onChange,
  type,
}: FormInputProps) {
  const inputType = type ?? (label === "Email Address" ? "email" : "text");

  return (
    <div className={`anim-fade-up ${delay}`}>
      <label
        className="block text-[14px] font-bold mb-[12px]"
        style={{ color: "var(--c-text)" }}
      >
        {label}
      </label>
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-0 border-b outline-none pb-[8px] text-[16px]"
        style={{ borderColor: "var(--c-line)", color: "var(--c-text)" }}
      />
    </div>
  );
}
