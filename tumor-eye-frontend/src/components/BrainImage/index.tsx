import { useTheme } from "@/context/ThemeContext";

type BrainImageProps = {
  className?: string;
  imageClassName?: string;
};

export default function BrainImage({
  className = "",
  imageClassName = "w-96 h-96",
}: BrainImageProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={`
        absolute
        pointer-events-none
        anim-fade-up anim-delay-4
        ${imageClassName}
        ${className}
      `}
    >
      {/* Images — levitate */}
      <div className="anim-levitate w-full h-full relative z-10">
        <img
          src="/brain-light.png"
          alt="Brain MRI"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            opacity: isDark ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        />

        <img
          src="/brain-dark.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            opacity: isDark ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
      </div>

      {/* Shadow — same as Landing */}
      <div
        className="anim-shadow-pulse absolute left-1/2"
        style={{
          bottom: "-8px",
          width: "55%",
          height: 18,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 75%)",
          filter: "blur(4px)",
        }}
      />
    </div>
  );
}