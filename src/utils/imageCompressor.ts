export async function compressImage(blob: Blob, maxWidth = 800, quality = 0.7): Promise<File> {
  const image = new Image();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      image.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ratio = Math.min(1, maxWidth / image.width);
      canvas.width = image.width * ratio;
      canvas.height = image.height * ratio;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (compressed) => {
          if (!compressed) return reject(new Error('Compression failed'));
          resolve(new File([compressed], 'upload.webp', { type: 'image/webp' }));
        },
        'image/webp',
        quality,
      );
    };
  });
}
