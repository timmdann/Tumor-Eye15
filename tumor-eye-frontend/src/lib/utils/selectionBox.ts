export type SelectionBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DraftSelection = {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
};

export const IMAGE_PREVIEW_SIZE = 430;

export function getBoxInPixels(selection: SelectionBox) {
  return {
    x: toImagePx(selection.x),
    y: toImagePx(selection.y),
    width: toImagePx(selection.width),
    height: toImagePx(selection.height),
  };
}

export function toImagePx(percentValue: number) {
  return Math.round((percentValue / 100) * IMAGE_PREVIEW_SIZE);
}

export function calculateOverlapPercentage(
  studentSelection: SelectionBox,
  aiSelection: SelectionBox
) {
  const overlapLeft = Math.max(studentSelection.x, aiSelection.x);
  const overlapTop = Math.max(studentSelection.y, aiSelection.y);
  const overlapRight = Math.min(
    studentSelection.x + studentSelection.width,
    aiSelection.x + aiSelection.width
  );
  const overlapBottom = Math.min(
    studentSelection.y + studentSelection.height,
    aiSelection.y + aiSelection.height
  );

  const overlapWidth = Math.max(0, overlapRight - overlapLeft);
  const overlapHeight = Math.max(0, overlapBottom - overlapTop);
  const overlapArea = overlapWidth * overlapHeight;

  const studentArea = studentSelection.width * studentSelection.height;
  const aiArea = aiSelection.width * aiSelection.height;
  const unionArea = studentArea + aiArea - overlapArea;

  if (unionArea <= 0) return 0;
  return Math.round((overlapArea / unionArea) * 100);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
