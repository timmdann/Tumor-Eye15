import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import type { CSSProperties, ReactNode } from "react";

type AppPanelLayoutProps = {
  title: string;
  subtitle?: string;
  sidebarContent?: ReactNode;
  children: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  showLogout?: boolean;
  onLogout?: () => void;
};

export default function AppPanelLayout({
  title,
  subtitle,
  sidebarContent,
  children,
  showBack = true,
  onBack,
  showLogout = false,
  onLogout,
}: AppPanelLayoutProps) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const layoutStyle = {
    backgroundColor: "var(--c-bg)",
    fontFamily: "Abhaya Libre, serif",
    "--c-sidebar-text": isDark ? "#1c2b2e" : "#d9e3e0",
  } as CSSProperties;

  function handleBack() {
    if (onBack) {
      onBack();
      return;
    }

    navigate("/doctor/upload", { replace: true, state: null });
  }

  function handleLogout() {
    if (onLogout) {
      onLogout();
      return;
    }

    navigate("/", { replace: true, state: null });
  }

  return (
    <div className="h-screen flex overflow-hidden" style={layoutStyle}>
      <aside
        className="
          h-screen
          shrink-0
          w-[360px]
          px-[50px]
          pt-[88px]
          pb-[88px]
          flex
          flex-col
        "
        style={{
          backgroundColor: "var(--c-sidebar)",
          color: "var(--c-sidebar-text)",
        }}
      >
        <h1 className="text-[28px] leading-tight font-extrabold">{title}</h1>

        <div
          className="w-[190px] h-px mt-[28px] mb-[22px]"
          style={{ backgroundColor: "var(--c-accent)" }}
        />

        {subtitle && (
          <p className="text-[15px] font-bold leading-[1.45] max-w-[240px]">
            {subtitle}
          </p>
        )}

        <div className="flex-1 flex flex-col">{sidebarContent}</div>
      </aside>

      <main className="flex-1 relative h-screen overflow-hidden">
        <div className="absolute top-0 right-0 z-10">
          {showBack ? (
            <TopRightPanel>
              <button
                type="button"
                onClick={handleBack}
                className="
                  bg-transparent
                  border-none
                  cursor-pointer
                  text-[14px]
                  font-extrabold
                  p-0
                  m-0
                  leading-none
                "
                style={{ color: "var(--c-panel-text)" }}
              >
                ← Back
              </button>

              <ThemeButton isDark={isDark} toggleTheme={toggleTheme} />
            </TopRightPanel>
          ) : showLogout ? (
            <TopRightPanel>
              <button
                type="button"
                onClick={handleLogout}
                className="
                  bg-transparent
                  border-none
                  cursor-pointer
                  text-[14px]
                  font-extrabold
                  p-0
                  m-0
                  leading-none
                "
                style={{ color: "var(--c-panel-text)" }}
              >
                ← Log out
              </button>

              <ThemeButton isDark={isDark} toggleTheme={toggleTheme} />
            </TopRightPanel>
          ) : (
            <div
              className="
                w-[78px] h-[74px]
                rounded-bl-md
                flex
                items-center
                justify-center
              "
              style={{ backgroundColor: "var(--c-panel)" }}
            >
              <ThemeButton isDark={isDark} toggleTheme={toggleTheme} />
            </div>
          )}
        </div>

        <section className="h-screen flex items-center justify-center">
          {children}
        </section>
      </main>
    </div>
  );
}

function TopRightPanel({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        w-[176px] h-[74px]
        rounded-bl-md
        flex
        items-center
        justify-center
        gap-[24px]
      "
      style={{ backgroundColor: "var(--c-panel)" }}
    >
      {children}
    </div>
  );
}

function ThemeButton({
  isDark,
  toggleTheme,
}: {
  isDark: boolean;
  toggleTheme: () => void;
}) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        bg-transparent
        border-none
        cursor-pointer
        flex
        items-center
        justify-center
        p-0
        m-0
        w-[22px]
        h-[22px]
      "
      style={{ color: "var(--c-panel-text)" }}
      aria-label="Toggle theme"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
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
  );
}

function MoonIcon() {
  return (
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
  );
}