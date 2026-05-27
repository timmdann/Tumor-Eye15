import { useAppSelector } from "@/lib/hooks";
import { Link } from "react-router-dom";
import TopPanel from "@/components/TopPanel";
import BrainImage from "@/components/BrainImage";

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
      {/* Sidebar */}
      <aside
        className="shrink-0 w-full md:w-90 md:min-h-screen px-8 md:px-12.5 pt-8 pb-6 md:pt-29.5 md:pb-0 anim-fade-up"
        style={{ backgroundColor: "var(--c-sidebar)" }}
      >
        <h1
          className="text-[22px] md:text-[25px] leading-tight font-extrabold mb-5 whitespace-nowrap"
          style={{ color: "var(--c-sidebar-text)" }}
        >
          Your Profile
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
