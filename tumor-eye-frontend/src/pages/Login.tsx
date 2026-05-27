import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginUser } from "@/store/slices/authSlice";
import { usePasswordToggle } from "@/lib/hooks/usePasswordToggle";
import BrainImage from "@/components/BrainImage";
import FormInput from "@/components/FormInput";
import TopPanel from "@/components/TopPanel";
import ErrorMessage from "@/components/ErrorMessage";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");        // ← ZAMIANA username → email
  const [password, setPassword] = useState("");
  const { showPassword, toggle: togglePassword } = usePasswordToggle();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password })); // ← poprawione
    if (loginUser.fulfilled.match(result)) {
      navigate("/profile");
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
      {/* Sidebar */}
      <aside
        className="shrink-0 w-full md:w-90 md:min-h-screen px-8 md:px-12.5 pt-8 pb-6 md:pt-29.5 md:pb-0 anim-fade-up"
        style={{ backgroundColor: "var(--c-sidebar)" }}
      >
        <h1
          className="text-[22px] md:text-[25px] leading-tight font-extrabold mb-5 whitespace-nowrap"
          style={{ color: "var(--c-sidebar-text)" }}
        >
          Log in to continue
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
              label="Email Address"
              delay="anim-delay-1"
              value={email}
              onChange={setEmail}
            />

            <div className="anim-fade-up anim-delay-2">
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

            <ErrorMessage message={error} />

            <div className="pt-[6px] anim-fade-up anim-delay-3">
              <button
                type="submit"
                disabled={loading}
                className="w-[172px] h-[45px] rounded-sm border-none cursor-pointer text-[14px] font-extrabold transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: "var(--c-button)",
                  color: "var(--c-button-text)",
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p
                className="mt-[14px] text-[12px] font-bold"
                style={{ color: "var(--c-text)" }}
              >
                New here?{" "}
                <Link
                  to="/register"
                  className="no-underline"
                  style={{ color: "var(--c-text)" }}
                >
                  Create account →
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
