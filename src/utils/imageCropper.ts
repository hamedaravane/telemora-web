import { Area } from 'react-easy-crop';

export async function getCroppedImg(
  imageSrc: string,
  areaPixels: Area,
  format: 'jpeg' | 'webp' = 'webp',
): Promise<Blob> {
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const image = new Image();
    image.onload = () => res(image);
    image.onerror = rej;
    image.src = imageSrc;
  });

  const canvas = document.createElement('canvas');
  canvas.width = areaPixels.width;
  canvas.height = areaPixels.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(
    img,
    areaPixels.x,
    areaPixels.y,
    areaPixels.width,
    areaPixels.height,
    0,
    0,
    areaPixels.width,
    areaPixels.height,
  );

  return new Promise<Blob>((res, rej) =>
    canvas.toBlob((b) => (b ? res(b) : rej(new Error('toBlob failed'))), `image/${format}`, 0.8),
  );
}
