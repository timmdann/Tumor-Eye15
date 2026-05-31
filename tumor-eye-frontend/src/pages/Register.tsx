import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { registerUser, clearError } from "@/store/slices/authSlice";
import BrainImage from "@/components/BrainImage";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import RoleButton from "@/components/RoleButton";
import TopPanel from "@/components/TopPanel";
import ErrorMessage from "@/components/ErrorMessage";
import AuthSidebar from "@/components/AuthSidebar";
import type { UserRole } from "@/types/api";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [role, setRole] = useState<UserRole>("doctor");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => () => { dispatch(clearError()); }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(registerUser({ email, password, username, role }));
    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row overflow-hidden"
      style={{ backgroundColor: "var(--c-bg)", fontFamily: "Abhaya Libre, serif" }}
    >
      <AuthSidebar title="Create your account" />

      <main className="flex-1 relative min-h-screen overflow-hidden">
        <TopPanel />

        <section className="flex justify-center items-center px-4 pt-20 pb-8 md:absolute md:left-21.25 md:top-1/2 md:-translate-y-1/2 md:w-105 md:p-0 md:block">
          <form className="w-full max-w-105 flex flex-col gap-7" onSubmit={handleSubmit}>
            <FormInput label="Username" delay="anim-delay-1" value={username} onChange={setUsername} />
            <FormInput label="Email Address" delay="anim-delay-2" value={email} onChange={setEmail} />
            <PasswordInput value={password} onChange={setPassword} delay="anim-delay-3" />

            <div className="flex gap-[38px] pt-[18px] anim-fade-up anim-delay-4">
              <RoleButton active={role === "student"} onClick={() => setRole("student")}>
                Student
              </RoleButton>
              <RoleButton active={role === "doctor"} onClick={() => setRole("doctor")}>
                Doctor
              </RoleButton>
            </div>

            <ErrorMessage message={error} />

            <div className="pt-[6px] anim-fade-up anim-delay-5">
              <button
                type="submit"
                disabled={loading}
                className="w-[172px] h-[45px] rounded-sm border-none cursor-pointer text-[14px] font-extrabold transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "var(--c-button)", color: "var(--c-button-text)" }}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              <p className="mt-3.5 text-[12px] font-bold" style={{ color: "var(--c-text)" }}>
                Already registered?{" "}
                <Link to="/login" className="no-underline" style={{ color: "var(--c-text)" }}>
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
