import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginUser, clearError } from "@/store/slices/authSlice";
import BrainImage from "@/components/BrainImage";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import TopPanel from "@/components/TopPanel";
import ErrorMessage from "@/components/ErrorMessage";
import AuthSidebar from "@/components/AuthSidebar";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => () => { dispatch(clearError()); }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      const role = result.payload?.user?.user_metadata?.role as string | undefined;
      navigate(role === "doctor" ? "/doctor/upload" : "/student/upload");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row overflow-hidden"
      style={{ backgroundColor: "var(--c-bg)", fontFamily: "Abhaya Libre, serif" }}
    >
      <AuthSidebar title="Log in to continue" />

      <main className="flex-1 relative min-h-screen overflow-hidden">
        <TopPanel />

        <section className="flex justify-center items-center px-4 pt-20 pb-8 md:absolute md:left-21.25 md:top-1/2 md:-translate-y-1/2 md:w-105 md:p-0 md:block">
          <form className="w-full max-w-105 flex flex-col gap-7" onSubmit={handleSubmit}>
            <FormInput label="Email Address" delay="anim-delay-1" value={email} onChange={setEmail} />
            <PasswordInput value={password} onChange={setPassword} delay="anim-delay-2" />
            <ErrorMessage message={error} />

            <div className="pt-[6px] anim-fade-up anim-delay-3">
              <button
                type="submit"
                disabled={loading}
                className="w-[172px] h-[45px] rounded-sm border-none cursor-pointer text-[14px] font-extrabold transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "var(--c-button)", color: "var(--c-button-text)" }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="mt-[14px] text-[12px] font-bold" style={{ color: "var(--c-text)" }}>
                New here?{" "}
                <Link to="/register" className="no-underline" style={{ color: "var(--c-text)" }}>
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
