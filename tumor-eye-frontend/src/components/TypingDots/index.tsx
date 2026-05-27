export default function TypingDots() {
  return (
    <div className="flex gap-[6px]">
      <span className="typing-dot w-[7px] h-[7px] rounded-full" style={{ backgroundColor: "var(--c-accent)" }} />
      <span className="typing-dot w-[7px] h-[7px] rounded-full" style={{ backgroundColor: "var(--c-accent)" }} />
      <span className="typing-dot w-[7px] h-[7px] rounded-full" style={{ backgroundColor: "var(--c-accent)" }} />
    </div>
  );
}
