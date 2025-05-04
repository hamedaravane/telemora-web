'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@heroui/react';
import toast from 'react-hot-toast';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImg } from '@/utils/imageCropper';
import { compressImage } from '@/utils/imageCompressor';

interface ImageUploaderProps {
  maxFiles?: number;
  maxFileSizeMB?: number;
  acceptTypes?: string[];
  cropAspectRatio?: number;
  onUpload?: (urls: string[]) => void;
  onError?: (error: string) => void;
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.url as string;
}

export default function ImageUploader({
  maxFiles = 1,
  maxFileSizeMB = 5,
  acceptTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
  cropAspectRatio = 1,
  onUpload,
  onError,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [croppedImages, setCroppedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropping, setCropping] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles: File[] = [];
    for (const file of Array.from(files)) {
      if (!acceptTypes.includes(file.type)) {
        toast.error('Unsupported file format.');
        onError?.('Unsupported file format');
        continue;
      }
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        toast.error(`File exceeds ${maxFileSizeMB}MB.`);
        onError?.('File too large');
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setSelectedFiles(validFiles.slice(0, maxFiles));
    const fileReader = new FileReader();
    fileReader.onload = () => setImageSrc(fileReader.result as string);
    fileReader.readAsDataURL(validFiles[0]);
    setCropping(true);
  };

  const handleCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    if (!imageSrc) return;
    try {
      const croppedBlob = await getCroppedImg(imageSrc!, croppedAreaPixels, 'webp');
      const compressedFile = await compressImage(croppedBlob);
      const url = await uploadImage(compressedFile);
      setCroppedImages((prev) => [...prev, url]);

      const nextIndex = currentImageIndex + 1;
      if (selectedFiles[nextIndex]) {
        const reader = new FileReader();
        reader.onload = () => setImageSrc(reader.result as string);
        reader.readAsDataURL(selectedFiles[nextIndex]);
        setCurrentImageIndex(nextIndex);
      } else {
        setCropping(false);
        onUpload?.([...croppedImages, url]);
      }
    } catch {
      toast.error('Failed to crop or upload.');
      onError?.('Failed during cropping or uploading');
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept={acceptTypes.join(',')}
        multiple
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Button onPress={() => fileInputRef.current?.click()}>Upload Image</Button>

      {cropping && imageSrc && (
        <div className="relative w-full h-[300px] bg-black rounded-xl overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={cropAspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
          />
        </div>
      )}

      {croppedImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {croppedImages.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Uploaded image ${i + 1}`}
              className="w-full h-auto rounded border"
            />
          ))}
        </div>
      )}
    </div>
  );
}
