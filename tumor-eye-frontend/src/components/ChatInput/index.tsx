interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  disabled?: boolean;
  inputTextColor: string;
  inputBorderColor: string;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  inputTextColor,
  inputBorderColor,
}: ChatInputProps) {
  return (
    <div
      className="h-[58px] border-t flex items-center gap-[18px] mr-[70px]"
      style={{ borderColor: inputBorderColor }}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") onSend(); }}
        placeholder="Ask about this scan..."
        className="chat-input flex-1 bg-transparent border-none outline-none text-[13px] font-bold"
        style={{ color: inputTextColor }}
      />
      <button
        type="button"
        onClick={onSend}
        disabled={disabled}
        className="bg-transparent border-none cursor-pointer text-[15px] font-extrabold disabled:opacity-40"
        style={{ color: "var(--c-accent)" }}
      >
        Send
      </button>
    </div>
  );
}
