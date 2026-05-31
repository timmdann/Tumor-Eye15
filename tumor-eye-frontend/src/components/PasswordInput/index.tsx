import { usePasswordToggle } from "@/lib/hooks/usePasswordToggle";

interface PasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  delay?: string;
}

export default function PasswordInput({ value, onChange, delay = "" }: PasswordInputProps) {
  const { showPassword, toggle } = usePasswordToggle();

  return (
    <div className={`anim-fade-up ${delay}`}>
      <label
        htmlFor="password"
        className="block text-[14px] font-bold mb-3"
        style={{ color: "var(--c-text)" }}
      >
        Password
      </label>
      <div
        className="flex items-center border-b pb-2"
        style={{ borderColor: "var(--c-line)" }}
      >
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-[16px]"
          style={{ color: "var(--c-text)" }}
        />
        <button
          type="button"
          onClick={toggle}
          className="bg-transparent border-none cursor-pointer text-[11px] font-semibold opacity-50 hover:opacity-100 transition-opacity min-h-12 px-1"
          style={{ color: "var(--c-muted-text)" }}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
