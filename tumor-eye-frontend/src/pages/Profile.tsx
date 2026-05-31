import { useAppSelector } from "@/lib/hooks";
import { Link } from "react-router-dom";
import TopPanel from "@/components/TopPanel";
import BrainImage from "@/components/BrainImage";
import AuthSidebar from "@/components/AuthSidebar";

export default function Profile() {
  const { username, email, role } = useAppSelector((s) => s.auth);

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row overflow-hidden"
      style={{
        backgroundColor: "var(--c-bg)",
        fontFamily: "Abhaya Libre, serif",
      }}
    >
      <AuthSidebar title="Your Profile" />

      {/* Main content */}
      <main className="flex-1 relative min-h-screen overflow-hidden">
        <TopPanel />

        <section className="flex justify-center items-center px-4 pt-20 pb-8 md:absolute md:left-21.25 md:top-1/2 md:-translate-y-1/2 md:w-105 md:p-0 md:block">
          <div className="w-full max-w-105 flex flex-col gap-8 anim-fade-up">

            <p
              className="text-[20px] font-extrabold"
              style={{ color: "var(--c-text)" }}
            >
              Username: <span className="font-normal">{username}</span>
            </p>

            <p
              className="text-[20px] font-extrabold"
              style={{ color: "var(--c-text)" }}
            >
              Email address: <span className="font-normal">{email}</span>
            </p>

            <p
              className="text-[20px] font-extrabold"
              style={{ color: "var(--c-text)" }}
            >
              Chosen work mode:{" "}
              <span className="font-normal">{role?.toUpperCase()}</span>
            </p>

            <p
              className="text-[18px] font-extrabold mt-4"
              style={{ color: "var(--c-text)" }}
            >
              Forget your password?{" "}
              <Link
                to="/register"
                className="no-underline"
                style={{ color: "var(--c-text)" }}
              >
                Reset your password here →
              </Link>
            </p>

          </div>
        </section>


        <BrainImage className="hidden md:block right-20 top-1/2 -translate-y-1/2" />
      </main>
    </div>
  );
}
