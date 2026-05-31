import ThemeIcon from "@/components/ThemeIcon";
import TypingDots from "@/components/TypingDots";
import MiniDetectionBox from "@/components/MiniDetectionBox";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
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
      <aside className="min-h-screen shrink-0 w-90 px-12.5 pt-22" style={{ backgroundColor: "var(--c-sidebar)", color: sidebarTextColor }}>
        <h1 className="text-[30px] leading-tight font-extrabold">AI Radiology<br />Assistant</h1>
        <div className="w-57.5 h-px mt-9 mb-7" style={{ backgroundColor: "var(--c-accent)" }} />
        <div className="text-[15px] font-extrabold leading-[1.45]">
          <p>Detected suspicious regions: 1</p>
          <p className="mt-2.5">Region 1: tumor, confidence 84.2%</p>
        </div>
        <div className="relative w-58.75 h-58.75 mt-6.5 flex items-center justify-center" style={{ backgroundColor: "#000" }}>
          {previewImageUrl ? (
            <>
              <img src={previewImageUrl} alt="MRI result preview" className="w-full h-full object-contain" style={{ filter: previewImageFilter }} />
              <MiniDetectionBox />
            </>
          ) : (
            <span className="text-[14px] font-bold" style={{ color: "var(--c-accent)" }}>MRI result preview</span>
          )}
        </div>
        <p className="mt-6.5 text-[12px] font-bold leading-[1.45] max-w-57.5" style={{ color: "var(--c-accent)" }}>
          Note: this result does not constitute a medical diagnosis.
        </p>
      </aside>

      <main className="flex-1 relative min-h-screen overflow-hidden">
        <div className="absolute top-0 right-0 z-10">
          <div className="w-50 h-17 rounded-bl-md flex items-center justify-center gap-7.5" style={{ backgroundColor: "var(--c-panel)" }}>
            <button type="button" onClick={handleBackToResults} className="bg-transparent border-none cursor-pointer text-[14px] font-extrabold p-0 m-0" style={{ color: "var(--c-panel-text)" }}>
              ← Results
            </button>
            <button type="button" onClick={toggleTheme} className="bg-transparent border-none cursor-pointer p-0 m-0 outline-none" style={{ color: "var(--c-panel-text)" }} aria-label="Toggle theme">
              <ThemeIcon isDark={isDark} size={19} />
            </button>
          </div>
        </div>

        <section className="absolute left-22.5 right-0 top-29.5 bottom-9 flex flex-col">
          <div className="flex-1 overflow-y-auto pr-17.5 chat-scrollbar">
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                role={msg.role}
                text={msg.text}
                mutedTextColor={mutedTextColor}
                mainTextColor={mainTextColor}
              />
            ))}
            {isTyping && (
              <div className="flex justify-start mb-6.5">
                <div className="anim-chat-message">
                  <p className="text-[9px] tracking-[0.12em] uppercase font-extrabold mb-2" style={{ color: mutedTextColor }}>AI RESPONSE</p>
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput
            value={question}
            onChange={setQuestion}
            onSend={handleSend}
            disabled={isTyping}
            inputTextColor={inputTextColor}
            inputBorderColor={inputBorderColor}
          />
        </section>
      </main>
    </div>
  );
}
