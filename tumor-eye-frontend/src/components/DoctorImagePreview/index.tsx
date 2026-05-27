function DetectionBox() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: "40.5%", top: "25.8%", width: "14%", height: "12.5%", overflow: "visible" }}
    >
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: 0,
          bottom: "calc(100% - 2px)",
          minWidth: "100%",
          height: "16px",
          padding: "0 6px",
          backgroundColor: "#00ff38",
          color: "#102124",
          fontSize: "10px",
          fontWeight: 700,
          lineHeight: 1,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          zIndex: 2,
        }}
      >
        Tumor 84%
      </div>
      <div className="absolute inset-0" style={{ border: "2px solid #00ff38", boxSizing: "border-box" }} />
    </div>
  );
}

export default function DoctorImagePreview({
  imageUrl,
  imageFilter,
  showDetection,
}: {
  imageUrl: string | null;
  imageFilter: string;
  showDetection: boolean;
}) {
  return (
    <div className="relative w-[520px] h-[520px] flex items-center justify-center">
      <div
        className="relative w-[430px] h-[430px] flex items-center justify-center"
        style={{ backgroundColor: "#000" }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="MRI scan" className="w-full h-full object-contain" style={{ filter: imageFilter }} />
        ) : (
          <p className="text-white text-[14px] font-bold">No image selected</p>
        )}
        {showDetection && <DetectionBox />}
      </div>
    </div>
  );
}
