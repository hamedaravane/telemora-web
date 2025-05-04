export async function compressImage(blob: Blob, maxW = 800, quality = 0.7): Promise<File> {
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = URL.createObjectURL(blob);
  });

  const ratio = Math.min(1, maxW / img.width);
  const canvas = document.createElement('canvas');
  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);

  return new Promise<File>((res, rej) =>
    canvas.toBlob(
      (b) => (b ? res(new File([b], 'upload.webp', { type: 'image/webp' })) : rej(Error())),
      'image/webp',
      quality,
    ),
  );
}
