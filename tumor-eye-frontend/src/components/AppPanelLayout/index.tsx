import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import ThemeIcon from "@/components/ThemeIcon";
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
      <ThemeIcon isDark={isDark} size={19} />
    </button>
  );
}