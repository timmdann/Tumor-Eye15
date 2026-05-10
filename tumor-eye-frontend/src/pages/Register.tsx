import { useState } from "react";
import { Link } from "react-router-dom";
import BrainImage from "@/components/BrainImage";
import BackThemePanel from "@/components/BackThemePanel";

type Role = "student" | "doctor";

export default function Register() {
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
        <BackThemePanel />

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