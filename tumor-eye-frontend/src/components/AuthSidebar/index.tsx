interface AuthSidebarProps {
  title: string;
}

export default function AuthSidebar({ title }: AuthSidebarProps) {
  return (
    <aside
      className="shrink-0 w-full md:w-90 md:min-h-screen px-8 md:px-12.5 pt-8 pb-6 md:pt-29.5 md:pb-0 anim-fade-up"
      style={{ backgroundColor: "var(--c-sidebar)" }}
    >
      <h1
        className="text-[22px] md:text-[25px] leading-tight font-extrabold mb-5 whitespace-nowrap"
        style={{ color: "var(--c-sidebar-text)" }}
      >
        {title}
      </h1>
      <div className="w-[175px] h-px mb-3" style={{ backgroundColor: "var(--c-accent)" }} />
      <p className="text-[14px] font-semibold" style={{ color: "var(--c-accent)" }}>
        TumorEye&apos;15
      </p>
    </aside>
  );
}
