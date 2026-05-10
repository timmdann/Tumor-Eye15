interface SoonProps {
  name: string;
}

export default function Soon({ name }: SoonProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-2xl"
      style={{ color: "var(--c-text)" }}
    >
      {name} - coming soon
    </div>
  );
}
