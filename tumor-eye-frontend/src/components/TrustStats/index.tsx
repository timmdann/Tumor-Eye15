import { TRUST_STATS } from "@/data/trustStats";

function StatBlock({
  kicker,
  label,
  mobile,
}: {
  kicker: string;
  label: string;
  mobile: boolean;
}) {
  return (
    <div
      className={mobile ? "border-l pl-3 py-1" : "border-l pl-4 py-1"}
      style={{ borderColor: "color-mix(in srgb, var(--c-accent) 50%, transparent)" }}
    >
      <div
        style={{
          fontFamily: "Abhaya Libre, serif",
          fontSize: mobile ? 16 : 20,
          fontWeight: 700,
          color: "var(--c-accent)",
          lineHeight: 1.1,
          marginBottom: mobile ? 2 : 4,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          fontSize: mobile ? 10 : 11,
          letterSpacing: mobile ? "1px" : "1.5px",
          textTransform: "uppercase",
          color: "var(--c-text)",
          opacity: 0.6,
          fontFamily: "Abhaya Libre, serif",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function TrustStats({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={mobile ? "grid grid-cols-3 gap-3" : "grid grid-cols-3 gap-6"}
      style={mobile ? undefined : { maxWidth: 520 }}
    >
      {TRUST_STATS.map((s) => (
        <StatBlock key={s.kicker} kicker={s.kicker} label={s.label} mobile={mobile} />
      ))}
    </div>
  );
}
