import ThemeIcon from "@/components/ThemeIcon";
import TypingDots from "@/components/TypingDots";
import MiniDetectionBox from "@/components/MiniDetectionBox";
import { useDoctorChat } from "@/lib/hooks/useDoctorChat";

export default function DoctorChat() {
  const {
    isDark, toggleTheme,
    previewImageUrl, previewImageFilter,
    question, setQuestion, messages, isTyping, messagesEndRef,
    sidebarTextColor, mainTextColor, mutedTextColor, inputTextColor, inputBorderColor,
    handleSend, handleBackToResults,
  } = useDoctorChat();

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ backgroundColor: "var(--c-bg)", fontFamily: "Abhaya Libre, serif" }}>
      <aside className="min-h-screen shrink-0 w-[360px] px-[50px] pt-[88px]" style={{ backgroundColor: "var(--c-sidebar)", color: sidebarTextColor }}>
        <h1 className="text-[30px] leading-tight font-extrabold">AI Radiology<br />Assistant</h1>
        <div className="w-[230px] h-px mt-[36px] mb-[28px]" style={{ backgroundColor: "var(--c-accent)" }} />
        <div className="text-[15px] font-extrabold leading-[1.45]">
          <p>Detected suspicious regions: 1</p>
          <p className="mt-[10px]">Region 1: tumor, confidence 84.2%</p>
        </div>
        <div className="relative w-[235px] h-[235px] mt-[26px] flex items-center justify-center" style={{ backgroundColor: "#000" }}>
          {previewImageUrl ? (
            <>
              <img src={previewImageUrl} alt="MRI result preview" className="w-full h-full object-contain" style={{ filter: previewImageFilter }} />
              <MiniDetectionBox />
            </>
          ) : (
            <span className="text-[14px] font-bold" style={{ color: "var(--c-accent)" }}>MRI result preview</span>
          )}
        </div>
        <p className="mt-[26px] text-[12px] font-bold leading-[1.45] max-w-[230px]" style={{ color: "var(--c-accent)" }}>
          Note: this result does not constitute a medical diagnosis.
        </p>
      </aside>

      <main className="flex-1 relative min-h-screen overflow-hidden">
        <div className="absolute top-0 right-0 z-10">
          <div className="w-[200px] h-[68px] rounded-bl-md flex items-center justify-center gap-[30px]" style={{ backgroundColor: "var(--c-panel)" }}>
            <button type="button" onClick={handleBackToResults} className="bg-transparent border-none cursor-pointer text-[14px] font-extrabold p-0 m-0" style={{ color: "var(--c-panel-text)" }}>
              ← Results
            </button>
            <button type="button" onClick={toggleTheme} className="bg-transparent border-none cursor-pointer p-0 m-0 outline-none" style={{ color: "var(--c-panel-text)" }} aria-label="Toggle theme">
              <ThemeIcon isDark={isDark} size={19} />
            </button>
          </div>
        </div>

        <section className="absolute left-[90px] right-0 top-[118px] bottom-[36px] flex flex-col">
          <div className="flex-1 overflow-y-auto pr-[70px] chat-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-[26px] ${msg.role === "user" ? "flex justify-end" : "flex justify-start"}`}>
                <div className={`max-w-[560px] anim-chat-message ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  <p className="text-[9px] tracking-[0.12em] uppercase font-extrabold mb-[8px]" style={{ color: msg.role === "assistant" ? mutedTextColor : "var(--c-accent)" }}>
                    {msg.role === "assistant" ? "AI RESPONSE" : "YOU"}
                  </p>
                  <p className="text-[13px] leading-[1.35] font-bold" style={{ color: msg.role === "assistant" ? mainTextColor : "var(--c-accent)" }}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-[26px]">
                <div className="anim-chat-message">
                  <p className="text-[9px] tracking-[0.12em] uppercase font-extrabold mb-[8px]" style={{ color: mutedTextColor }}>AI RESPONSE</p>
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="h-[58px] border-t flex items-center gap-[18px] mr-[70px]" style={{ borderColor: inputBorderColor }}>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              placeholder="Ask about this scan..."
              className="chat-input flex-1 bg-transparent border-none outline-none text-[13px] font-bold"
              style={{ color: inputTextColor }}
            />
            <button type="button" onClick={handleSend} disabled={isTyping} className="bg-transparent border-none cursor-pointer text-[15px] font-extrabold disabled:opacity-40" style={{ color: "var(--c-accent)" }}>
              Send
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
