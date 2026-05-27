import SideButton from "@/components/SideButton";

type Adjustments = {
  brightness: number;
  contrast: number;
  sharpness: number;
};

function Slider({
  sliderKey,
  label,
  value,
  min,
  max,
  onBeginChange,
  onFinishChange,
  onChange,
}: {
  sliderKey: keyof Adjustments;
  label: string;
  value: number;
  min: number;
  max: number;
  onBeginChange: (key: keyof Adjustments) => void;
  onFinishChange: () => void;
  onChange: (key: keyof Adjustments, value: number) => void;
}) {
  return (
    <label className="block w-[232px]">
      <span className="block text-[17px] font-extrabold mb-[8px]" style={{ color: "var(--c-sidebar-text)" }}>
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onPointerDown={() => onBeginChange(sliderKey)}
        onPointerUp={onFinishChange}
        onMouseUp={onFinishChange}
        onTouchEnd={onFinishChange}
        onBlur={onFinishChange}
        onKeyDown={(e) => {
          if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) onBeginChange(sliderKey);
        }}
        onKeyUp={onFinishChange}
        onChange={(e) => onChange(sliderKey, Number(e.target.value))}
        className="w-[232px] h-[9px] cursor-pointer"
        style={{ accentColor: "#4a7c73" }}
      />
    </label>
  );
}

export default function AdjustmentsPanel({
  adjustments,
  onBeginChange,
  onFinishChange,
  onChange,
  onUndo,
  onReset,
  onSend,
}: {
  adjustments: Adjustments;
  onBeginChange: (key: keyof Adjustments) => void;
  onFinishChange: () => void;
  onChange: (key: keyof Adjustments, value: number) => void;
  onUndo: () => void;
  onReset: () => void;
  onSend: () => void;
}) {
  return (
    <div className="mt-[0px] w-[232px] flex-1 flex flex-col">
      <div className="flex flex-col gap-[16px]">
        <Slider sliderKey="brightness" label="Brightness" value={adjustments.brightness} min={50} max={150} onBeginChange={onBeginChange} onFinishChange={onFinishChange} onChange={onChange} />
        <Slider sliderKey="contrast" label="Contrast" value={adjustments.contrast} min={50} max={160} onBeginChange={onBeginChange} onFinishChange={onFinishChange} onChange={onChange} />
        <Slider sliderKey="sharpness" label="Sharpness" value={adjustments.sharpness} min={50} max={150} onBeginChange={onBeginChange} onFinishChange={onFinishChange} onChange={onChange} />
      </div>
      <div className="mt-[36px] flex flex-col gap-[16px]">
        <SideButton onClick={onUndo}>Undo</SideButton>
        <SideButton onClick={onReset}>Reset</SideButton>
        <SideButton onClick={onSend}>Send for analysis</SideButton>
      </div>
    </div>
  );
}
