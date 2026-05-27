export async function createReportImage(imageUrl: string, imageFilter: string) {
  const img = await loadImage(imageUrl);

  const canvas = document.createElement("canvas");
  canvas.width = 430;
  canvas.height = 430;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context.");

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  const drawWidth = img.width * scale;
  const drawHeight = img.height * scale;
  const drawX = (canvas.width - drawWidth) / 2;
  const drawY = (canvas.height - drawHeight) / 2;

  ctx.filter = imageFilter.replace(/\s+/g, " ").trim();
  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  ctx.filter = "none";

  const boxX = canvas.width * 0.385;
  const boxY = canvas.height * 0.245;
  const boxW = canvas.width * 0.14;
  const boxH = canvas.height * 0.125;

  ctx.fillStyle = "#00ff38";
  ctx.fillRect(boxX, boxY - 22, 94, 22);
  ctx.fillStyle = "#102124";
  ctx.font = "bold 16px Georgia, serif";
  ctx.fillText("tumor 84%", boxX + 7, boxY - 7);

  ctx.strokeStyle = "#00ff38";
  ctx.lineWidth = 4;
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  return canvas.toDataURL("image/png");
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image."));
    img.src = src;
  });
}
