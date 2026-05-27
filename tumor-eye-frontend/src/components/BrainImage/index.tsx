import React from "react";
import type { CSSProperties } from "react";

interface BrainImageProps {
  className?: string;
  containerClassName?: string;
  style?: CSSProperties;
}

function BrainImage({
  className = "",
  containerClassName = "w-96 h-96",
  style,
}: BrainImageProps) {
  return (
    <div
      className={`absolute pointer-events-none anim-fade-up anim-delay-4 ${containerClassName} ${className}`}
      style={style}
    >
      <div className="anim-levitate w-full h-full relative z-10">
        <img
          src="/brain.png"
          alt="Brain MRI visualization"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>

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

export default React.memo(BrainImage);
