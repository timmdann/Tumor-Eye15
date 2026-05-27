import React from "react";

interface FormInputProps {
  label: string;
  delay: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}

function FormInput({ label, delay, value, onChange, type }: FormInputProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  const inputType = type ?? (label === "Email Address" ? "email" : "text");

  return (
    <div className={`anim-fade-up ${delay}`}>
      <label
        htmlFor={id}
        className="block text-[14px] font-bold mb-3"
        style={{ color: "var(--c-text)" }}
      >
        {label}
      </label>
      <input
        id={id}
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-0 border-b outline-none pb-2 text-[16px]"
        style={{ borderColor: "var(--c-line)", color: "var(--c-text)" }}
      />
    </div>
  );
}

export default React.memo(FormInput);
