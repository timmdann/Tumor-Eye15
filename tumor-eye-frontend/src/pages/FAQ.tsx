import FAQItem from "@/components/FAQItem";
import BrainImage from "@/components/BrainImage";
import PageNav from "@/components/PageNav";
import { FAQ_NAV_LINKS } from "@/data/navLinks";
import { FAQS } from "@/data/faqItems";

export default function FAQ() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--c-bg)",
        fontFamily: "Abhaya Libre, serif",
      }}
    >
      <header
        className="relative h-[155px] shrink-0 flex items-center"
        style={{ backgroundColor: "var(--c-sidebar)" }}
      >
        <PageNav links={FAQ_NAV_LINKS} />

        <div className="w-full px-4 md:px-15.5 anim-fade-up anim-delay-1">
          <h1
            className="font-bold"
            style={{
              fontSize: "clamp(28px, 3.9vw, 58px)",
              lineHeight: 1,
              color: "var(--c-sidebar-text)",
            }}
          >
            Frequently Asked Questions
          </h1>
        </div>
      </header>

      <main className="relative flex-1 px-4 md:px-15.5 pt-9 pb-12">
        <div className="relative z-10">
          <p
            className="mb-6 font-extrabold anim-fade-up anim-delay-2"
            style={{
              fontSize: "clamp(20px, 2.15vw, 32px)",
              lineHeight: 1.28,
              color: "var(--c-text)",
              maxWidth: 1040,
            }}
          >
            Have another question and can&apos;t find the answer you&apos;re
            looking for?
            <br />
            Contact us by sending an{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=tumoreye15@gmail.com&su=Question%20about%20Tumor%20Eye%2715"
              target="_blank"
              rel="noreferrer"
              className="no-underline"
              style={{ color: "var(--c-text)" }}
            >
              email →
            </a>
          </p>

          <div className="anim-fade-up anim-delay-3" style={{ maxWidth: 900 }}>
            {FAQS.map((faq) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
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
