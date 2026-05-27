export default function MiniDetectionBox() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: "38.5%", top: "24.5%", width: "14%", height: "12.5%" }}
    >
      <div
        className="absolute left-0 bottom-full px-[4px] py-[1px] text-[7px] font-extrabold whitespace-nowrap leading-none"
        style={{ backgroundColor: "#00ff38", color: "#102124" }}
      >
        tumor&nbsp;84%
      </div>
      <div
        className="w-full h-full"
        style={{ border: "2px solid #00ff38", boxSizing: "border-box" }}
      />
    </div>
  );
}
