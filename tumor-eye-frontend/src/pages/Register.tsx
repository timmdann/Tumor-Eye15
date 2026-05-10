import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import BrainImage from "@/components/BrainImage";

type Role = "student" | "doctor";

export default function Register() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const [role, setRole] = useState<Role>("doctor");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{
        backgroundColor: "var(--c-bg)",
        fontFamily: "Abhaya Libre, serif",
      }}
    >
      {/* LEFT SIDEBAR */}
      <aside
        className="
          min-h-screen shrink-0
          w-[360px]
          px-[50px] pt-[118px]
          anim-fade-up
        "
        style={{
          backgroundColor: "var(--c-sidebar)",
        }}
      >
        <h1
          className="text-[25px] leading-tight font-extrabold mb-[20px] whitespace-nowrap"
          style={{ color: "var(--c-sidebar-text)" }}
        >
          Create your account
        </h1>

        <div
          className="w-[175px] h-px mb-[12px]"
          style={{ backgroundColor: "var(--c-accent)" }}
        />

        <p
          className="text-[14px] font-semibold"
          style={{ color: "var(--c-accent)" }}
        >
          TumorEye&apos;15
        </p>
      </aside>

      {/* MAIN */}
      <main className="flex-1 relative min-h-screen overflow-hidden">
        {/* TOP RIGHT PANEL */}
        <div className="absolute top-0 right-0 anim-fade-up anim-delay-1">
          <div
            className="
              w-[170px] h-[58px]
              rounded-bl-md
              flex items-center
              px-[28px] gap-[22px]
            "
            style={{ backgroundColor: "var(--c-panel)" }}
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-transparent border-none cursor-pointer text-[13px] font-bold"
              style={{ color: "var(--c-panel-text)" }}
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="ml-auto bg-transparent border-none cursor-pointer"
              style={{ color: "var(--c-panel-text)" }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <line x1="12" y1="2" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="22" />
                  <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
                  <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
                  <line x1="2" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
                  <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* FORM */}
        <section
          className="
            absolute
            left-[85px]
            top-1/2 -translate-y-1/2
            w-[420px]
          "
        >
          <form className="flex flex-col gap-[28px]">
            <FormInput label="Username" delay="anim-delay-1" />

            <FormInput label="Email Address" delay="anim-delay-2" />

            <div className="anim-fade-up anim-delay-3">
              <label
                className="block text-[14px] font-bold mb-[12px]"
                style={{ color: "var(--c-text)" }}
              >
                Password
              </label>

              <div
                className="flex items-center border-b pb-[8px]"
                style={{ borderColor: "var(--c-line)" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  className="flex-1 bg-transparent border-none outline-none text-[16px]"
                  style={{ color: "var(--c-text)" }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="
                    bg-transparent border-none cursor-pointer
                    text-[11px] font-semibold
                    opacity-50 hover:opacity-100
                    transition-opacity
                  "
                  style={{ color: "var(--c-muted-text)" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* ROLE SELECT */}
            <div className="flex gap-[38px] pt-[18px] anim-fade-up anim-delay-4">
              <RoleButton
                active={role === "student"}
                onClick={() => setRole("student")}
              >
                Student
              </RoleButton>

              <RoleButton
                active={role === "doctor"}
                onClick={() => setRole("doctor")}
              >
                Doctor
              </RoleButton>
            </div>

            <div className="pt-[6px] anim-fade-up anim-delay-5">
              <button
                type="submit"
                className="
                  w-[172px] h-[45px]
                  rounded-sm border-none cursor-pointer
                  text-[14px] font-extrabold
                  transition-opacity hover:opacity-90
                "
                style={{
                  backgroundColor: "var(--c-button)",
                  color: "var(--c-button-text)",
                }}
              >
                Register
              </button>

              <p
                className="mt-[14px] text-[12px] font-bold"
                style={{ color: "var(--c-text)" }}
              >
                Already registered?{" "}
                <Link
                  to="/login"
                  className="no-underline"
                  style={{ color: "var(--c-text)" }}
                >
                  Login →
                </Link>
              </p>
            </div>
          </form>
        </section>

        <BrainImage className="right-20 top-1/2 -translate-y-1/2" />
      </main>
    </div>
  );
}

function FormInput({
  label,
  delay,
}: {
  label: string;
  delay: string;
}) {
  return (
    <div className={`anim-fade-up ${delay}`}>
      <label
        className="block text-[14px] font-bold mb-[12px]"
        style={{ color: "var(--c-text)" }}
      >
        {label}
      </label>

      <input
        type={label === "Email Address" ? "email" : "text"}
        className="
          w-full bg-transparent
          border-0 border-b outline-none
          pb-[8px] text-[16px]
        "
        style={{
          borderColor: "var(--c-line)",
          color: "var(--c-text)",
        }}
      />
    </div>
  );
}

function RoleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        relative bg-transparent border-none cursor-pointer
        pb-[4px] text-[14px] font-extrabold
      "
      style={{
        color: "var(--c-text)",
        opacity: active ? 1 : 0.28,
      }}
    >
      {children}

      {active && (
        <span
          className="absolute left-0 right-0 -bottom-[1px] h-px"
          style={{ backgroundColor: "var(--c-text)" }}
        />
      )}
    </button>
  );
}