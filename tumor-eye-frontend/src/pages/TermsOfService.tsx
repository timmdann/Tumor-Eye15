import BrainImage from "@/components/BrainImage";
import PageNav from "@/components/PageNav";
import { TERMS_NAV_LINKS } from "@/data/navLinks";
import { TERMS_SECTIONS } from "@/data/termsData";

export default function TermsOfService() {
  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--c-bg)", fontFamily: "Abhaya Libre, serif" }}
    >
      <header
        className="relative h-38.75 shrink-0 flex items-center"
        style={{ backgroundColor: "var(--c-sidebar)" }}
      >
        <PageNav links={TERMS_NAV_LINKS} />

        <div className="w-full px-15.5 anim-fade-up anim-delay-1">
          <h1
            className="font-bold"
            style={{ fontSize: "clamp(38px, 3.9vw, 58px)", lineHeight: 1, color: "var(--c-sidebar-text)" }}
          >
            Terms of Service
          </h1>
        </div>
      </header>

      <main className="relative flex-1 px-15.5 pt-9 pb-12 overflow-hidden">
        <div className="relative z-10">
          <div className="anim-fade-up anim-delay-3" style={{ maxWidth: 900 }}>
            {TERMS_SECTIONS.map((s) => (
              <section key={s.number} className="mb-7 anim-fade-up">
                <p className="text-[13px] font-bold" style={{ color: "gray" }}>
                  {s.number}
                </p>
                <h2 className="text-[18px] font-bold mb-1.5" style={{ color: "var(--c-panel)" }}>
                  {s.title}
                </h2>
                <p
                  className="text-[15px] font-bold mb-1.5"
                  style={{ color: "var(--c-panel-text)", lineHeight: 1.5 }}
                >
                  {s.text}
                </p>
              </section>
            ))}
          </div>
        </div>

        <BrainImage
          className="hidden lg:block right-35 -translate-y-1/2 opacity-35"
          containerClassName="w-72 h-72"
          style={{ top: "calc(54vh - 83.7px)" }}
        />
      </main>
    </div>
  );
}
