interface ChatMessageProps {
  role: "user" | "assistant";
  text: string;
  mutedTextColor: string;
  mainTextColor: string;
}

export default function ChatMessage({ role, text, mutedTextColor, mainTextColor }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`mb-[26px] flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[560px] anim-chat-message ${isUser ? "text-right" : "text-left"}`}>
        <p
          className="text-[9px] tracking-[0.12em] uppercase font-extrabold mb-[8px]"
          style={{ color: isUser ? "var(--c-accent)" : mutedTextColor }}
        >
          {isUser ? "YOU" : "AI RESPONSE"}
        </p>
        <p
          className="text-[13px] leading-[1.35] font-bold"
          style={{ color: isUser ? "var(--c-accent)" : mainTextColor }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
