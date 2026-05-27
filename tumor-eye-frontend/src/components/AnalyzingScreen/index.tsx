export default function AnalyzingScreen() {
  return (
    <div
      className="w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "var(--c-bg)", fontFamily: "Abhaya Libre, serif" }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-[250px] h-[250px]">
          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{ width: 174, height: 174, border: "1px solid var(--c-accent)", animation: "analyzingPulseOuter 2.8s ease-in-out infinite" }}
          />
          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{ width: 144, height: 144, border: "1px solid var(--c-accent)", animation: "analyzingPulseMiddle 2.2s ease-in-out infinite" }}
          />
          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{ width: 108, height: 108, border: "2px solid var(--c-accent)", animation: "analyzingPulseInner 1.8s ease-in-out infinite" }}
          />
          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{ width: 66, height: 66, border: "2px solid var(--c-accent)", animation: "analyzingPulseInner 1.6s ease-in-out infinite" }}
          />
          <span
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{ width: 52, height: 52, backgroundColor: "var(--c-accent)", animation: "analyzingCenterPulse 1.4s ease-in-out infinite" }}
          />

          <div className="absolute inset-0" style={{ animation: "analyzingSpin 8s linear infinite" }}>
            <span
              className="absolute left-1/2 top-[38px] -translate-x-1/2 rounded-full"
              style={{ width: 7, height: 7, backgroundColor: "var(--c-accent)", animation: "analyzingDotPulse 1.5s ease-in-out infinite" }}
            />
          </div>
          <div className="absolute inset-0" style={{ animation: "analyzingSpinReverse 6.5s linear infinite" }}>
            <span
              className="absolute left-[42px] top-1/2 -translate-y-1/2 rounded-full"
              style={{ width: 6, height: 6, backgroundColor: "var(--c-accent)", animation: "analyzingDotPulse 1.7s ease-in-out infinite" }}
            />
          </div>
          <div className="absolute inset-0" style={{ animation: "analyzingSpin 5.7s linear infinite" }}>
            <span
              className="absolute left-1/2 bottom-[56px] -translate-x-1/2 rounded-full"
              style={{ width: 6, height: 6, backgroundColor: "var(--c-accent)", animation: "analyzingDotPulse 1.3s ease-in-out infinite" }}
            />
          </div>
          <div className="absolute inset-0" style={{ animation: "analyzingSpinReverse 4.8s linear infinite" }}>
            <span
              className="absolute right-[58px] top-1/2 -translate-y-1/2 rounded-full"
              style={{ width: 5, height: 5, backgroundColor: "var(--c-accent)", animation: "analyzingDotPulse 1.2s ease-in-out infinite" }}
            />
          </div>
        </div>

        <p
          className="mt-[2px] text-[36px] font-bold"
          style={{ color: "var(--c-accent)", animation: "analyzingTextPulse 1.8s ease-in-out infinite" }}
        >
          Analyzing...
        </p>
      </div>
    </div>
  );
}
