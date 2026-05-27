import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { registerUser } from "@/store/slices/authSlice";
import { usePasswordToggle } from "@/lib/hooks/usePasswordToggle";
import BrainImage from "@/components/BrainImage";
import FormInput from "@/components/FormInput";
import RoleButton from "@/components/RoleButton";
import TopPanel from "@/components/TopPanel";
import ErrorMessage from "@/components/ErrorMessage";
import type { UserRole } from "@/types/api";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [role, setRole] = useState<UserRole>("doctor");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showPassword, toggle: togglePassword } = usePasswordToggle();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(
      registerUser({ email, password, username, role }),
    );
    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row overflow-hidden"
      style={{
        backgroundColor: "var(--c-bg)",
        fontFamily: "Abhaya Libre, serif",
      }}
    >
      <aside
        className="shrink-0 w-full md:w-90 md:min-h-screen px-8 md:px-12.5 pt-8 pb-6 md:pt-29.5 md:pb-0 anim-fade-up"
        style={{ backgroundColor: "var(--c-sidebar)" }}
      >
        <h1
          className="text-[22px] md:text-[25px] leading-tight font-extrabold mb-5 whitespace-nowrap"
          style={{ color: "var(--c-sidebar-text)" }}
        >
          Create your account
        </h1>
        <div
          className="w-[175px] h-px mb-3"
          style={{ backgroundColor: "var(--c-accent)" }}
        />
        <p
          className="text-[14px] font-semibold"
          style={{ color: "var(--c-accent)" }}
        >
          TumorEye&apos;15
        </p>
      </aside>

      {/* Main content */}
      <main className="flex-1 relative min-h-screen overflow-hidden">
        <TopPanel />

        <section className="flex justify-center items-center px-4 pt-20 pb-8 md:absolute md:left-21.25 md:top-1/2 md:-translate-y-1/2 md:w-105 md:p-0 md:block">
          <form
            className="w-full max-w-105 flex flex-col gap-7"
            onSubmit={handleSubmit}
          >
            <FormInput
              label="Username"
              delay="anim-delay-1"
              value={username}
              onChange={setUsername}
            />
            <FormInput
              label="Email Address"
              delay="anim-delay-2"
              value={email}
              onChange={setEmail}
            />

            <div className="anim-fade-up anim-delay-3">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[16px]"
                  style={{ color: "var(--c-text)" }}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="bg-transparent border-none cursor-pointer text-[11px] font-semibold opacity-50 hover:opacity-100 transition-opacity min-h-12 px-1"
                  style={{ color: "var(--c-muted-text)" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

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

            <ErrorMessage message={error} />

            <div className="pt-[6px] anim-fade-up anim-delay-5">
              <button
                type="submit"
                disabled={loading}
                className="w-[172px] h-[45px] rounded-sm border-none cursor-pointer text-[14px] font-extrabold transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: "var(--c-button)",
                  color: "var(--c-button-text)",
                }}
              >
                {loading ? "Registering..." : "Register"}
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

        <BrainImage className="hidden md:block right-20 top-1/2 -translate-y-1/2" />
      </main>
    </div>
  );
}
